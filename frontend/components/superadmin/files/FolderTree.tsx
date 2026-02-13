'use client';

import { useState } from 'react';
import type { Folder } from '@/lib/api/superadmin';

interface FolderTreeProps {
  folders: Folder[];
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
  onRenameFolder: (id: string, newName: string) => void;
  onDeleteFolder: (id: string) => void;
}

export function FolderTree({
  folders,
  selectedFolderId,
  onSelectFolder,
  onRenameFolder,
  onDeleteFolder,
}: FolderTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const toggleExpand = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleRenameStart = (folder: Folder) => {
    setRenamingId(folder.id);
    setRenameValue(folder.name);
  };

  const handleRenameSubmit = (id: string) => {
    if (renameValue.trim()) {
      onRenameFolder(id, renameValue.trim());
    }
    setRenamingId(null);
    setRenameValue('');
  };

  const handleRenameCancel = () => {
    setRenamingId(null);
    setRenameValue('');
  };

  const handleContextMenu = (e: React.MouseEvent, folder: Folder) => {
    e.preventDefault();
    handleRenameStart(folder);
  };

  const buildTree = (parentId: string | null): Folder[] => {
    return folders.filter((f) => f.parentFolderId === parentId);
  };

  const renderFolder = (folder: Folder, level: number = 0) => {
    const children = buildTree(folder.id);
    const isExpanded = expandedFolders.has(folder.id);
    const isSelected = selectedFolderId === folder.id;
    const isRenaming = renamingId === folder.id;

    return (
      <div key={folder.id}>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer ${
            isSelected ? 'bg-blue-100' : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => onSelectFolder(folder.id)}
          onContextMenu={(e) => handleContextMenu(e, folder)}
        >
          {children.length > 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(folder.id);
              }}
              className="w-4 h-4 flex items-center justify-center"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          ) : (
            <span className="w-4" />
          )}
          {isRenaming ? (
            <input
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={() => handleRenameSubmit(folder.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleRenameSubmit(folder.id);
                } else if (e.key === 'Escape') {
                  handleRenameCancel();
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 border border-blue-500 rounded px-1 text-sm"
              autoFocus
            />
          ) : (
            <span className="flex-1 text-sm">{folder.name}</span>
          )}
          {!isRenaming && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Delete folder "${folder.name}" and all its contents?`)) {
                  onDeleteFolder(folder.id);
                }
              }}
              className="text-red-500 hover:text-red-700 text-xs px-1"
            >
              ×
            </button>
          )}
        </div>
        {isExpanded && children.map((child) => renderFolder(child, level + 1))}
      </div>
    );
  };

  const rootFolders = buildTree(null);

  return (
    <div className="h-full overflow-y-auto">
      <div
        className={`px-2 py-1 rounded hover:bg-gray-100 cursor-pointer mb-1 ${
          selectedFolderId === null ? 'bg-blue-100' : ''
        }`}
        onClick={() => onSelectFolder(null)}
      >
        <span className="text-sm font-medium">Root</span>
      </div>
      {rootFolders.map((folder) => renderFolder(folder))}
    </div>
  );
}
