import * as db from "./db";
import * as googleAdsOAuth from "./googleAdsOAuthService";
import * as googleSheets from "./googleSheetsService";

/**
 * Smart Sync Service
 * يتعامل مع الـ 4 أنواع من المستخدمين بذكاء
 */

export enum UserType {
  TYPE_1 = "type_1", // حساب رئيسي فقط (كل شيء في Google Sheets)
  TYPE_2 = "type_2", // حساب رئيسي + حسابات فرعية (MMC)
  TYPE_3 = "type_3", // حسابات في Google Sheets فقط (بدون Google Ads)
  TYPE_4 = "type_4", // بدون حسابات إعلانية
}

export interface SyncResult {
  userType: UserType;
  accountsFromSheets: any[];
  accountsFromGoogleAds: any[];
  mergedAccounts: any[];
  linkedCount: number;
  newCount: number;
  message: string;
}

/**
 * تحديد نوع المستخدم بناءً على البيانات المتاحة
 */
export async function detectUserType(
  accessToken: string,
  userEmail: string
): Promise<UserType> {
  try {
    // جلب البيانات من Google Sheets
    const sheetsAccounts = await googleSheets.getAccountsFromSheet(userEmail);
    const hasSheetAccounts = sheetsAccounts && sheetsAccounts.length > 0;

    // جلب البيانات من Google Ads
    let googleAdsAccounts: any[] = [];
    try {
      googleAdsAccounts = await googleAdsOAuth.getGoogleAdsAccounts(accessToken);
    } catch (error) {
      console.log("No Google Ads accounts found");
    }
    const hasGoogleAdsAccounts = googleAdsAccounts && googleAdsAccounts.length > 0;

    // تحديد النوع
    if (hasGoogleAdsAccounts && hasSheetAccounts) {
      return UserType.TYPE_2; // حساب رئيسي + حسابات فرعية
    } else if (hasGoogleAdsAccounts && !hasSheetAccounts) {
      return UserType.TYPE_2; // حساب رئيسي فقط (لكن قد يكون له فروع)
    } else if (hasSheetAccounts && !hasGoogleAdsAccounts) {
      return UserType.TYPE_3; // حسابات في Sheets فقط
    } else {
      return UserType.TYPE_4; // بدون حسابات
    }
  } catch (error) {
    console.error("Error detecting user type:", error);
    return UserType.TYPE_4; // افتراضي: بدون حسابات
  }
}

/**
 * جلب الحسابات من Google Sheets
 */
export async function syncFromGoogleSheets(userEmail: string) {
  try {
    const accounts = await googleSheets.getAccountsFromSheet(userEmail);
    return accounts || [];
  } catch (error) {
    console.error("Error syncing from Google Sheets:", error);
    return [];
  }
}

/**
 * جلب الحسابات من Google Ads
 */
export async function syncFromGoogleAds(accessToken: string) {
  try {
    const accountResources = await googleAdsOAuth.getGoogleAdsAccounts(accessToken);
    const accounts = [];

    for (const accountResource of accountResources) {
      const customerId = accountResource.split("/")[1];
      try {
        const details = await googleAdsOAuth.getAccountDetails(customerId, accessToken);
        accounts.push({
          customerId,
          accountName: details.descriptiveName || `Account ${customerId}`,
          accountEmail: details.email,
          source: "google_ads",
        });
      } catch (error) {
        console.error(`Error getting details for account ${customerId}:`, error);
      }
    }

    return accounts;
  } catch (error) {
    console.error("Error syncing from Google Ads:", error);
    return [];
  }
}

/**
 * دمج الحسابات من مصادر متعددة بذكاء
 */
export function mergeAccounts(
  sheetsAccounts: any[],
  googleAdsAccounts: any[]
): any[] {
  const merged = new Map();

  // أضف حسابات Google Sheets أولاً (مصدر الحقيقة)
  sheetsAccounts.forEach((account) => {
    const key = account.customerId || account.id;
    merged.set(key, {
      ...account,
      source: "sheets",
      inSheets: true,
      inGoogleAds: false,
    });
  });

  // أضف حسابات Google Ads
  googleAdsAccounts.forEach((account) => {
    const key = account.customerId;
    if (merged.has(key)) {
      // تحديث الحساب الموجود
      const existing = merged.get(key);
      merged.set(key, {
        ...existing,
        ...account,
        inGoogleAds: true,
        source: "merged",
      });
    } else {
      // حساب جديد من Google Ads
      merged.set(key, {
        ...account,
        source: "google_ads",
        inSheets: false,
        inGoogleAds: true,
      });
    }
  });

  return Array.from(merged.values());
}

/**
 * معالجة النوع 1: حساب رئيسي فقط
 */
