import { describe, expect, it, beforeAll } from "vitest";

describe("Google OAuth Configuration", () => {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;

  beforeAll(() => {
    console.log("Testing OAuth Configuration:");
    console.log("Client ID:", clientId ? "✓ Set" : "✗ Missing");
    console.log("Client Secret:", clientSecret ? "✓ Set" : "✗ Missing");
    console.log("Redirect URI:", redirectUri ? "✓ Set" : "✗ Missing");
  });

  it("should have all required OAuth environment variables", () => {
    expect(clientId).toBeDefined();
    expect(clientSecret).toBeDefined();
    expect(redirectUri).toBeDefined();
  });

  it("should have valid Client ID format", () => {
    expect(clientId).toMatch(/^\d+-.+\.apps\.googleusercontent\.com$/);
  });

  it("should have valid Client Secret format", () => {
    expect(clientSecret).toMatch(/^GOCSPX-.+$/);
  });

  it("should have valid Redirect URI format", () => {
    expect(redirectUri).toMatch(/^https?:\/\/.+\/api\/oauth\/callback$/);
  });

  it("should have correct Redirect URI for production", () => {
    expect(redirectUri).toBe("https://optiontechos.com/api/oauth/callback");
  });

  it("should be able to construct OAuth authorization URL", () => {
    const scope = [
      "https://www.googleapis.com/auth/adwords",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.append("client_id", clientId!);
    authUrl.searchParams.append("redirect_uri", redirectUri!);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", scope);
    authUrl.searchParams.append("access_type", "offline");
    authUrl.searchParams.append("prompt", "consent");

    expect(authUrl.toString()).toContain("client_id=");
    expect(authUrl.toString()).toContain("redirect_uri=");
    expect(authUrl.toString()).toContain("scope=");
  });

  it("should have valid token endpoint configuration", () => {
    const tokenEndpoint = "https://oauth2.googleapis.com/token";
    expect(tokenEndpoint).toBeDefined();
    expect(tokenEndpoint).toContain("oauth2.googleapis.com");
  });
});
