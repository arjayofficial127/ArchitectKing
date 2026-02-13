import { injectable } from 'tsyringe';
import { IProspectRepository } from '../../../application/interfaces/IProspectRepository';
import { IProspectMeetingRepository } from '../../../application/interfaces/IProspectMeetingRepository';
import { Prospect } from '../../../domain/entities/Prospect';
import { ProspectMeeting } from '../../../domain/entities/ProspectMeeting';
import { NotFoundError, BadRequestError } from '../../../core/errors/AppError';

export interface CreateProspectInput {
  type: 'person' | 'company';
  name: string;
  targetBudget?: number;
  status: 'new' | 'contacted' | 'meeting' | 'proposal' | 'closed' | 'lost' | 'other';
  swimlane?: string;
  tags?: string[];
  notes?: string;
  websiteUrl?: string;
  imageUrl?: string;
}

export interface UpdateProspectInput {
  type?: 'person' | 'company';
  name?: string;
  targetBudget?: number;
  status?: 'new' | 'contacted' | 'meeting' | 'proposal' | 'closed' | 'lost' | 'other';
  swimlane?: string;
  tags?: string[];
  notes?: string;
  websiteUrl?: string;
  imageUrl?: string;
}

export interface ProspectFilter {
  status?: string;
  swimlane?: string;
  tags?: string[];
}

@injectable()
export class ProspectService {
  constructor(
    private prospectRepo: IProspectRepository,
    private prospectMeetingRepo: IProspectMeetingRepository
  ) {}

  async createProspect(input: CreateProspectInput): Promise<Prospect> {
    return this.prospectRepo.create({
      type: input.type,
      name: input.name,
      targetBudget: input.targetBudget || null,
      status: input.status,
      swimlane: input.swimlane || null,
      tags: input.tags || [],
      notes: input.notes || null,
      websiteUrl: input.websiteUrl || null,
      imageUrl: input.imageUrl || null,
    });
  }

  async updateProspect(prospectId: string, input: UpdateProspectInput): Promise<Prospect> {
    const existing = await this.prospectRepo.findById(prospectId);
    if (!existing) {
      throw new NotFoundError('Prospect', prospectId);
    }

    return this.prospectRepo.update(prospectId, input);
  }

  async deleteProspect(prospectId: string): Promise<void> {
    const existing = await this.prospectRepo.findById(prospectId);
    if (!existing) {
      throw new NotFoundError('Prospect', prospectId);
    }

    await this.prospectRepo.delete(prospectId);
  }

  async moveSwimlane(prospectId: string, newLane: string): Promise<Prospect> {
    const existing = await this.prospectRepo.findById(prospectId);
    if (!existing) {
      throw new NotFoundError('Prospect', prospectId);
    }

    // Replace existing swimlane (not append)
    return this.prospectRepo.update(prospectId, { swimlane: newLane });
  }

  async addTag(prospectId: string, tag: string): Promise<Prospect> {
    const existing = await this.prospectRepo.findById(prospectId);
    if (!existing) {
      throw new NotFoundError('Prospect', prospectId);
    }

    const tags = existing.tags.includes(tag) ? existing.tags : [...existing.tags, tag];
    return this.prospectRepo.update(prospectId, { tags });
  }

  async removeTag(prospectId: string, tag: string): Promise<Prospect> {
    const existing = await this.prospectRepo.findById(prospectId);
    if (!existing) {
      throw new NotFoundError('Prospect', prospectId);
    }

    const tags = existing.tags.filter((t) => t !== tag);
    return this.prospectRepo.update(prospectId, { tags });
  }

  async linkMeeting(prospectId: string, calendarEventId: string): Promise<ProspectMeeting> {
    const existing = await this.prospectRepo.findById(prospectId);
    if (!existing) {
      throw new NotFoundError('Prospect', prospectId);
    }

    // Check if link already exists
    const existingMeetings = await this.prospectMeetingRepo.findByProspectId(prospectId);
    const alreadyLinked = existingMeetings.some((m) => m.calendarEventId === calendarEventId);
    if (alreadyLinked) {
      throw new BadRequestError('Meeting is already linked to this prospect');
    }

    return this.prospectMeetingRepo.create({
      prospectId,
      calendarEventId,
    });
  }

  async getProspects(filter?: ProspectFilter): Promise<Prospect[]> {
    return this.prospectRepo.findAll(filter);
  }
}
