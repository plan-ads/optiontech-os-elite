/**
 * Admin Database Helpers
 * دوال مساعدة لقاعدة البيانات الخاصة بـ Admin Dashboard
 */

import { db } from "./db";
import {
  adminLogs,
  chatConversations,
  chatMessages,
  subscriptions,
  users,
  adsAccounts,
  payments,
  reports,
  reportSchedules,
  emailLogs,
  InsertAdminLog,
  InsertReport,
  InsertReportSchedule,
  InsertEmailLog,
} from "@/drizzle/schema";
import { eq, desc, and, gte, lte } from "drizzle-orm";

/**
 * Get admin dashboard statistics
 */
export async function getAdminDashboardStats() {
  try {
    // Total users
    const totalUsers = await db
      .select()
      .from(users)
      .then((rows) => rows.length);

    // Active subscriptions
    const activeSubscriptions = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.status, "active"))
      .then((rows) => rows.length);

    // Total revenue (from payments)
    const totalRevenue = await db
      .select()
      .from(payments)
      .where(eq(payments.status, "succeeded"))
      .then((rows) =>
        rows.reduce((sum, row) => sum + parseFloat(row.amount.toString()), 0)
      );

    // Open conversations
    const openConversations = await db
      .select()
      .from(chatConversations)
      .where(eq(chatConversations.status, "open"))
      .then((rows) => rows.length);

    // Linked ads accounts
    const linkedAdsAccounts = await db
      .select()
      .from(adsAccounts)
      .where(eq(adsAccounts.status, "linked"))
      .then((rows) => rows.length);

    return {
      totalUsers,
      activeSubscriptions,
      totalRevenue,
      openConversations,
      linkedAdsAccounts,
    };
  } catch (error) {
    console.error("Error getting admin dashboard stats:", error);
    throw error;
  }
}

/**
 * Get all conversations with pagination
 */
export async function getAllConversations(limit = 50, offset = 0) {
  try {
    const conversations = await db
      .select({
        id: chatConversations.id,
        userId: chatConversations.userId,
        subject: chatConversations.subject,
        status: chatConversations.status,
        priority: chatConversations.priority,
        assignedTo: chatConversations.assignedTo,
        lastMessageAt: chatConversations.lastMessageAt,
        createdAt: chatConversations.createdAt,
        userName: users.name,
        userEmail: users.email,
      })
      .from(chatConversations)
      .leftJoin(users, eq(chatConversations.userId, users.id))
      .orderBy(desc(chatConversations.lastMessageAt))
      .limit(limit)
      .offset(offset);

    return conversations;
  } catch (error) {
    console.error("Error getting all conversations:", error);
    throw error;
  }
}

/**
 * Get all customers with their subscriptions
 */
export async function getAllCustomers(limit = 50, offset = 0) {
  try {
    const customers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
        lastSignedIn: users.lastSignedIn,
        subscriptionStatus: subscriptions.status,
        planName: subscriptions.planId,
      })
      .from(users)
      .leftJoin(subscriptions, eq(users.id, subscriptions.userId))
      .where(eq(users.role, "user"))
      .orderBy(desc(users.createdAt))
      .limit(limit)
      .offset(offset);

    return customers;
  } catch (error) {
    console.error("Error getting all customers:", error);
    throw error;
  }
}

/**
 * Get all subscriptions with details
 */
export async function getAllSubscriptions(limit = 50, offset = 0) {
  try {
    const subs = await db
      .select({
        id: subscriptions.id,
        userId: subscriptions.userId,
        planId: subscriptions.planId,
        status: subscriptions.status,
        billingCycle: subscriptions.billingCycle,
        startDate: subscriptions.startDate,
        endDate: subscriptions.endDate,
        userName: users.name,
        userEmail: users.email,
      })
      .from(subscriptions)
      .leftJoin(users, eq(subscriptions.userId, users.id))
      .orderBy(desc(subscriptions.createdAt))
      .limit(limit)
      .offset(offset);

    return subs;
  } catch (error) {
    console.error("Error getting all subscriptions:", error);
    throw error;
  }
}

/**
 * Log admin action
 */
