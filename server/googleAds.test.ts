import { describe, expect, it, beforeAll } from "vitest";

describe("Google Ads API Configuration", () => {
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

  beforeAll(() => {
    console.log("Testing Google Ads Configuration:");
    console.log("Developer Token:", developerToken ? "✓ Set" : "✗ Missing");
    console.log("OAuth Client ID:", clientId ? "✓ Set" : "✗ Missing");
    console.log("OAuth Client Secret:", clientSecret ? "✓ Set" : "✗ Missing");
  });

  it("should have Google Ads Developer Token", () => {
    expect(developerToken).toBeDefined();
    expect(developerToken).toBeTruthy();
  });

  it("should have valid Developer Token format", () => {
    expect(developerToken).toMatch(/^[a-zA-Z0-9_-]+$/);
  });

  it("should have sufficient token length", () => {
    expect(developerToken?.length).toBeGreaterThan(10);
  });

  it("should have all required credentials for Google Ads API", () => {
    expect(developerToken).toBeDefined();
    expect(clientId).toBeDefined();
    expect(clientSecret).toBeDefined();
  });

  it("should construct valid Google Ads API headers", () => {
    const headers = {
      "developer-token": developerToken,
      "client-id": clientId,
      "Content-Type": "application/json",
    };

    expect(headers["developer-token"]).toBeDefined();
    expect(headers["client-id"]).toBeDefined();
    expect(headers["Content-Type"]).toBe("application/json");
  });

  it("should have valid API endpoint configuration", () => {
    const apiEndpoint = "https://googleads.googleapis.com/v17/customers";
    expect(apiEndpoint).toContain("googleads.googleapis.com");
    expect(apiEndpoint).toContain("/v17/");
  });

  it("should support OAuth scopes for Google Ads", () => {
    const scopes = [
      "https://www.googleapis.com/auth/adwords",
      "https://www.googleapis.com/auth/adwords.readonly",
    ];

    expect(scopes).toContain("https://www.googleapis.com/auth/adwords");
    expect(scopes.length).toBeGreaterThan(0);
  });
});
