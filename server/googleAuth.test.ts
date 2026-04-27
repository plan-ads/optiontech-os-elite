import { describe, it, expect, vi, beforeEach } from "vitest";
import * as googleAuth from "./googleAuthService";

describe("Google Auth Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAuthorizationUrl", () => {
    it("should generate a valid Google OAuth authorization URL", () => {
      const state = "test-state";
      const authUrl = googleAuth.getAuthorizationUrl(state);

      expect(authUrl).toContain("https://accounts.google.com/o/oauth2/v2/auth");
      expect(authUrl).toContain("client_id=");
      expect(authUrl).toContain("redirect_uri=");
      expect(authUrl).toContain("response_type=code");
      expect(authUrl).toContain("scope=");
      expect(authUrl).toContain("access_type=offline");
      expect(authUrl).toContain("prompt=consent");
    });

    it("should include required scopes", () => {
      const state = "test-state";
      const authUrl = googleAuth.getAuthorizationUrl(state);

      expect(authUrl).toContain("userinfo.email");
      expect(authUrl).toContain("userinfo.profile");
      expect(authUrl).toContain("adwords");
    });
  });

  describe("isTokenExpired", () => {
    it("should return true for expired tokens", () => {
      const pastTime = Date.now() - 1000; // 1 second ago
      expect(googleAuth.isTokenExpired(pastTime)).toBe(true);
    });

    it("should return false for valid tokens", () => {
      const futureTime = Date.now() + 3600000; // 1 hour from now
      expect(googleAuth.isTokenExpired(futureTime)).toBe(false);
    });

    it("should return true for tokens expiring now", () => {
      const nowTime = Date.now() - 1; // Just past now
      expect(googleAuth.isTokenExpired(nowTime)).toBe(true);
    });
  });

  describe("exchangeCodeForTokens", () => {
    it("should throw error for invalid code", async () => {
      try {
        await googleAuth.exchangeCodeForTokens("invalid-code");
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("getUserInfo", () => {
    it("should throw error for invalid token", async () => {
      try {
        await googleAuth.getUserInfo("invalid-token");
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
