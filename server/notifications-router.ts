import { router, protectedProcedure } from "./server/_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const notificationsRouter = router({
  list: protectedProcedure
    .query(async ({ ctx }) => {
      const notifications = await db.getUserNotifications(ctx.user.id);
      return notifications;
    }),

  markAsRead: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await db.markNotificationAsRead(input.id, ctx.user.id);
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await db.deleteNotification(input.id, ctx.user.id);
      return { success: true };
    }),

  markAllAsRead: protectedProcedure
    .mutation(async ({ ctx }) => {
      await db.markAllNotificationsAsRead(ctx.user.id);
      return { success: true };
    }),
});
