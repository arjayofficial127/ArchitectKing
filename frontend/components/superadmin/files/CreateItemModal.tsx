'use client';

import { useState } from 'react';

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'folder' | 'file';
  onCreateFolder: (name: string) => Promise<void>;
  onCreateFile: (name: string, fileType: 'txt' | 'md' | 'rtf') => Promise<void>;
}

export function CreateItemModal({
  isOpen,
  onClose,
  type,
  onCreateFolder,
  onCreateFile,
}: CreateItemModalProps) {
  const [name, setName] = useState('');
  const [fileType, setFileType] = useState<'txt' | 'md' | 'rtf'>('txt');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (type === 'folder') {
        await onCreateFolder(name.trim());
      } else {
        await onCreateFile(name.trim(), fileType);
      }
      setName('');
      setFileType('txt');
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Create {type === 'folder' ? 'Folder' : 'File'}
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
                placeholder={type === 'folder' ? 'Folder name' : 'File name'}
              />
            </div>

            {type === 'file' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value as 'txt' | 'md' | 'rtf')}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="txt">Text (.txt)</option>
                  <option value="md">Markdown (.md)</option>
                  <option value="rtf">RTF (.rtf)</option>
                </select>
              </div>
            )}

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
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
