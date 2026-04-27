import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-123",
    email: "test@example.com",
    name: "Test User",
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
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };

  return { ctx };
}

function createUnauthContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };

  return { ctx };
}

describe("linkRequests router", () => {
  it("should reject unauthenticated users for create", async () => {
    const { ctx } = createUnauthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.linkRequests.create({
        accountId: "123-456-7890",
        accountName: "Test Account",
      })
    ).rejects.toThrow();
  });

  it("should reject unauthenticated users for list", async () => {
    const { ctx } = createUnauthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.linkRequests.list()).rejects.toThrow();
  });
});

describe("adsAccounts router", () => {
  it("should reject unauthenticated users for list", async () => {
    const { ctx } = createUnauthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.adsAccounts.list()).rejects.toThrow();
  });
});

describe("dashboard router", () => {
  it("should reject unauthenticated users for stats", async () => {
    const { ctx } = createUnauthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.dashboard.stats()).rejects.toThrow();
  });

  it("should return stats for authenticated users", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const stats = await caller.dashboard.stats();
    
    expect(stats).toBeDefined();
    expect(stats).toHaveProperty("linkedAccounts");
    expect(stats).toHaveProperty("blockedClicks");
    expect(stats).toHaveProperty("savedAmount");
    expect(stats).toHaveProperty("currentPlan");
  });
});

describe("plans router", () => {
  it("should return list of plans for public access", async () => {
    const { ctx } = createUnauthContext();
    const caller = appRouter.createCaller(ctx);

    const plans = await caller.plans.list();
    
    expect(plans).toBeDefined();
    expect(Array.isArray(plans)).toBe(true);
    // Plans may be empty if not seeded yet
  });
});
