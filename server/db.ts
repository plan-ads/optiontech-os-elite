import { drizzle } from "drizzle-orm/mysql2";
import { eq, and, desc, sql } from "drizzle-orm";
import { 
  InsertUser, 
  users, 
  plans, 
  subscriptions, 
  adsAccounts, 
  linkRequests,
  protectionStats,
  stripeCustomers,
  stripeInvoices,
  payments,
  planPrices,
  oauthTokens,
  googleAdsOAuthAccounts,
  notifications,
  InsertPlan,
  InsertSubscription,
  InsertAdsAccount,
  InsertLinkRequest,
  InsertStripeCustomer,
  InsertStripeInvoice,
  InsertPayment,
  InsertPlanPrice,
  InsertOAuthToken,
  InsertGoogleAdsOAuthAccount,
  InsertNotification
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ==================== USER QUERIES ====================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ==================== PLANS QUERIES ====================

export async function getAllPlans() {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(plans).where(eq(plans.isActive, true)).orderBy(plans.sortOrder);
  return result;
}

export async function getPlanById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(plans).where(eq(plans.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createPlan(plan: InsertPlan) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(plans).values(plan);
  return result;
}

// ==================== SUBSCRIPTIONS QUERIES ====================

export async function getUserSubscription(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select()
    .from(subscriptions)
    .where(and(
      eq(subscriptions.userId, userId),
      eq(subscriptions.status, "active")
    ))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function createSubscription(subscription: InsertSubscription) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(subscriptions).values(subscription);
  return result;
}

export async function updateSubscriptionStatus(id: number, status: "active" | "cancelled" | "expired" | "pending") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(subscriptions)
    .set({ status, updatedAt: new Date() })
    .where(eq(subscriptions.id, id));
}

// ==================== ADS ACCOUNTS QUERIES ====================

export async function getUserAdsAccounts(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(adsAccounts)
    .where(eq(adsAccounts.userId, userId))
    .orderBy(desc(adsAccounts.createdAt));
  
  return result;
}

export async function getAdsAccountById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(adsAccounts).where(eq(adsAccounts.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createAdsAccount(account: InsertAdsAccount) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(adsAccounts).values(account);
  return result;
}

export async function updateAdsAccountStatus(id: number, status: "pending" | "linked" | "rejected" | "disconnected") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: Record<string, unknown> = { status, updatedAt: new Date() };
  if (status === "linked") {
    updateData.linkedAt = new Date();
  }

  await db.update(adsAccounts)
    .set(updateData)
    .where(eq(adsAccounts.id, id));
}

// ==================== LINK REQUESTS QUERIES ====================

export async function getUserLinkRequests(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(linkRequests)
    .where(eq(linkRequests.userId, userId))
    .orderBy(desc(linkRequests.createdAt));
  
  return result;
}

export async function getAllPendingLinkRequests() {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(linkRequests)
    .where(eq(linkRequests.status, "pending"))
    .orderBy(desc(linkRequests.createdAt));
  
  return result;
}

export async function createLinkRequest(request: InsertLinkRequest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(linkRequests).values(request);
  return result;
}

export async function updateLinkRequestStatus(
  id: number, 
  status: "pending" | "approved" | "rejected",
  processedBy?: number,
  notes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: Record<string, unknown> = { 
    status, 
    updatedAt: new Date(),
    processedAt: new Date()
  };
  
  if (processedBy) updateData.processedBy = processedBy;
  if (notes) updateData.notes = notes;

  await db.update(linkRequests)
    .set(updateData)
    .where(eq(linkRequests.id, id));
}

// ==================== PROTECTION STATS QUERIES ====================

export async function getAccountProtectionStats(accountId: number, limit = 30) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(protectionStats)
    .where(eq(protectionStats.accountId, accountId))
    .orderBy(desc(protectionStats.date))
    .limit(limit);
  
  return result;
}

