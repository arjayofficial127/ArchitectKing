import { Request, Response, NextFunction } from 'express';
import { container } from '../../core/di/container';
import { TYPES } from '../../core/di/types';
import { ISuperAdminRepository } from '../../application/interfaces/ISuperAdminRepository';
import { ForbiddenError, UnauthorizedError } from '../../core/errors/AppError';

/**
 * Middleware to require user is a SuperAdmin
 * Usage: router.use(requireSuperAdmin)
 */
export async function requireSuperAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user?.userId;

    // Check authentication first
    if (!userId) {
      return next(new UnauthorizedError('Authentication required'));
    }

    // Check if user is SuperAdmin
    const superAdminRepo = container.resolve<ISuperAdminRepository>(TYPES.ISuperAdminRepository);
    const superAdmin = await superAdminRepo.findByUserId(userId);

    if (!superAdmin || !superAdmin.isActive) {
      return next(new ForbiddenError('SuperAdmin access required'));
    }

    // User is SuperAdmin, allow access
    next();
  } catch (error) {
    next(error);
  }
}
