/**
 * Google Authentication Service
 * Main authentication using Google OAuth
 */

import { OAuth2Client } from "google-auth-library";
import { ENV } from "./_core/env";

/**
 * Create OAuth2Client with validated credentials
 */
function createOAuth2Client(): OAuth2Client {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    console.error("[OAuth] Missing credentials:", {
      clientId: !!clientId,
      clientSecret: !!clientSecret,
      redirectUri: !!redirectUri,
    });
    throw new Error("Google OAuth credentials not configured");
  }

  return new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri,
  });
}

let oauth2Client: OAuth2Client | null = null;

function getOAuth2Client(): OAuth2Client {
  if (!oauth2Client) {
    oauth2Client = createOAuth2Client();
  }
  return oauth2Client;
}

/**
 * Generate Google OAuth authorization URL
 */
export function getAuthorizationUrl(state: string): string {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/adwords", // For linking ads accounts
  ];

  const client = getOAuth2Client();
  const url = client.generateAuthUrl({
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
    const client = getOAuth2Client();
    const { tokens } = await client.getToken(code);
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
 * Refresh access token
 */
export async function refreshAccessToken(refreshToken: string) {
  try {
    const client = getOAuth2Client();
    const { credentials } = await client.refreshAccessToken();
    return credentials;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw new Error("فشل تحديث التوكن");
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(expiryDate: number): boolean {
  return expiryDate < Date.now();
}
