import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Plans table - الباقات المتاحة
 */
export const plans = mysqlTable("plans", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  nameAr: varchar("nameAr", { length: 100 }).notNull(),
  description: text("description"),
  descriptionAr: text("descriptionAr"),
  priceMonthly: decimal("priceMonthly", { precision: 10, scale: 2 }).notNull(),
  priceYearly: decimal("priceYearly", { precision: 10, scale: 2 }).notNull(),
  maxAccounts: int("maxAccounts").notNull().default(1),
  protectionLevel: mysqlEnum("protectionLevel", ["quick", "medium", "strong", "nuclear"]).notNull().default("quick"),
  features: text("features"), // JSON array of features
  isActive: boolean("isActive").notNull().default(true),
  sortOrder: int("sortOrder").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Plan = typeof plans.$inferSelect;
export type InsertPlan = typeof plans.$inferInsert;

/**
 * Subscriptions table - اشتراكات العملاء
 */
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  planId: int("planId").notNull(),
  status: mysqlEnum("status", ["active", "cancelled", "expired", "pending"]).notNull().default("pending"),
  billingCycle: mysqlEnum("billingCycle", ["monthly", "yearly"]).notNull().default("monthly"),
  startDate: timestamp("startDate").defaultNow().notNull(),
  endDate: timestamp("endDate"),
  cancelledAt: timestamp("cancelledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

/**
 * Google Ads Accounts table - حسابات Google Ads المرتبطة
 */
export const adsAccounts = mysqlTable("ads_accounts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  accountId: varchar("accountId", { length: 20 }).notNull(), // Format: XXX-XXX-XXXX
  accountName: varchar("accountName", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["pending", "linked", "rejected", "disconnected"]).notNull().default("pending"),
  protectionEnabled: boolean("protectionEnabled").notNull().default(false),
  protectionLevel: mysqlEnum("protectionLevel", ["quick", "medium", "strong", "nuclear"]).default("quick"),
  linkedAt: timestamp("linkedAt"),
  lastSyncAt: timestamp("lastSyncAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AdsAccount = typeof adsAccounts.$inferSelect;
export type InsertAdsAccount = typeof adsAccounts.$inferInsert;

/**
 * Link Requests table - طلبات ربط الحسابات
 */
export const linkRequests = mysqlTable("link_requests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  accountId: varchar("accountId", { length: 20 }).notNull(),
  accountName: varchar("accountName", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).notNull().default("pending"),
  notes: text("notes"),
  processedAt: timestamp("processedAt"),
  processedBy: int("processedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LinkRequest = typeof linkRequests.$inferSelect;
export type InsertLinkRequest = typeof linkRequests.$inferInsert;

/**
 * Protection Stats table - إحصائيات الحماية
 */
export const protectionStats = mysqlTable("protection_stats", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("accountId").notNull(),
  date: timestamp("date").notNull(),
  blockedClicks: int("blockedClicks").notNull().default(0),
  suspiciousClicks: int("suspiciousClicks").notNull().default(0),
  savedAmount: decimal("savedAmount", { precision: 10, scale: 2 }).notNull().default("0"),
  totalClicks: int("totalClicks").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProtectionStat = typeof protectionStats.$inferSelect;
export type InsertProtectionStat = typeof protectionStats.$inferInsert;

/**
 * Stripe Customers table - ربط العملاء بـ Stripe
 */
export const stripeCustomers = mysqlTable("stripe_customers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StripeCustomer = typeof stripeCustomers.$inferSelect;
export type InsertStripeCustomer = typeof stripeCustomers.$inferInsert;

/**
 * Stripe Invoices table - الفواتير
 */
export const stripeInvoices = mysqlTable("stripe_invoices", {
  id: int("id").autoincrement().primaryKey(),
  subscriptionId: int("subscriptionId").notNull(),
  stripeInvoiceId: varchar("stripeInvoiceId", { length: 255 }).notNull().unique(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  status: mysqlEnum("status", ["draft", "open", "paid", "void", "uncollectible"]).notNull().default("open"),
  paidAt: timestamp("paidAt"),
  dueDate: timestamp("dueDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StripeInvoice = typeof stripeInvoices.$inferSelect;
export type InsertStripeInvoice = typeof stripeInvoices.$inferInsert;

/**
 * Payments table - السدادات
 */
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  subscriptionId: int("subscriptionId").notNull(),
  stripePaymentId: varchar("stripePaymentId", { length: 255 }).notNull().unique(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  status: mysqlEnum("status", ["pending", "succeeded", "failed", "canceled"]).notNull().default("pending"),
  paymentMethod: varchar("paymentMethod", { length: 50 }).notNull(), // card, bank_transfer, etc
  paidAt: timestamp("paidAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * Subscription Plans Prices - أسعار الباقات
 */
export const planPrices = mysqlTable("plan_prices", {
  id: int("id").autoincrement().primaryKey(),
  planId: int("planId").notNull(),
  stripePriceId: varchar("stripePriceId", { length: 255 }).notNull().unique(),
  billingCycle: mysqlEnum("billingCycle", ["monthly", "yearly"]).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PlanPrice = typeof planPrices.$inferSelect;
export type InsertPlanPrice = typeof planPrices.$inferInsert;

/**
 * OAuth Tokens table - تخزين توكنات OAuth للعملاء
 */
export const oauthTokens = mysqlTable("oauth_tokens", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(), // One token per user
  accessToken: text("accessToken").notNull(),
  refreshToken: text("refreshToken"),
  expiresAt: timestamp("expiresAt"),
  scope: text("scope"), // Space-separated scopes
  tokenType: varchar("tokenType", { length: 50 }).notNull().default("Bearer"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OAuthToken = typeof oauthTokens.$inferSelect;
export type InsertOAuthToken = typeof oauthTokens.$inferInsert;

/**
 * Google Ads Accounts OAuth table - ربط حسابات Google Ads عبر OAuth
 */
export const googleAdsOAuthAccounts = mysqlTable("google_ads_oauth_accounts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  customerId: varchar("customerId", { length: 20 }).notNull(), // Google Ads customer ID
  accountName: varchar("accountName", { length: 255 }).notNull(),
  accountEmail: varchar("accountEmail", { length: 320 }),
  status: mysqlEnum("status", ["pending", "linked", "rejected", "disconnected"]).notNull().default("pending"),
  linkedAt: timestamp("linkedAt"),
  disconnectedAt: timestamp("disconnectedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GoogleAdsOAuthAccount = typeof googleAdsOAuthAccounts.$inferSelect;
export type InsertGoogleAdsOAuthAccount = typeof googleAdsOAuthAccounts.$inferInsert;


/**
 * Notifications table - الإشعارات
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  type: mysqlEnum("type", ["success", "error", "info", "warning"]).notNull().default("info"),
  read: boolean("read").notNull().default(false),
  readAt: timestamp("readAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Chat Conversations table - محادثات الدردشة
 */
export const chatConversations = mysqlTable("chat_conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Customer user ID
  subject: varchar("subject", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["open", "in_progress", "resolved", "closed"]).notNull().default("open"),
  priority: mysqlEnum("priority", ["low", "medium", "high", "urgent"]).notNull().default("medium"),
  assignedTo: int("assignedTo"), // Admin user ID
  lastMessageAt: timestamp("lastMessageAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChatConversation = typeof chatConversations.$inferSelect;
export type InsertChatConversation = typeof chatConversations.$inferInsert;

/**
 * Chat Messages table - رسائل الدردشة
 */
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  senderId: int("senderId").notNull(), // User ID of sender
  senderType: mysqlEnum("senderType", ["customer", "admin"]).notNull(),
  message: text("message").notNull(),
  attachmentUrl: varchar("attachmentUrl", { length: 500 }),
  attachmentType: varchar("attachmentType", { length: 50 }), // image, file, etc
  isRead: boolean("isRead").notNull().default(false),
  readAt: timestamp("readAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Chat Attachments table - ملفات الدردشة
 */
export const chatAttachments = mysqlTable("chat_attachments", {
  id: int("id").autoincrement().primaryKey(),
  messageId: int("messageId").notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileUrl: varchar("fileUrl", { length: 500 }).notNull(),
  fileSize: int("fileSize").notNull(), // in bytes
  fileType: varchar("fileType", { length: 50 }).notNull(), // MIME type
  uploadedBy: int("uploadedBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatAttachment = typeof chatAttachments.$inferSelect;
export type InsertChatAttachment = typeof chatAttachments.$inferInsert;

/**
 * Admin Logs table - سجلات نشاط المسؤولين
 */
export const adminLogs = mysqlTable("admin_logs", {
  id: int("id").autoincrement().primaryKey(),
  adminId: int("adminId").notNull(), // Admin user ID
  action: varchar("action", { length: 100 }).notNull(), // e.g., "view_dashboard", "update_subscription"
  entityType: varchar("entityType", { length: 50 }), // e.g., "user", "subscription", "conversation"
  entityId: int("entityId"), // ID of the entity being acted upon
  details: text("details"), // JSON object with additional details
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AdminLog = typeof adminLogs.$inferSelect;
export type InsertAdminLog = typeof adminLogs.$inferInsert;

/**
 * Reports table - التقارير
 */
export const reports = mysqlTable("reports", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"), // User ID if report is for specific user, null if global
  reportType: mysqlEnum("reportType", ["daily", "weekly", "monthly", "custom"]).notNull().default("daily"),
  title: varchar("title", { length: 255 }).notNull(),
  titleAr: varchar("titleAr", { length: 255 }).notNull(),
  content: text("content").notNull(), // HTML content of the report
  summary: text("summary"), // JSON summary of key metrics
  generatedAt: timestamp("generatedAt").notNull(),
  sentAt: timestamp("sentAt"),
  sentTo: text("sentTo"), // JSON array of email addresses
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;

/**
 * Report Schedules table - جدولة التقارير
 */
export const reportSchedules = mysqlTable("report_schedules", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"), // User ID if schedule is for specific user, null if global
  reportType: mysqlEnum("reportType", ["daily", "weekly", "monthly"]).notNull(),
  frequency: mysqlEnum("frequency", ["daily", "weekly", "monthly"]).notNull(),
  dayOfWeek: int("dayOfWeek"), // 0-6 for weekly reports (0=Sunday)
  dayOfMonth: int("dayOfMonth"), // 1-31 for monthly reports
  hour: int("hour").notNull().default(9), // Hour to send report (0-23)
  minute: int("minute").notNull().default(0), // Minute to send report (0-59)
  timezone: varchar("timezone", { length: 50 }).notNull().default("UTC"),
  emailAddresses: text("emailAddresses").notNull(), // JSON array of email addresses
  isActive: boolean("isActive").notNull().default(true),
  lastSentAt: timestamp("lastSentAt"),
  nextSendAt: timestamp("nextSendAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ReportSchedule = typeof reportSchedules.$inferSelect;
export type InsertReportSchedule = typeof reportSchedules.$inferInsert;

/**
 * Email Logs table - سجلات البريد الإلكتروني
 */
export const emailLogs = mysqlTable("email_logs", {
  id: int("id").autoincrement().primaryKey(),
  recipientEmail: varchar("recipientEmail", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  emailType: varchar("emailType", { length: 50 }).notNull(), // e.g., "report", "notification", "invoice"
  status: mysqlEnum("status", ["pending", "sent", "failed", "bounced"]).notNull().default("pending"),
  sentAt: timestamp("sentAt"),
  failureReason: text("failureReason"),
  relatedId: int("relatedId"), // ID of related entity (report, notification, etc)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailLog = typeof emailLogs.$inferSelect;
export type InsertEmailLog = typeof emailLogs.$inferInsert;