export async function getUserTotalStats(userId: number) {
  const db = await getDb();
  if (!db) return { blockedClicks: 0, savedAmount: 0, linkedAccounts: 0 };

  // Get user's accounts
  const accounts = await getUserAdsAccounts(userId);
  const linkedAccounts = accounts.filter(a => a.status === "linked").length;

  // For now, return placeholder stats
  // In production, you would aggregate from protectionStats table
  return {
    blockedClicks: 0,
    savedAmount: 0,
    linkedAccounts
  };
}


// ==================== STRIPE CUSTOMERS QUERIES ====================

export async function getOrCreateStripeCustomer(userId: number, stripeCustomerId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db.select()
    .from(stripeCustomers)
    .where(eq(stripeCustomers.userId, userId))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  const result = await db.insert(stripeCustomers).values({
    userId,
    stripeCustomerId,
  });

  return { userId, stripeCustomerId };
}

export async function getStripeCustomerByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select()
    .from(stripeCustomers)
    .where(eq(stripeCustomers.userId, userId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==================== PLAN PRICES QUERIES ====================

export async function createPlanPrice(price: InsertPlanPrice) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(planPrices).values(price);
  return result;
}

export async function getPlanPrices(planId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(planPrices)
    .where(and(
      eq(planPrices.planId, planId),
      eq(planPrices.isActive, true)
    ));

  return result;
}

export async function getPriceByStripePriceId(stripePriceId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select()
    .from(planPrices)
    .where(eq(planPrices.stripePriceId, stripePriceId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==================== PAYMENTS QUERIES ====================

export async function createPayment(payment: InsertPayment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(payments).values(payment);
  return result;
}

export async function getPaymentByStripeId(stripePaymentId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select()
    .from(payments)
    .where(eq(payments.stripePaymentId, stripePaymentId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updatePaymentStatus(id: number, status: "pending" | "succeeded" | "failed" | "canceled") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: Record<string, unknown> = { status, updatedAt: new Date() };
  if (status === "succeeded") {
    updateData.paidAt = new Date();
  }

  await db.update(payments)
    .set(updateData)
    .where(eq(payments.id, id));
}

// ==================== STRIPE INVOICES QUERIES ====================

export async function createInvoice(invoice: InsertStripeInvoice) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(stripeInvoices).values(invoice);
  return result;
}

export async function getInvoiceByStripeId(stripeInvoiceId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select()
    .from(stripeInvoices)
    .where(eq(stripeInvoices.stripeInvoiceId, stripeInvoiceId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateInvoiceStatus(id: number, status: "draft" | "open" | "paid" | "void" | "uncollectible") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: Record<string, unknown> = { status, updatedAt: new Date() };
  if (status === "paid") {
    updateData.paidAt = new Date();
  }

  await db.update(stripeInvoices)
    .set(updateData)
    .where(eq(stripeInvoices.id, id));
}

export async function getSubscriptionInvoices(subscriptionId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(stripeInvoices)
    .where(eq(stripeInvoices.subscriptionId, subscriptionId))
    .orderBy(desc(stripeInvoices.createdAt));

  return result;
}

// ==================== OAUTH TOKENS QUERIES ====================

export async function upsertOAuthToken(data: InsertOAuthToken) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(oauthTokens)
    .values(data)
    .onDuplicateKeyUpdate({
      set: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
        scope: data.scope,
        updatedAt: new Date(),
      },
    });

  return result;
}

export async function getOAuthToken(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select()
    .from(oauthTokens)
    .where(eq(oauthTokens.userId, userId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function deleteOAuthToken(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(oauthTokens)
    .where(eq(oauthTokens.userId, userId));
}

// ==================== GOOGLE ADS OAUTH ACCOUNTS QUERIES ====================

export async function createGoogleAdsOAuthAccount(data: InsertGoogleAdsOAuthAccount) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(googleAdsOAuthAccounts).values(data);
  return result;
}

export async function getUserGoogleAdsOAuthAccounts(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select()
    .from(googleAdsOAuthAccounts)
    .where(eq(googleAdsOAuthAccounts.userId, userId))
    .orderBy(desc(googleAdsOAuthAccounts.createdAt));

  return result;
}

export async function getGoogleAdsOAuthAccountByCustomerId(userId: number, customerId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select()
    .from(googleAdsOAuthAccounts)
    .where(
      and(
        eq(googleAdsOAuthAccounts.userId, userId),
        eq(googleAdsOAuthAccounts.customerId, customerId)
      )
    )
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateGoogleAdsOAuthAccountStatus(
  id: number,
  status: "pending" | "linked" | "rejected" | "disconnected"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: Record<string, unknown> = { status, updatedAt: new Date() };
  
  if (status === "linked") {
    updateData.linkedAt = new Date();
  } else if (status === "disconnected") {
    updateData.disconnectedAt = new Date();
  }

  await db.update(googleAdsOAuthAccounts)
    .set(updateData)
    .where(eq(googleAdsOAuthAccounts.id, id));
}

export async function deleteGoogleAdsOAuthAccount(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(googleAdsOAuthAccounts)
    .where(eq(googleAdsOAuthAccounts.id, id));
}


// ==================== SMART SYNC QUERIES ====================

export async function getUserGoogleAdsOAuthAccountsByStatus(
  userId: number,
  status: "pending" | "linked" | "rejected" | "disconnected"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select()
    .from(googleAdsOAuthAccounts)
    .where(
      and(
        eq(googleAdsOAuthAccounts.userId, userId),
        eq(googleAdsOAuthAccounts.status, status)
      )
    );
}

export async function getUserSyncStats(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const accounts = await db.select()
    .from(googleAdsOAuthAccounts)
    .where(eq(googleAdsOAuthAccounts.userId, userId));

  const stats = {
    total: accounts.length,
    linked: accounts.filter(a => a.status === "linked").length,
    pending: accounts.filter(a => a.status === "pending").length,
    rejected: accounts.filter(a => a.status === "rejected").length,
    disconnected: accounts.filter(a => a.status === "disconnected").length,
  };

  return stats;
}

export async function bulkCreateGoogleAdsOAuthAccounts(
  accounts: InsertGoogleAdsOAuthAccount[]
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (accounts.length === 0) return [];

  return await db.insert(googleAdsOAuthAccounts)
    .values(accounts)
    .returning();
}

export async function bulkUpdateGoogleAdsOAuthAccountStatus(
  accountIds: number[],
  status: "pending" | "linked" | "rejected" | "disconnected"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (accountIds.length === 0) return;

  const updateData: Record<string, unknown> = { status, updatedAt: new Date() };
  
  if (status === "linked") {
    updateData.linkedAt = new Date();
  }

  await db.update(googleAdsOAuthAccounts)
    .set(updateData)
    .where(
      and(
        eq(googleAdsOAuthAccounts.id, accountIds[0]),
        // Note: Drizzle doesn't have direct IN operator, so we'd need to loop or use raw query
        // For now, we'll update them one by one
      )
    );

  // Update each account individually
  for (const accountId of accountIds) {
    await updateGoogleAdsOAuthAccountStatus(accountId, status);
  }
}


// ==================== NOTIFICATIONS QUERIES ====================

export async function getUserNotifications(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

export async function createNotification(
  userId: number,
  title: string,
  content: string,
  type: "success" | "error" | "info" | "warning" = "info"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(notifications)
    .values({
      userId,
      title,
      content,
      type,
      read: false,
    })
    .returning();

  return result[0];
}

export async function markNotificationAsRead(notificationId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(notifications)
    .set({
      read: true,
      readAt: new Date(),
    })
    .where(
      and(
        eq(notifications.id, notificationId),
        eq(notifications.userId, userId)
      )
    );
}

export async function markAllNotificationsAsRead(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(notifications)
    .set({
      read: true,
      readAt: new Date(),
    })
    .where(eq(notifications.userId, userId));
}

export async function deleteNotification(notificationId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(notifications)
    .where(
      and(
        eq(notifications.id, notificationId),
        eq(notifications.userId, userId)
      )
    );
}

export async function getUnreadNotificationCount(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select({ count: sql<number>`count(*)` })
    .from(notifications)
    .where(
      and(
        eq(notifications.userId, userId),
        eq(notifications.read, false)
      )
    );

  return result[0]?.count || 0;
}
