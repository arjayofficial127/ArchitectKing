import { Router, Request, Response } from 'express';
import { container } from '../../../core/di/container';
import { TYPES } from '../../../core/di/types';
import { NotificationService } from '../../../infrastructure/services/superadmin/notification.service';
import { authMiddleware } from '../../middleware/authMiddleware';
import { requireSuperAdmin } from '../../middleware/requireSuperAdmin';

const router: ReturnType<typeof Router> = Router();

// All routes require authentication and SuperAdmin
router.use(authMiddleware);
router.use(requireSuperAdmin);

// GET /api/superadmin/notifications
router.get('/', async (req: Request, res: Response, next) => {
  try {
    const notificationService = container.resolve<NotificationService>(TYPES.INotificationService);
    const unreadOnly = req.query.unread === 'true';
    
    const notifications = unreadOnly
      ? await notificationService.getUnreadNotifications()
      : await notificationService.getAllNotifications();

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/superadmin/notifications/:id/read
router.patch('/:id/read', async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;

    const notificationService = container.resolve<NotificationService>(TYPES.INotificationService);
    const notification = await notificationService.markAsRead(id);

    res.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
