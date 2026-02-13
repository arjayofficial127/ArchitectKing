'use client';

import { useState, useEffect } from 'react';
import type { Prospect, CreateProspectInput, UpdateProspectInput } from '@/lib/api/superadmin';

interface ProspectModalProps {
  isOpen: boolean;
  onClose: () => void;
  prospect?: Prospect | null;
  onSave: (data: CreateProspectInput | UpdateProspectInput) => Promise<void>;
}

export function ProspectModal({ isOpen, onClose, prospect, onSave }: ProspectModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'person' | 'company'>('person');
  const [targetBudget, setTargetBudget] = useState('');
  const [status, setStatus] = useState<'new' | 'contacted' | 'meeting' | 'proposal' | 'closed' | 'lost' | 'other'>('new');
  const [swimlane, setSwimlane] = useState('');
  const [tags, setTags] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (prospect) {
      setName(prospect.name);
      setType(prospect.type);
      setTargetBudget(prospect.targetBudget?.toString() || '');
      setStatus(prospect.status);
      setSwimlane(prospect.swimlane || '');
      setTags(prospect.tags.join(', '));
      setWebsiteUrl(prospect.websiteUrl || '');
      setNotes(prospect.notes || '');
    } else {
      setName('');
      setType('person');
      setTargetBudget('');
      setStatus('new');
      setSwimlane('');
      setTags('');
      setWebsiteUrl('');
      setNotes('');
    }
  }, [prospect, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data: CreateProspectInput | UpdateProspectInput = {
        name,
        type,
        targetBudget: targetBudget ? parseFloat(targetBudget) : undefined,
        status,
        swimlane: swimlane || undefined,
        tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : undefined,
        websiteUrl: websiteUrl || undefined,
        notes: notes || undefined,
      };

      await onSave(data);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save prospect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {prospect ? 'Edit Prospect' : 'Add Prospect'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'person' | 'company')}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="person">Person</option>
                <option value="company">Company</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Budget</label>
              <input
                type="number"
                step="0.01"
                value={targetBudget}
                onChange={(e) => setTargetBudget(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="meeting">Meeting</option>
                <option value="proposal">Proposal</option>
                <option value="closed">Closed</option>
                <option value="lost">Lost</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Swimlane</label>
              <input
                type="text"
                value={swimlane}
                onChange={(e) => setSwimlane(e.target.value)}
                placeholder="e.g., Lead, Qualified, Proposal"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Comma separated (e.g., enterprise, urgent, follow-up)"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
