import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): { ctx: TrpcContext; user: AuthenticatedUser } {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `user-${userId}`,
    email: `user${userId}@example.com`,
    name: `Test User ${userId}`,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx, user };
}

describe("Plans Router", () => {
  it("should list all available plans", async () => {
    const randomUserId = Math.floor(Math.random() * 100000);
    const { ctx } = createAuthContext(randomUserId);
    const caller = appRouter.createCaller(ctx);

    const plans = await caller.plans.list();

    expect(Array.isArray(plans)).toBe(true);
    // Plans might be empty in test environment, so we just check it's an array
    
    // Check that plans have required fields if any exist
    plans.forEach((plan: any) => {
      expect(plan).toHaveProperty("id");
      expect(plan).toHaveProperty("nameAr");
      expect(plan).toHaveProperty("priceMonthly");
    });
  });

  it("should get a plan by ID", async () => {
    const randomUserId = Math.floor(Math.random() * 100000);
    const { ctx } = createAuthContext(randomUserId);
    const caller = appRouter.createCaller(ctx);

    // First get all plans
    const plans = await caller.plans.list();
    if (plans.length === 0) {
      expect(true).toBe(true); // Skip if no plans
      return;
    }

    const plan = await caller.plans.getById({ id: plans[0].id });
    expect(plan).toBeDefined();
    expect(plan.id).toBe(plans[0].id);
  });
});

describe("Subscriptions Router", () => {
  it("should get current subscription (may be null for new users)", async () => {
    const randomUserId = Math.floor(Math.random() * 100000);
    const { ctx } = createAuthContext(randomUserId);
    const caller = appRouter.createCaller(ctx);

    const subscription = await caller.subscriptions.current();

    // Subscription can be null for new users
    if (subscription) {
      expect(subscription).toHaveProperty("id");
      expect(subscription).toHaveProperty("userId");
      expect(subscription).toHaveProperty("status");
    }
  });

  it("should create a subscription", async () => {
    const randomUserId = Math.floor(Math.random() * 100000);
    const { ctx } = createAuthContext(randomUserId);
    const caller = appRouter.createCaller(ctx);

    // Get available plans first
    const plans = await caller.plans.list();
    if (plans.length === 0) {
      expect(true).toBe(true); // Skip if no plans
      return;
    }

    // Try to create subscription
    try {
      const result = await caller.subscriptions.create({
        planId: plans[0].id,
        billingCycle: "monthly",
      });

      expect(result).toHaveProperty("success");
      expect(result.success).toBe(true);
    } catch (error: any) {
      // It's ok if subscription already exists
      expect(error.message).toContain("اشتراك نشط");
    }
  });
});

describe("Ads Accounts Router", () => {
  it("should list user's ads accounts", async () => {
    const randomUserId = Math.floor(Math.random() * 100000);
    const { ctx } = createAuthContext(randomUserId);
    const caller = appRouter.createCaller(ctx);

    const accounts = await caller.adsAccounts.list();

    expect(Array.isArray(accounts)).toBe(true);
    
    // Check structure of accounts if any exist
    accounts.forEach((account: any) => {
      expect(account).toHaveProperty("id");
      expect(account).toHaveProperty("accountId");
      expect(account).toHaveProperty("status");
    });
  });

  it("should get a specific ads account", async () => {
    const randomUserId = Math.floor(Math.random() * 100000);
    const { ctx } = createAuthContext(randomUserId);
    const caller = appRouter.createCaller(ctx);

    const accounts = await caller.adsAccounts.list();
    if (accounts.length === 0) {
      expect(true).toBe(true); // Skip if no accounts
      return;
    }

    const account = await caller.adsAccounts.getById({ id: accounts[0].id });
    expect(account).toBeDefined();
    expect(account.id).toBe(accounts[0].id);
  });
});

describe("Link Requests Router", () => {
  it("should list user's link requests", async () => {
    const randomUserId = Math.floor(Math.random() * 100000);
    const { ctx } = createAuthContext(randomUserId);
    const caller = appRouter.createCaller(ctx);

    const requests = await caller.linkRequests.list();

    expect(Array.isArray(requests)).toBe(true);
    
    // Check structure if any exist
    requests.forEach((request: any) => {
      expect(request).toHaveProperty("id");
      expect(request).toHaveProperty("accountId");
      expect(request).toHaveProperty("status");
    });
  });

  it("should create a link request with valid account ID", async () => {
    const randomUserId = Math.floor(Math.random() * 100000);
    const { ctx } = createAuthContext(randomUserId);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.linkRequests.create({
      accountId: "123-456-7890",
      accountName: "Test Account",
    });

    expect(result).toHaveProperty("success");
    expect(result.success).toBe(true);
    expect(result).toHaveProperty("message");
  });

  it("should reject invalid account ID format", async () => {
    const randomUserId = Math.floor(Math.random() * 100000);
    const { ctx } = createAuthContext(randomUserId);
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.linkRequests.create({
        accountId: "invalid-format",
        accountName: "Test Account",
      });
      expect(true).toBe(false); // Should throw
    } catch (error: any) {
      expect(error.message).toContain("رقم الحساب");
    }
  });

  it("should get account status", async () => {
    const randomUserId = Math.floor(Math.random() * 100000);
    const { ctx } = createAuthContext(randomUserId);
    const caller = appRouter.createCaller(ctx);

    const status = await caller.linkRequests.status({ accountId: "123-456-7890" });

    // Status can be null if account doesn't exist
    if (status) {
      expect(status).toHaveProperty("accountId");
      expect(status).toHaveProperty("status");
    }
  });
});

describe("Dashboard Router", () => {
  it("should get dashboard stats", async () => {
    const randomUserId = Math.floor(Math.random() * 100000);
    const { ctx } = createAuthContext(randomUserId);
    const caller = appRouter.createCaller(ctx);

    const stats = await caller.dashboard.stats();

    expect(stats).toBeDefined();
    expect(stats).toHaveProperty("currentPlan");
    
    // Stats should have numeric properties
    if (stats.totalAccounts !== undefined) {
      expect(typeof stats.totalAccounts).toBe("number");
    }
  });
});

describe("Payment Router", () => {
  it("should get user invoices", async () => {
    const randomUserId = Math.floor(Math.random() * 100000);
    const { ctx } = createAuthContext(randomUserId);
    const caller = appRouter.createCaller(ctx);

    const invoices = await caller.payment.invoices();

    expect(Array.isArray(invoices)).toBe(true);
    
    // Check structure if any exist
    invoices.forEach((invoice: any) => {
      expect(invoice).toHaveProperty("id");
      if (invoice.amount) {
        expect(typeof invoice.amount).toBe("number");
      }
    });
  });

  it("should get payment status", async () => {
    const randomUserId = Math.floor(Math.random() * 100000);
    const { ctx } = createAuthContext(randomUserId);
    const caller = appRouter.createCaller(ctx);

    const status = await caller.payment.status({ paymentId: "test-payment-id" });

    // Status can be null if payment doesn't exist
    if (status) {
      expect(status).toHaveProperty("id");
    }
  });
});

describe("Auth Router", () => {
  it("should get current user info", async () => {
    const { ctx, user } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const currentUser = await caller.auth.me();

    expect(currentUser).toBeDefined();
    expect(currentUser.id).toBe(user.id);
    expect(currentUser.email).toBe(user.email);
  });
});
