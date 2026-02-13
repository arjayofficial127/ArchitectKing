'use client';

import { useState, useEffect } from 'react';
import type { SuperAdminFile } from '@/lib/api/superadmin';

interface FileEditorProps {
  file: SuperAdminFile | null;
  onSave: (id: string, content: string) => Promise<void>;
  onDelete: (id: string) => void;
}

export function FileEditor({ file, onSave, onDelete }: FileEditorProps) {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [markdownPreview, setMarkdownPreview] = useState('');

  useEffect(() => {
    if (file) {
      setContent(file.content);
      setSaved(false);
      if (file.fileType === 'md') {
        // Simple markdown preview (basic implementation)
        setMarkdownPreview(file.content);
      }
    } else {
      setContent('');
      setMarkdownPreview('');
    }
  }, [file]);

  const handleSave = async () => {
    if (!file) return;
    setSaving(true);
    try {
      await onSave(file.id, content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      alert('Failed to save file');
    } finally {
      setSaving(false);
    }
  };

  if (!file) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-lg mb-2">No file selected</p>
          <p className="text-sm">Select a file from the tree or create a new one</p>
        </div>
      </div>
    );
  }

  if (file.fileType === 'rtf') {
    return (
      <div className="h-full flex flex-col">
        <div className="border-b border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{file.name}</h2>
              <p className="text-sm text-gray-500">RTF File (View Only)</p>
            </div>
            <button
              onClick={() => {
                if (confirm(`Delete file "${file.name}"?`)) {
                  onDelete(file.id);
                }
              }}
              className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Delete
            </button>
          </div>
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
            RTF is view-only in v1
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm">{file.content}</pre>
        </div>
      </div>
    );
  }

  if (file.fileType === 'md') {
    return (
      <div className="h-full flex flex-col">
        <div className="border-b border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{file.name}</h2>
              <p className="text-sm text-gray-500">Markdown File</p>
            </div>
            <div className="flex items-center gap-2">
              {saved && (
                <span className="text-sm text-green-600">Saved</span>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete file "${file.name}"?`)) {
                    onDelete(file.id);
                  }
                }}
                className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 border-r border-gray-200">
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setMarkdownPreview(e.target.value);
              }}
              className="w-full h-full p-4 border-0 resize-none focus:outline-none font-mono text-sm"
              placeholder="Enter markdown content..."
            />
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans">{markdownPreview}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // txt file
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{file.name}</h2>
            <p className="text-sm text-gray-500">Text File</p>
          </div>
          <div className="flex items-center gap-2">
            {saved && (
              <span className="text-sm text-green-600">Saved</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                if (confirm(`Delete file "${file.name}"?`)) {
                  onDelete(file.id);
                }
              }}
              className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full p-4 border-0 resize-none focus:outline-none font-mono text-sm"
          placeholder="Enter text content..."
        />
      </div>
    </div>
  );
}
