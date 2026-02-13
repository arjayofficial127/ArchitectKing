'use client';

import { useState, useEffect } from 'react';
import { superadminApi, type Prospect, type CreateProspectInput, type UpdateProspectInput } from '@/lib/api/superadmin';

export function useProspects(filters?: { status?: string; swimlane?: string; tags?: string[] }) {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProspects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await superadminApi.getProspects(filters);
      setProspects(data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to fetch prospects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProspects();
  }, [filters?.status, filters?.swimlane, filters?.tags?.join(',')]);

  const createProspect = async (input: CreateProspectInput) => {
    try {
      const newProspect = await superadminApi.createProspect(input);
      setProspects((prev) => [...prev, newProspect]);
      return newProspect;
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to create prospect');
    }
  };

  const updateProspect = async (id: string, input: UpdateProspectInput) => {
    try {
      const updatedProspect = await superadminApi.updateProspect(id, input);
      setProspects((prev) => prev.map((p) => (p.id === id ? updatedProspect : p)));
      return updatedProspect;
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to update prospect');
    }
  };

  const deleteProspect = async (id: string) => {
    try {
      await superadminApi.deleteProspect(id);
      setProspects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to delete prospect');
    }
  };

  const moveSwimlane = async (id: string, swimlane: string) => {
    try {
      const updated = await superadminApi.moveSwimlane(id, swimlane);
      setProspects((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to move swimlane');
    }
  };

  const addTag = async (id: string, tag: string) => {
    try {
      const updated = await superadminApi.addTag(id, tag);
      setProspects((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to add tag');
    }
  };

  const removeTag = async (id: string, tag: string) => {
    try {
      await superadminApi.removeTag(id, tag);
      setProspects((prev) => prev.map((p) => (p.id === id ? { ...p, tags: p.tags.filter((t) => t !== tag) } : p)));
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to remove tag');
    }
  };

  return {
    prospects,
    loading,
    error,
    fetchProspects,
    createProspect,
    updateProspect,
    deleteProspect,
    moveSwimlane,
    addTag,
    removeTag,
  };
}