export async function handleType1(
  userId: number,
  sheetsAccounts: any[]
): Promise<SyncResult> {
  const linkedCount = 0;
  const newCount = sheetsAccounts.length;

  // إضافة الحسابات من Sheets
  for (const account of sheetsAccounts) {
    await db.createGoogleAdsOAuthAccount({
      userId,
      customerId: account.customerId,
      accountName: account.accountName,
      accountEmail: account.accountEmail,
      status: "linked",
    });
  }

  return {
    userType: UserType.TYPE_1,
    accountsFromSheets: sheetsAccounts,
    accountsFromGoogleAds: [],
    mergedAccounts: sheetsAccounts,
    linkedCount,
    newCount,
    message: `تم إضافة ${newCount} حساب من Google Sheets`,
  };
}

/**
 * معالجة النوع 2: حساب رئيسي + حسابات فرعية
 */
export async function handleType2(
  userId: number,
  sheetsAccounts: any[],
  googleAdsAccounts: any[]
): Promise<SyncResult> {
  const mergedAccounts = mergeAccounts(sheetsAccounts, googleAdsAccounts);
  let linkedCount = 0;
  let newCount = 0;

  for (const account of mergedAccounts) {
    const existing = await db.getGoogleAdsOAuthAccountByCustomerId(
      userId,
      account.customerId
    );

    if (existing) {
      linkedCount++;
    } else {
      await db.createGoogleAdsOAuthAccount({
        userId,
        customerId: account.customerId,
        accountName: account.accountName,
        accountEmail: account.accountEmail,
        status: "linked",
      });
      newCount++;
    }
  }

  return {
    userType: UserType.TYPE_2,
    accountsFromSheets: sheetsAccounts,
    accountsFromGoogleAds: googleAdsAccounts,
    mergedAccounts,
    linkedCount,
    newCount,
    message: `تم ربط ${linkedCount} حساب وإضافة ${newCount} حساب جديد`,
  };
}

/**
 * معالجة النوع 3: حسابات في Google Sheets فقط
 */
export async function handleType3(
  userId: number,
  sheetsAccounts: any[]
): Promise<SyncResult> {
  const newCount = sheetsAccounts.length;

  for (const account of sheetsAccounts) {
    await db.createGoogleAdsOAuthAccount({
      userId,
      customerId: account.customerId,
      accountName: account.accountName,
      accountEmail: account.accountEmail,
      status: "pending", // pending لأنها ليست في Google Ads
    });
  }

  return {
    userType: UserType.TYPE_3,
    accountsFromSheets: sheetsAccounts,
    accountsFromGoogleAds: [],
    mergedAccounts: sheetsAccounts,
    linkedCount: 0,
    newCount,
    message: `تم إضافة ${newCount} حساب من Google Sheets (بدون ربط Google Ads)`,
  };
}

/**
 * معالجة النوع 4: بدون حسابات إعلانية
 */
export async function handleType4(): Promise<SyncResult> {
  return {
    userType: UserType.TYPE_4,
    accountsFromSheets: [],
    accountsFromGoogleAds: [],
    mergedAccounts: [],
    linkedCount: 0,
    newCount: 0,
    message: "تم فتح حساب جديد بدون حسابات إعلانية",
  };
}

/**
 * المزامنة الذكية الرئيسية
 */
export async function smartSync(
  userId: number,
  accessToken: string,
  userEmail: string
): Promise<SyncResult> {
  try {
    // تحديد نوع المستخدم
    const userType = await detectUserType(accessToken, userEmail);

    // جلب البيانات
    const sheetsAccounts = await syncFromGoogleSheets(userEmail);
    const googleAdsAccounts = await syncFromGoogleAds(accessToken);

    // معالجة حسب النوع
    switch (userType) {
      case UserType.TYPE_1:
        return await handleType1(userId, sheetsAccounts);

      case UserType.TYPE_2:
        return await handleType2(userId, sheetsAccounts, googleAdsAccounts);

      case UserType.TYPE_3:
        return await handleType3(userId, sheetsAccounts);

      case UserType.TYPE_4:
        return await handleType4();

      default:
        return await handleType4();
    }
  } catch (error) {
    console.error("Smart sync error:", error);
    throw new Error("فشل المزامنة الذكية");
  }
}

/**
 * حفظ سجل المزامنة
 */
export async function saveSyncLog(
  userId: number,
  userType: UserType,
  result: SyncResult,
  status: "success" | "error",
  errorMessage?: string
) {
  // يمكن إضافة جدول sync_logs لاحقاً
  console.log(`[SYNC LOG] User ${userId} - Type ${userType} - Status ${status}`, {
    linkedCount: result.linkedCount,
    newCount: result.newCount,
    error: errorMessage,
  });
}
