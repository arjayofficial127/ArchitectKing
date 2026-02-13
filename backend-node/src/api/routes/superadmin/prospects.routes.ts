import { Router, Request, Response } from 'express';
import { container } from '../../../core/di/container';
import { TYPES } from '../../../core/di/types';
import { ProspectService } from '../../../infrastructure/services/superadmin/prospect.service';
import { CreateProspectDto, UpdateProspectDto, ProspectFilterDto } from '../../../application/dtos/prospect.dto';
import { authMiddleware } from '../../middleware/authMiddleware';
import { requireSuperAdmin } from '../../middleware/requireSuperAdmin';
import { ValidationError } from '../../../core/errors/AppError';

const router: ReturnType<typeof Router> = Router();

// All routes require authentication and SuperAdmin
router.use(authMiddleware);
router.use(requireSuperAdmin);

// GET /api/superadmin/prospects
router.get('/', async (req: Request, res: Response, next) => {
  try {
    const filterResult = ProspectFilterDto.safeParse(req.query);
    const filter = filterResult.success ? filterResult.data : undefined;

    const prospectService = container.resolve<ProspectService>(TYPES.IProspectService);
    const prospects = await prospectService.getProspects(filter);

    res.json({
      success: true,
      data: prospects,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/superadmin/prospects
router.post('/', async (req: Request, res: Response, next) => {
  try {
    const bodyResult = CreateProspectDto.safeParse(req.body);

    if (!bodyResult.success) {
      return next(new ValidationError('Invalid request body', bodyResult.error.flatten().fieldErrors));
    }

    const prospectService = container.resolve<ProspectService>(TYPES.IProspectService);
    const prospect = await prospectService.createProspect(bodyResult.data);

    res.status(201).json({
      success: true,
      data: prospect,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/superadmin/prospects/:id
router.patch('/:id', async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const bodyResult = UpdateProspectDto.safeParse(req.body);

    if (!bodyResult.success) {
      return next(new ValidationError('Invalid request body', bodyResult.error.flatten().fieldErrors));
    }

    const prospectService = container.resolve<ProspectService>(TYPES.IProspectService);
    // Convert null to undefined for optional fields to match UpdateProspectInput type
    const updateData: any = { ...bodyResult.data };
    if (updateData.targetBudget === null) {
      updateData.targetBudget = undefined;
    }
    const prospect = await prospectService.updateProspect(id, updateData);

    res.json({
      success: true,
      data: prospect,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/superadmin/prospects/:id
router.delete('/:id', async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;

    const prospectService = container.resolve<ProspectService>(TYPES.IProspectService);
    await prospectService.deleteProspect(id);

    res.json({
      success: true,
      message: 'Prospect deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/superadmin/prospects/:id/swimlane
router.patch('/:id/swimlane', async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const { swimlane } = req.body;

    if (typeof swimlane !== 'string') {
      return next(new ValidationError('Invalid request body', { swimlane: ['Swimlane must be a string'] }));
    }

    const prospectService = container.resolve<ProspectService>(TYPES.IProspectService);
    const prospect = await prospectService.moveSwimlane(id, swimlane);

    res.json({
      success: true,
      data: prospect,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/superadmin/prospects/:id/tags
router.post('/:id/tags', async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const { tag } = req.body;

    if (typeof tag !== 'string') {
      return next(new ValidationError('Invalid request body', { tag: ['Tag must be a string'] }));
    }

    const prospectService = container.resolve<ProspectService>(TYPES.IProspectService);
    const prospect = await prospectService.addTag(id, tag);

    res.json({
      success: true,
      data: prospect,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/superadmin/prospects/:id/tags/:tag
router.delete('/:id/tags/:tag', async (req: Request, res: Response, next) => {
  try {
    const { id, tag } = req.params;

    const prospectService = container.resolve<ProspectService>(TYPES.IProspectService);
    const prospect = await prospectService.removeTag(id, tag);

    res.json({
      success: true,
      data: prospect,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/superadmin/prospects/:id/meetings
router.post('/:id/meetings', async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const { calendarEventId } = req.body;

    if (typeof calendarEventId !== 'string') {
      return next(new ValidationError('Invalid request body', { calendarEventId: ['Calendar event ID must be a string'] }));
    }

    const prospectService = container.resolve<ProspectService>(TYPES.IProspectService);
    const meeting = await prospectService.linkMeeting(id, calendarEventId);

    res.status(201).json({
      success: true,
      data: meeting,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
