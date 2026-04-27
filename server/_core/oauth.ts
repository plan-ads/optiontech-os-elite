import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";
import * as googleAuth from "../googleAuthService";
import * as smartSync from "../smartSyncService";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  // Get Google OAuth authorization URL
  app.get("/api/oauth/authorize", (req: Request, res: Response) => {
    try {
      const state = btoa(`${req.protocol}://${req.get("host")}/api/oauth/callback`);
      const authUrl = googleAuth.getAuthorizationUrl(state);
      res.json({ authUrl });
    } catch (error) {
      console.error("[OAuth] Authorization URL generation failed", error);
      res.status(500).json({ error: "فشل إنشاء رابط التفويض" });
    }
  });

  // Google OAuth callback
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      // Exchange code for tokens
      const tokens = await googleAuth.exchangeCodeForTokens(code);
      
      if (!tokens.access_token) {
        res.status(400).json({ error: "No access token received" });
        return;
      }

      // Get user info from Google
      const userInfo = await googleAuth.getUserInfo(tokens.access_token);

      if (!userInfo.email) {
        res.status(400).json({ error: "Email not found in user info" });
        return;
      }

      // Create or update user in database
      const user = await db.upsertUser({
        openId: userInfo.id || userInfo.email, // Use Google ID or email as unique identifier
        name: userInfo.name || null,
        email: userInfo.email,
        loginMethod: "google",
        lastSignedIn: new Date(),
      });

      // Store Google OAuth tokens for later use (for linking ads accounts)
      if (tokens.refresh_token) {
        await db.upsertOAuthToken({
          userId: user.id,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
          scope: tokens.scope || null,
          tokenType: "Bearer",
        });
      }

      // Create session token
      const sessionToken = await sdk.createSessionToken(user.openId, {
        name: user.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      // Redirect to dashboard
      res.redirect(302, "/dashboard");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "فشل معالجة رد الاتصال" });
    }
  });

  // Fallback: Keep Manus OAuth for backward compatibility (if needed)
  app.get("/api/oauth/callback-manus", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
