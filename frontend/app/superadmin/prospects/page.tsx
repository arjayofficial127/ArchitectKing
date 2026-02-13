'use client';

import { useState, useMemo } from 'react';
import { useProspects } from '@/hooks/superadmin/useProspects';
import { ProspectCard } from '@/components/superadmin/prospects/ProspectCard';
import { ProspectModal } from '@/components/superadmin/prospects/ProspectModal';
import type { Prospect, CreateProspectInput, UpdateProspectInput } from '@/lib/api/superadmin';

type ViewMode = 'list' | 'swimlane';

export default function SuperAdminProspectsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [draggedProspect, setDraggedProspect] = useState<Prospect | null>(null);

  const filters = useMemo(() => ({
    status: selectedStatus || undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
  }), [selectedStatus, selectedTags]);

  const {
    prospects,
    loading,
    error,
    createProspect,
    updateProspect,
    deleteProspect,
    moveSwimlane,
  } = useProspects(filters);

  // Get unique tags from all prospects
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    prospects.forEach((p) => p.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [prospects]);

  // Get unique swimlanes
  const swimlanes = useMemo(() => {
    const laneSet = new Set<string>();
    prospects.forEach((p) => {
      if (p.swimlane) laneSet.add(p.swimlane);
    });
    return Array.from(laneSet).sort();
  }, [prospects]);

  // Filter prospects by tags (client-side, since API filters by status)
  const filteredProspects = useMemo(() => {
    if (selectedTags.length === 0) return prospects;
    return prospects.filter((p) =>
      selectedTags.every((tag) => p.tags.includes(tag))
    );
  }, [prospects, selectedTags]);

  // Group prospects by swimlane
  const prospectsBySwimlane = useMemo(() => {
    const grouped: Record<string, Prospect[]> = {};
    filteredProspects.forEach((p) => {
      const lane = p.swimlane || 'Unassigned';
      if (!grouped[lane]) grouped[lane] = [];
      grouped[lane].push(p);
    });
    return grouped;
  }, [filteredProspects]);

  const handleAddClick = () => {
    setSelectedProspect(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setIsModalOpen(true);
  };

  const handleSave = async (data: CreateProspectInput | UpdateProspectInput) => {
    if (selectedProspect) {
      await updateProspect(selectedProspect.id, data as UpdateProspectInput);
    } else {
      await createProspect(data as CreateProspectInput);
    }
    setIsModalOpen(false);
    setSelectedProspect(null);
  };

  const handleDelete = async (id: string) => {
    await deleteProspect(id);
  };

  const handleDragStart = (e: React.DragEvent, prospect: Prospect) => {
    setDraggedProspect(prospect);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedProspect(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetSwimlane: string) => {
    e.preventDefault();
    if (!draggedProspect) return;

    const newSwimlane = targetSwimlane === 'Unassigned' ? null : targetSwimlane;
    await moveSwimlane(draggedProspect.id, newSwimlane || '');
    setDraggedProspect(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prospects</h1>
          <p className="text-gray-600 mt-1">Manage prospects and pipeline</p>
        </div>

        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-md p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('swimlane')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'swimlane'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Swimlane
            </button>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="meeting">Meeting</option>
            <option value="proposal">Proposal</option>
            <option value="closed">Closed</option>
            <option value="lost">Lost</option>
            <option value="other">Other</option>
          </select>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <select
              multiple
              value={selectedTags}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
                setSelectedTags(values);
              }}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm min-w-[150px]"
              size={3}
            >
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            + Add Prospect
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 text-gray-600">Loading prospects...</div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredProspects.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg mb-2">No prospects yet</p>
          <p className="text-gray-400 text-sm mb-4">Add your first opportunity to get started</p>
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            Add Prospect
          </button>
        </div>
      )}

      {/* List View */}
      {!loading && !error && viewMode === 'list' && filteredProspects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProspects.map((prospect) => (
            <ProspectCard
              key={prospect.id}
              prospect={prospect}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Swimlane View */}
      {!loading && !error && viewMode === 'swimlane' && (
        <div className="overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {['Unassigned', ...swimlanes].map((lane) => (
              <div
                key={lane}
                className="flex-shrink-0 w-80"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, lane)}
              >
                <div className="bg-gray-100 rounded-lg p-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{lane}</h3>
                  <span className="text-xs text-gray-600">
                    {prospectsBySwimlane[lane]?.length || 0} prospects
                  </span>
                </div>
                <div className="space-y-3 min-h-[200px]">
                  {(prospectsBySwimlane[lane] || []).map((prospect) => (
                    <ProspectCard
                      key={prospect.id}
                      prospect={prospect}
                      onEdit={handleEditClick}
                      onDelete={handleDelete}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      draggable={true}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prospect Modal */}
      <ProspectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProspect(null);
        }}
        prospect={selectedProspect}
        onSave={handleSave}
      />
    </div>
  );
}
