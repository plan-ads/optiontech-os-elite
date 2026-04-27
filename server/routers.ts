import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import * as stripeService from "./stripeService";
import * as googleSheets from "./googleSheetsService";
import * as chatDb from "./chat";
import { oauthRouter } from "./oauth-router";
import { chatRouter } from "./chat-router";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  // System router for notifications etc.
  system: systemRouter,
  
  // OAuth router
  oauth: oauthRouter,
  
  // Chat router
  chat: chatRouter,
  
  // Auth router
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Plans router - الباقات
  plans: router({
    list: publicProcedure.query(async () => {
      const plans = await db.getAllPlans();
      return plans;
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const plan = await db.getPlanById(input.id);
        return plan;
      }),
  }),

  // Subscriptions router - الاشتراكات
  subscriptions: router({
    current: protectedProcedure.query(async ({ ctx }) => {
      const subscription = await db.getUserSubscription(ctx.user.id);
      if (subscription) {
        const plan = await db.getPlanById(subscription.planId);
        return { ...subscription, plan };
      }
      return null;
    }),

    create: protectedProcedure
      .input(z.object({
        planId: z.number(),
        billingCycle: z.enum(["monthly", "yearly"]),
      }))
      .mutation(async ({ ctx, input }) => {
        // Check if user already has active subscription
        const existing = await db.getUserSubscription(ctx.user.id);
        if (existing) {
          throw new Error("لديك اشتراك نشط بالفعل");
        }

        await db.createSubscription({
          userId: ctx.user.id,
          planId: input.planId,
          billingCycle: input.billingCycle,
          status: "active",
          startDate: new Date(),
        });

        return { success: true };
      }),
  }),

  // Ads Accounts router - حسابات Google Ads
  adsAccounts: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const accounts = await db.getUserAdsAccounts(ctx.user.id);
      return accounts;
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const account = await db.getAdsAccountById(input.id);
        if (!account || account.userId !== ctx.user.id) {
          throw new Error("الحساب غير موجود");
        }
        return account;
      }),
  }),

  // Link Requests router - طلبات الربط
  linkRequests: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const requests = await db.getUserLinkRequests(ctx.user.id);
      return requests;
    }),

    create: protectedProcedure
      .input(z.object({
        accountId: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "رقم الحساب غير صحيح"),
        accountName: z.string().min(1, "اسم الحساب مطلوب"),
      }))
      .mutation(async ({ ctx, input }) => {
        // Check if account already linked
        const existing = await db.getUserAdsAccounts(ctx.user.id);
        if (existing.some(a => a.accountId === input.accountId && a.status === "linked")) {
          throw new Error("هذا الحساب مرتبط بالفعل");
        }

        // Create link request
        await db.createLinkRequest({
          userId: ctx.user.id,
          accountId: input.accountId,
          accountName: input.accountName,
          status: "approved", // Auto-approve for now
        });

        // Also create the ads account entry with linked status
        await db.createAdsAccount({
          userId: ctx.user.id,
          accountId: input.accountId,
          accountName: input.accountName,
          status: "linked", // Auto-link
          protectionEnabled: true,
        });

        return { success: true, message: "تم ربط الحساب بنجاح" };
      }),

    // Get account status
    status: protectedProcedure
      .input(z.object({ accountId: z.string() }))
      .query(async ({ ctx, input }) => {
        const accounts = await db.getUserAdsAccounts(ctx.user.id);
        const account = accounts.find(a => a.accountId === input.accountId);
        return account || null;
      }),

    // Admin: Get all pending requests
    pending: adminProcedure.query(async () => {
      const requests = await db.getAllPendingLinkRequests();
      return requests;
    }),

    // Admin: Approve request
    approve: adminProcedure
      .input(z.object({
        requestId: z.number(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateLinkRequestStatus(
          input.requestId,
          "approved",
          ctx.user.id,
          input.notes
        );
        // Update corresponding ads account
        const request = await db.getAllPendingLinkRequests();
        const linkRequest = request.find(r => r.id === input.requestId);
        if (linkRequest) {
          const accounts = await db.getUserAdsAccounts(linkRequest.userId);
          const account = accounts.find(a => a.accountId === linkRequest.accountId);
          if (account) {
            await db.updateAdsAccountStatus(account.id, "linked");
          }
        }
        return { success: true };
      }),

    // Admin: Reject request
    reject: adminProcedure
      .input(z.object({
        requestId: z.number(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateLinkRequestStatus(
          input.requestId,
          "rejected",
          ctx.user.id,
          input.notes
        );
        return { success: true };
      }),
  }),

  // Dashboard stats
  dashboard: router({
    stats: protectedProcedure.query(async ({ ctx }) => {
      const stats = await db.getUserTotalStats(ctx.user.id);
      const subscription = await db.getUserSubscription(ctx.user.id);
      const plan = subscription ? await db.getPlanById(subscription.planId) : null;
      
      return {
        ...stats,
        currentPlan: plan?.nameAr || "مجاني",
        planId: plan?.id || null,
      };
    }),

    // Get campaign metrics for a specific account
    campaignMetrics: protectedProcedure
      .input(z.object({ accountId: z.string() }))
      .query(async ({ ctx, input }) => {
        // Verify user owns this account
        const accounts = await db.getUserAdsAccounts(ctx.user.id);
        const account = accounts.find(a => a.accountId === input.accountId);
        
        if (!account) {
          throw new Error("الحساب غير موجود");
        }

        // Return mock campaign metrics for now
        return {
          totalSpend: 5250.75,
          totalClicks: 1842,
          totalImpressions: 45230,
          ctr: 4.08,
          conversionRate: 2.15,
          campaigns: 12,
        };
      }),

    // Get all campaign metrics for users accounts
    allCampaignMetrics: protectedProcedure.query(async ({ ctx }) => {
      const accounts = await db.getUserAdsAccounts(ctx.user.id);
      
      if (accounts.length === 0) {
        return {
          totalSpend: 0,
          totalClicks: 0,
          totalImpressions: 0,
          ctr: 0,
          conversionRate: 0,
          campaigns: 0,
          accountsCount: 0,
        };
      }

      // Return aggregated mock metrics for now
      return {
        totalSpend: 5250.75,
        totalClicks: 1842,
        totalImpressions: 45230,
        ctr: 4.08,
        conversionRate: 2.15,
        campaigns: 12,
        accountsCount: accounts.length,
      };
    }),
  }),

  // Payment router - نظام الدفع
  payment: router({
    // Create checkout session
    createCheckout: protectedProcedure
      .input(z.object({
        stripePriceId: z.string(),
        successUrl: z.string(),
        cancelUrl: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const session = await stripeService.createCheckoutSession(
            ctx.user.id,
            input.stripePriceId,
            input.successUrl,
            input.cancelUrl
          );
          return { sessionId: session.id, url: session.url };
        } catch (error) {
          console.error("Checkout error:", error);
          throw new Error("فشل إنشاء جلسة الدفع");
        }
      }),

    // Get payment status
    status: protectedProcedure
      .input(z.object({
        paymentId: z.string(),
      }))
      .query(async ({ ctx, input }) => {
        const payment = await db.getPaymentByStripeId(input.paymentId);
        if (!payment) {
          return null;
        }
        return payment;
      }),

    // Get user invoices
    invoices: protectedProcedure.query(async ({ ctx }) => {
      const subscription = await db.getUserSubscription(ctx.user.id);
      if (!subscription) {
        return [];
      }
      const invoices = await db.getSubscriptionInvoices(subscription.id);
      return invoices;
    }),
  }),
});

export type AppRouter = typeof appRouter;
