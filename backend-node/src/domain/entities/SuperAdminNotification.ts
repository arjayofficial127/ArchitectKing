/**
 * SuperAdmin Notification domain entity
 */
export class SuperAdminNotification {
  constructor(
    public readonly id: string,
    public readonly type: 'booking_request' | 'system' | 'reminder',
    public readonly relatedId: string | null,
    public readonly read: boolean,
    public readonly createdAt: Date
  ) {}
}
