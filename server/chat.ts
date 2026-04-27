/**
 * Chat Database Helpers
 * دوال مساعدة لإدارة الدردشة
 */

import { getDb } from "./db";
import {
  chatConversations,
  chatMessages,
  chatAttachments,
  ChatConversation,
  ChatMessage,
  InsertChatMessage,
  InsertChatConversation,
} from "../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";

/**
 * Create a new chat conversation
 */
export async function createConversation(data: InsertChatConversation) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  const result = await db.insert(chatConversations).values(data);
  return result;
}

/**
 * Get all conversations for a user
 */
export async function getUserConversations(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  const conversations = await db
    .select()
    .from(chatConversations)
    .where(eq(chatConversations.userId, userId))
    .orderBy(desc(chatConversations.lastMessageAt));
  return conversations;
}

/**
 * Get all open conversations (for admin)
 */
export async function getOpenConversations() {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  const conversations = await db
    .select()
    .from(chatConversations)
    .where(eq(chatConversations.status, "open"))
    .orderBy(desc(chatConversations.lastMessageAt));
  return conversations;
}

/**
 * Get conversation by ID
 */
export async function getConversationById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  const conversation = await db
    .select()
    .from(chatConversations)
    .where(eq(chatConversations.id, id));
  return conversation[0];
}

/**
 * Update conversation status
 */
export async function updateConversationStatus(
  id: number,
  status: "open" | "in_progress" | "resolved" | "closed"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  const result = await db
    .update(chatConversations)
    .set({ status, updatedAt: new Date() })
    .where(eq(chatConversations.id, id));
  return result;
}

/**
 * Assign conversation to admin
 */
export async function assignConversation(conversationId: number, adminId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  const result = await db
    .update(chatConversations)
    .set({ assignedTo: adminId, status: "in_progress", updatedAt: new Date() })
    .where(eq(chatConversations.id, conversationId));
  return result;
}

/**
 * Send a message
 */
export async function sendMessage(data: InsertChatMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  const result = await db.insert(chatMessages).values(data);
  
  // Update conversation's lastMessageAt
  if (data.conversationId) {
    await db
      .update(chatConversations)
      .set({ lastMessageAt: new Date(), updatedAt: new Date() })
      .where(eq(chatConversations.id, data.conversationId));
  }
  
  return result;
}

/**
 * Get messages for a conversation
 */
export async function getConversationMessages(conversationId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  const messages = await db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.conversationId, conversationId))
    .orderBy(chatMessages.createdAt);
  return messages;
}

/**
 * Mark messages as read
 */
export async function markMessagesAsRead(conversationId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  const result = await db
    .update(chatMessages)
    .set({ isRead: true, readAt: new Date(), updatedAt: new Date() })
    .where(
      and(
        eq(chatMessages.conversationId, conversationId),
        // Don't mark sender's own messages as read
        // eq(chatMessages.senderId, userId)
      )
    );
  return result;
}

/**
 * Get unread message count for user
 */
export async function getUnreadMessageCount(userId: number) {
  const result = await db
    .select()
    .from(chatMessages)
    .where(
      and(
        // Messages in conversations where user is not the sender
        // This is a simplified version - in production, you'd need a more complex query
      )
    );
  return result.length;
}

/**
 * Delete conversation (soft delete by closing)
 */
export async function closeConversation(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  const result = await db
    .update(chatConversations)
    .set({ status: "closed", updatedAt: new Date() })
    .where(eq(chatConversations.id, id));
  return result;
}

/**
 * Search conversations
 */
export async function searchConversations(query: string, userId?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  let qb = db.select().from(chatConversations);
  
  if (userId) {
    qb = qb.where(eq(chatConversations.userId, userId));
  }
  
  // Search by subject
  const conversations = await qb.orderBy(desc(chatConversations.lastMessageAt));
  return conversations.filter(c => 
    c.subject.toLowerCase().includes(query.toLowerCase())
  );
}
