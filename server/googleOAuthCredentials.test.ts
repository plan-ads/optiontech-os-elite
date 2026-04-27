import { describe, it, expect, beforeAll } from "vitest";

describe("Google OAuth Credentials Validation", () => {
  let clientId: string;
  let clientSecret: string;

  beforeAll(() => {
    clientId = process.env.GOOGLE_OAUTH_CLIENT_ID || "";
    clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || "";
  });

  it("should have GOOGLE_OAUTH_CLIENT_ID environment variable set", () => {
    expect(clientId).toBeTruthy();
    expect(clientId.length).toBeGreaterThan(0);
  });

  it("should have GOOGLE_OAUTH_CLIENT_SECRET environment variable set", () => {
    expect(clientSecret).toBeTruthy();
    expect(clientSecret.length).toBeGreaterThan(0);
  });

  it("should have valid Google OAuth Client ID format", () => {
    // Google Client IDs follow the pattern: {numeric-id}-{alphanumeric}.apps.googleusercontent.com
    const clientIdPattern = /^\d+-[a-z0-9]+\.apps\.googleusercontent\.com$/;
    expect(clientId).toMatch(clientIdPattern);
  });

  it("should have valid Google OAuth Client Secret format", () => {
    // Google Client Secrets start with GOCSPX-
    expect(clientSecret).toMatch(/^GOCSPX-/);
  });

  it("should have matching Client ID pattern", () => {
    // The Client ID should contain the numeric prefix
    expect(clientId).toContain("509478860777");
  });

  it("should validate OAuth configuration structure", () => {
    const config = {
      clientId,
      clientSecret,
      redirectUri: process.env.VITE_OAUTH_REDIRECT_URI || "http://localhost:3000/api/oauth/callback",
    };

    expect(config.clientId).toBeTruthy();
    expect(config.clientSecret).toBeTruthy();
    expect(config.redirectUri).toBeTruthy();
    expect(config.redirectUri).toContain("/api/oauth/callback");
  });
});
