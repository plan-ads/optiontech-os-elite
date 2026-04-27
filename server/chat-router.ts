/**
 * Chat Router - نظام الدردشة
 */

import { z } from "zod";
import { protectedProcedure, adminProcedure, router } from "./_core/trpc";
import * as chatDb from "./chat";
import { notifyOwner } from "./_core/notification";

export const chatRouter = router({
  // Start a new conversation
  startConversation: protectedProcedure
    .input(z.object({
      subject: z.string().min(5, "الموضوع يجب أن يكون 5 أحرف على الأقل"),
      message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Create conversation
        const conversationResult = await chatDb.createConversation({
          userId: ctx.user.id,
          subject: input.subject,
          status: "open",
          priority: "medium",
        });
        
        const conversationId = conversationResult.insertId;
        
        // Send first message
        await chatDb.sendMessage({
          conversationId: conversationId as number,
          senderId: ctx.user.id,
          senderType: "customer",
          message: input.message,
        });
        
        // Notify admin
        await notifyOwner({
          title: "محادثة دردشة جديدة",
          content: `عميل جديد ${ctx.user.name} بدأ محادثة: "${input.subject}"`
        });
        
        return { conversationId, success: true };
      } catch (error) {
        console.error("Chat error:", error);
        throw new Error("فشل إنشاء المحادثة");
      }
    }),

  // Get user's conversations
  getConversations: protectedProcedure.query(async ({ ctx }) => {
    try {
      const conversations = await chatDb.getUserConversations(ctx.user.id);
      return conversations;
    } catch (error) {
      console.error("Get conversations error:", error);
      throw new Error("فشل جلب المحادثات");
    }
  }),

  // Get conversation messages
  getMessages: protectedProcedure
    .input(z.object({ conversationId: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const conversation = await chatDb.getConversationById(input.conversationId);
        
        // Verify user owns this conversation
        if (conversation?.userId !== ctx.user.id && ctx.user.role !== "admin") {
          throw new Error("غير مصرح بالوصول إلى هذه المحادثة");
        }
        
        const messages = await chatDb.getConversationMessages(input.conversationId);
        
        // Mark messages as read
        await chatDb.markMessagesAsRead(input.conversationId, ctx.user.id);
        
        return messages;
      } catch (error) {
        console.error("Get messages error:", error);
        throw new Error("فشل جلب الرسائل");
      }
    }),

  // Send message
  sendMessage: protectedProcedure
    .input(z.object({
      conversationId: z.number(),
      message: z.string().min(1, "الرسالة لا يمكن أن تكون فارغة"),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const conversation = await chatDb.getConversationById(input.conversationId);
        
        // Verify user owns this conversation or is admin
        if (conversation?.userId !== ctx.user.id && ctx.user.role !== "admin") {
          throw new Error("غير مصرح بالوصول إلى هذه المحادثة");
        }
        
        const result = await chatDb.sendMessage({
          conversationId: input.conversationId,
          senderId: ctx.user.id,
          senderType: ctx.user.role === "admin" ? "admin" : "customer",
          message: input.message,
        });
        
        // Notify the other party
        if (ctx.user.role === "admin") {
          // Admin replied - notify customer
          // In production, you'd send a real notification
        } else {
          // Customer sent message - notify admin
          await notifyOwner({
            title: "رسالة جديدة من عميل",
            content: `${ctx.user.name}: ${input.message.substring(0, 100)}...`
          });
        }
        
        return { success: true, messageId: result.insertId };
      } catch (error) {
        console.error("Send message error:", error);
        throw new Error("فشل إرسال الرسالة");
      }
    }),

  // Admin: Get all open conversations
  getOpenConversations: adminProcedure.query(async () => {
    try {
      const conversations = await chatDb.getOpenConversations();
      return conversations;
    } catch (error) {
      console.error("Get open conversations error:", error);
      throw new Error("فشل جلب المحادثات");
    }
  }),

  // Admin: Assign conversation
  assignConversation: adminProcedure
    .input(z.object({
      conversationId: z.number(),
      adminId: z.number(),
    }))
    .mutation(async ({ input }) => {
      try {
        await chatDb.assignConversation(input.conversationId, input.adminId);
        return { success: true };
      } catch (error) {
        console.error("Assign conversation error:", error);
        throw new Error("فشل تعيين المحادثة");
      }
    }),

  // Admin: Close conversation
  closeConversation: adminProcedure
    .input(z.object({ conversationId: z.number() }))
    .mutation(async ({ input }) => {
      try {
        await chatDb.closeConversation(input.conversationId);
        return { success: true };
      } catch (error) {
        console.error("Close conversation error:", error);
        throw new Error("فشل إغلاق المحادثة");
      }
    }),
});
