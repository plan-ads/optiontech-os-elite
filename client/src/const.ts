export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/**
 * Get Google OAuth login URL
 * Redirects to Google's OAuth consent screen
 */
export const getLoginUrl = () => {
  // Use Redirect URI from environment (set during build/deployment)
  // This ensures consistency across all environments (localhost, staging, production)
  const redirectUri = import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URI || `${window.location.origin}/api/oauth/callback`;
  
  // Build the authorization URL
  const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
  const scope = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/adwords",
  ].join(" ");

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scope,
    access_type: "offline",
    prompt: "consent",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};