export async function logAdminAction(data: InsertAdminLog) {
  try {
    const result = await db.insert(adminLogs).values(data);
    return result;
  } catch (error) {
    console.error("Error logging admin action:", error);
    throw error;
  }
}

/**
 * Get admin logs with pagination
 */
export async function getAdminLogs(limit = 50, offset = 0) {
  try {
    const logs = await db
      .select({
        id: adminLogs.id,
        adminId: adminLogs.adminId,
        action: adminLogs.action,
        entityType: adminLogs.entityType,
        entityId: adminLogs.entityId,
        details: adminLogs.details,
        createdAt: adminLogs.createdAt,
        adminName: users.name,
        adminEmail: users.email,
      })
      .from(adminLogs)
      .leftJoin(users, eq(adminLogs.adminId, users.id))
      .orderBy(desc(adminLogs.createdAt))
      .limit(limit)
      .offset(offset);

    return logs;
  } catch (error) {
    console.error("Error getting admin logs:", error);
    throw error;
  }
}

/**
 * Create a report
 */
export async function createReport(data: InsertReport) {
  try {
    const result = await db.insert(reports).values(data);
    return result;
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
}

/**
 * Get reports with pagination
 */
export async function getReports(limit = 50, offset = 0) {
  try {
    const reportsData = await db
      .select()
      .from(reports)
      .orderBy(desc(reports.generatedAt))
      .limit(limit)
      .offset(offset);

    return reportsData;
  } catch (error) {
    console.error("Error getting reports:", error);
    throw error;
  }
}

/**
 * Create report schedule
 */
export async function createReportSchedule(data: InsertReportSchedule) {
  try {
    const result = await db.insert(reportSchedules).values(data);
    return result;
  } catch (error) {
    console.error("Error creating report schedule:", error);
    throw error;
  }
}

/**
 * Get report schedules
 */
export async function getReportSchedules(limit = 50, offset = 0) {
  try {
    const schedules = await db
      .select()
      .from(reportSchedules)
      .where(eq(reportSchedules.isActive, true))
      .orderBy(desc(reportSchedules.createdAt))
      .limit(limit)
      .offset(offset);

    return schedules;
  } catch (error) {
    console.error("Error getting report schedules:", error);
    throw error;
  }
}

/**
 * Log email
 */
export async function logEmail(data: InsertEmailLog) {
  try {
    const result = await db.insert(emailLogs).values(data);
    return result;
  } catch (error) {
    console.error("Error logging email:", error);
    throw error;
  }
}

/**
 * Get email logs with pagination
 */
export async function getEmailLogs(limit = 50, offset = 0) {
  try {
    const logs = await db
      .select()
      .from(emailLogs)
      .orderBy(desc(emailLogs.createdAt))
      .limit(limit)
      .offset(offset);

    return logs;
  } catch (error) {
    console.error("Error getting email logs:", error);
    throw error;
  }
}

/**
 * Get conversation details with messages
 */
export async function getConversationDetails(conversationId: number) {
  try {
    const conversation = await db
      .select()
      .from(chatConversations)
      .where(eq(chatConversations.id, conversationId));

    if (!conversation.length) {
      throw new Error("Conversation not found");
    }

    const messages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.conversationId, conversationId))
      .orderBy(desc(chatMessages.createdAt));

    return {
      conversation: conversation[0],
      messages,
    };
  } catch (error) {
    console.error("Error getting conversation details:", error);
    throw error;
  }
}

/**
 * Update conversation status
 */
export async function updateConversationStatus(
  conversationId: number,
  status: "open" | "in_progress" | "resolved" | "closed"
) {
  try {
    const result = await db
      .update(chatConversations)
      .set({ status })
      .where(eq(chatConversations.id, conversationId));

    return result;
  } catch (error) {
    console.error("Error updating conversation status:", error);
    throw error;
  }
}

/**
 * Assign conversation to admin
 */
export async function assignConversation(
  conversationId: number,
  adminId: number
) {
  try {
    const result = await db
      .update(chatConversations)
      .set({ assignedTo: adminId })
      .where(eq(chatConversations.id, conversationId));

    return result;
  } catch (error) {
    console.error("Error assigning conversation:", error);
    throw error;
  }
}
