import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import * as googleAdsOAuth from "./googleAdsOAuthService";
import * as smartSync from "./smartSyncService";


export const oauthRouter = router({
  // Get authorization URL
  getAuthUrl: publicProcedure
    .input(z.object({ state: z.string() }))
    .query(({ input }) => {
      const authUrl = googleAdsOAuth.getAuthorizationUrl(input.state);
      return { authUrl };
    }),

  // Handle OAuth callback
  handleCallback: publicProcedure
    .input(z.object({
      code: z.string(),
      state: z.string(),
      userId: z.number(),
    }))
    .mutation(async ({ input }) => {
      try {
        // Exchange code for tokens
        const tokens = await googleAdsOAuth.exchangeCodeForTokens(input.code);
        
        // Get user info
        const userInfo = await googleAdsOAuth.getUserInfo(tokens.access_token!);
        
        // Store OAuth tokens
        await db.upsertOAuthToken({
          userId: input.userId,
          accessToken: tokens.access_token!,
          refreshToken: tokens.refresh_token || null,
          expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
          scope: tokens.scope || null,
          tokenType: "Bearer",
        });
        
        return {
          success: true,
          userInfo,
          message: "تم ربط الحساب بنجاح",
        };
      } catch (error) {
        console.error("OAuth callback error:", error);
        throw new Error("فشل معالجة رد الاتصال");
      }
    }),

  // Get linked Google Ads accounts
  getLinkedAccounts: protectedProcedure.query(async ({ ctx }) => {
    const accounts = await db.getUserGoogleAdsOAuthAccounts(ctx.user.id);
    return accounts;
  }),

  // Detect user type
  detectUserType: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const oauthToken = await db.getOAuthToken(ctx.user.id);
      if (!oauthToken) {
        return { userType: smartSync.UserType.TYPE_4 };
      }

      const userType = await smartSync.detectUserType(
        oauthToken.accessToken,
        ctx.user.email || ""
      );

      return { userType };
    } catch (error) {
      console.error("Detect user type error:", error);
      return { userType: smartSync.UserType.TYPE_4 };
    }
  }),

  // Smart Sync - handles all 4 user types
  smartSync: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const oauthToken = await db.getOAuthToken(ctx.user.id);
      if (!oauthToken) {
        // Type 4: No accounts
        return {
          success: true,
          userType: smartSync.UserType.TYPE_4,
          message: "تم فتح حساب جديد بدون حسابات إعلانية",
        };
      }

      // Check if token is expired and refresh if needed
      if (oauthToken.expiresAt && googleAdsOAuth.isTokenExpired(oauthToken.expiresAt.getTime())) {
        if (oauthToken.refreshToken) {
          const newTokens = await googleAdsOAuth.refreshAccessToken(oauthToken.refreshToken);
          await db.upsertOAuthToken({
            userId: ctx.user.id,
            accessToken: newTokens.access_token!,
            refreshToken: newTokens.refresh_token || oauthToken.refreshToken,
            expiresAt: newTokens.expiry_date ? new Date(newTokens.expiry_date) : null,
            scope: oauthToken.scope,
            tokenType: "Bearer",
          });
        }
      }

      // Run smart sync
      const result = await smartSync.smartSync(
        ctx.user.id,
        oauthToken.accessToken,
        ctx.user.email || ""
      );

      // Save sync log
      await smartSync.saveSyncLog(ctx.user.id, result.userType, result, "success");

      return {
        success: true,
        ...result,
      };
    } catch (error) {
      console.error("Smart sync error:", error);
      throw new Error("فشل المزامنة الذكية");
    }
  }),

  // Legacy sync - for backward compatibility
  syncAccounts: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const oauthToken = await db.getOAuthToken(ctx.user.id);
      if (!oauthToken) {
        throw new Error("لم يتم العثور على توكن OAuth");
      }

      // Check if token is expired
      if (oauthToken.expiresAt && googleAdsOAuth.isTokenExpired(oauthToken.expiresAt.getTime())) {
        if (oauthToken.refreshToken) {
          const newTokens = await googleAdsOAuth.refreshAccessToken(oauthToken.refreshToken);
          await db.upsertOAuthToken({
            userId: ctx.user.id,
            accessToken: newTokens.access_token!,
            refreshToken: newTokens.refresh_token || oauthToken.refreshToken,
            expiresAt: newTokens.expiry_date ? new Date(newTokens.expiry_date) : null,
            scope: oauthToken.scope,
            tokenType: "Bearer",
          });
        } else {
          throw new Error("انتهت صلاحية التوكن ولا يمكن تحديثه");
        }
      }

      // Get Google Ads accounts
      const accounts = await googleAdsOAuth.getGoogleAdsAccounts(oauthToken.accessToken);
      
      // For each account, create or update in database
      for (const accountResource of accounts) {
        // Extract customer ID from resource name (e.g., "customers/1234567890")
        const customerId = accountResource.split("/")[1];
        
        // Check if already exists
        const existing = await db.getGoogleAdsOAuthAccountByCustomerId(ctx.user.id, customerId);
        
        if (!existing) {
          // Get account details
          const details = await googleAdsOAuth.getAccountDetails(customerId, oauthToken.accessToken);
          
          // Create new account
          await db.createGoogleAdsOAuthAccount({
            userId: ctx.user.id,
            customerId,
            accountName: details.descriptiveName || `Account ${customerId}`,
            accountEmail: details.manager ? undefined : details.email,
            status: "linked",
          });
        }
      }

      return {
        success: true,
        accountCount: accounts.length,
        message: `تم مزامنة ${accounts.length} حساب بنجاح`,
      };
    } catch (error) {
      console.error("Sync accounts error:", error);
      throw new Error("فشل مزامنة الحسابات");
    }
  }),

  // Disconnect OAuth
  disconnect: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const oauthToken = await db.getOAuthToken(ctx.user.id);
      if (oauthToken) {
        // Revoke token
        await googleAdsOAuth.revokeAccessToken(oauthToken.accessToken);
        
        // Delete from database
        await db.deleteOAuthToken(ctx.user.id);
      }
      
      return { success: true, message: "تم قطع الاتصال بنجاح" };
    } catch (error) {
      console.error("Disconnect error:", error);
      throw new Error("فشل قطع الاتصال");
    }
  }),
});
