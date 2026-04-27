import { OAuth2Client } from "google-auth-library";
import { ENV } from "./_core/env";

/**
 * Google Ads OAuth Service
 * Handles OAuth flow for linking Google Ads accounts
 */

const oauth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
});

/**
 * Generate OAuth authorization URL
 */
export function getAuthorizationUrl(state: string): string {
  const scopes = [
    "https://www.googleapis.com/auth/adwords",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state,
    prompt: "consent",
  });

  return url;
}

/**
 * Exchange authorization code for tokens
 */
export async function exchangeCodeForTokens(code: string) {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
  } catch (error) {
    console.error("Failed to exchange code for tokens:", error);
    throw new Error("فشل تبادل الرمز للحصول على التوكن");
  }
}

/**
 * Get user info from Google
 */
export async function getUserInfo(accessToken: string) {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get user info: ${response.statusText}`);
    }

    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.error("Failed to get user info:", error);
    throw new Error("فشل الحصول على معلومات المستخدم");
  }
}

/**
 * Get Google Ads accounts for a user
 */
export async function getGoogleAdsAccounts(accessToken: string) {
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;

  if (!developerToken) {
    throw new Error("Developer Token not configured");
  }

  try {
    // Get customer list
    const response = await fetch(
      "https://googleads.googleapis.com/v17/customers:listAccessibleCustomers",
      {
        method: "POST",
        headers: {
          "developer-token": developerToken,
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Google Ads API error:", error);
      throw new Error(`Failed to get accounts: ${response.statusText}`);
    }

    const data = await response.json();
    return data.resourceNames || [];
  } catch (error) {
    console.error("Failed to get Google Ads accounts:", error);
    throw new Error("فشل جلب حسابات Google Ads");
  }
}

/**
 * Get account details
 */
export async function getAccountDetails(
  customerId: string,
  accessToken: string
) {
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;

  if (!developerToken) {
    throw new Error("Developer Token not configured");
  }

  try {
    const response = await fetch(
      `https://googleads.googleapis.com/v17/customers/${customerId}`,
      {
        headers: {
          "developer-token": developerToken,
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get account details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get account details:", error);
    throw new Error("فشل جلب تفاصيل الحساب");
  }
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(refreshToken: string) {
  try {
    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const { credentials } = await oauth2Client.refreshAccessToken();
    return credentials;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw new Error("فشل تحديث التوكن");
  }
}

/**
 * Revoke access token
 */
export async function revokeAccessToken(accessToken: string) {
  try {
    await oauth2Client.revokeToken(accessToken);
    return true;
  } catch (error) {
    console.error("Failed to revoke access token:", error);
    return false;
  }
}

/**
 * Validate token expiration
 */
export function isTokenExpired(expiryDate: number | null): boolean {
  if (!expiryDate) return true;
  return Date.now() >= expiryDate;
}
