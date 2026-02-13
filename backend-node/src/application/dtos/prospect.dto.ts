import { z } from 'zod';

export const CreateProspectDto = z.object({
  type: z.enum(['person', 'company']),
  name: z.string().min(1).max(255),
  targetBudget: z.number().positive().optional(),
  status: z.enum(['new', 'contacted', 'meeting', 'proposal', 'closed', 'lost', 'other']),
  swimlane: z.string().max(100).optional(),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
  websiteUrl: z.string().url().max(500).optional(),
  imageUrl: z.string().url().max(500).optional(),
});

export const UpdateProspectDto = z.object({
  type: z.enum(['person', 'company']).optional(),
  name: z.string().min(1).max(255).optional(),
  targetBudget: z.number().positive().optional().nullable(),
  status: z.enum(['new', 'contacted', 'meeting', 'proposal', 'closed', 'lost', 'other']).optional(),
  swimlane: z.string().max(100).optional().nullable(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional().nullable(),
  websiteUrl: z.string().url().max(500).optional().nullable(),
  imageUrl: z.string().url().max(500).optional().nullable(),
});

export const ProspectFilterDto = z.object({
  status: z.string().optional(),
  swimlane: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
