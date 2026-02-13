import { Router, Request, Response } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { requireSuperAdmin } from '../../middleware/requireSuperAdmin';

const router: ReturnType<typeof Router> = Router();

// All routes require authentication and SuperAdmin
router.use(authMiddleware);
router.use(requireSuperAdmin);

// Stub routes - to be implemented in future phase
router.get('/', async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Files API - Coming soon',
    data: [],
  });
});

export default router;
