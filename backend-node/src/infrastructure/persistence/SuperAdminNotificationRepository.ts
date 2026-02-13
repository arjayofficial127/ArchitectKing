import { injectable } from 'tsyringe';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/drizzle/client';
import { superAdminNotificationsTable } from '../db/drizzle/schema';
import { ISuperAdminNotificationRepository } from '../../application/interfaces/ISuperAdminNotificationRepository';
import { SuperAdminNotification } from '../../domain/entities/SuperAdminNotification';

@injectable()
export class SuperAdminNotificationRepository implements ISuperAdminNotificationRepository {
  async create(
    notification: Omit<SuperAdminNotification, 'id' | 'createdAt'>
  ): Promise<SuperAdminNotification> {
    const [created] = await db
      .insert(superAdminNotificationsTable)
      .values({
        type: notification.type,
        relatedId: notification.relatedId ?? null,
        read: notification.read,
      })
      .returning();

    return new SuperAdminNotification(
      created.id,
      created.type,
      created.relatedId,
      created.read,
      created.createdAt
    );
  }

  async findById(id: string): Promise<SuperAdminNotification | null> {
    const [notification] = await db
      .select()
      .from(superAdminNotificationsTable)
      .where(eq(superAdminNotificationsTable.id, id))
      .limit(1);

    if (!notification) return null;

    return new SuperAdminNotification(
      notification.id,
      notification.type,
      notification.relatedId,
      notification.read,
      notification.createdAt
    );
  }

  async findUnread(): Promise<SuperAdminNotification[]> {
    const notifications = await db
      .select()
      .from(superAdminNotificationsTable)
      .where(eq(superAdminNotificationsTable.read, false));

    return notifications.map(
      (n) =>
        new SuperAdminNotification(n.id, n.type, n.relatedId, n.read, n.createdAt)
    );
  }

  async findAll(): Promise<SuperAdminNotification[]> {
    const notifications = await db.select().from(superAdminNotificationsTable);

    return notifications.map(
      (n) =>
        new SuperAdminNotification(n.id, n.type, n.relatedId, n.read, n.createdAt)
    );
  }

  async markAsRead(id: string): Promise<SuperAdminNotification> {
    const [updated] = await db
      .update(superAdminNotificationsTable)
      .set({ read: true })
      .where(eq(superAdminNotificationsTable.id, id))
      .returning();

    return new SuperAdminNotification(
      updated.id,
      updated.type,
      updated.relatedId,
      updated.read,
      updated.createdAt
    );
  }

  async delete(id: string): Promise<void> {
    await db.delete(superAdminNotificationsTable).where(eq(superAdminNotificationsTable.id, id));
  }
}
