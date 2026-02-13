'use client';

import { useState, useEffect } from 'react';
import { superadminApi, type Folder, type SuperAdminFile } from '@/lib/api/superadmin';
import { FolderTree } from '@/components/superadmin/files/FolderTree';
import { FileEditor } from '@/components/superadmin/files/FileEditor';
import { CreateItemModal } from '@/components/superadmin/files/CreateItemModal';

export default function SuperAdminFilesPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<SuperAdminFile[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<SuperAdminFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModalType, setCreateModalType] = useState<'folder' | 'file'>('folder');

  useEffect(() => {
    fetchFolders();
    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolderId]);

  useEffect(() => {
    if (selectedFileId) {
      fetchFile(selectedFileId);
    } else {
      setSelectedFile(null);
    }
  }, [selectedFileId]);

  const fetchFolders = async () => {
    try {
      const data = await superadminApi.getFolders();
      setFolders(data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load folders');
    } finally {
      setLoading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      const data = await superadminApi.getFiles(selectedFolderId);
      setFiles(data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load files');
    }
  };

  const fetchFile = async (id: string) => {
    try {
      const file = await superadminApi.getFile(id);
      setSelectedFile(file);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load file');
    }
  };

  const handleCreateFolder = async (name: string) => {
    await superadminApi.createFolder({ name, parentFolderId: selectedFolderId });
    await fetchFolders();
  };

  const handleCreateFile = async (name: string, fileType: 'txt' | 'md' | 'rtf') => {
    const file = await superadminApi.createFile({
      name,
      fileType,
      folderId: selectedFolderId,
      content: '',
    });
    setSelectedFileId(file.id);
    await fetchFiles();
  };

  const handleRenameFolder = async (id: string, newName: string) => {
    await superadminApi.updateFolder(id, { name: newName });
    await fetchFolders();
  };

  const handleDeleteFolder = async (id: string) => {
    await superadminApi.deleteFolder(id);
    if (selectedFolderId === id) {
      setSelectedFolderId(null);
    }
    await fetchFolders();
    await fetchFiles();
  };

  const handleSaveFile = async (id: string, content: string) => {
    await superadminApi.updateFile(id, { content });
    await fetchFile(id);
  };

  const handleDeleteFile = async (id: string) => {
    await superadminApi.deleteFile(id);
    if (selectedFileId === id) {
      setSelectedFileId(null);
      setSelectedFile(null);
    }
    await fetchFiles();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Vault</h1>
        <p className="text-gray-600 mt-1">Manage your files and folders</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left Panel */}
        <div className="w-64 border border-gray-200 rounded-lg bg-white flex flex-col">
          <div className="p-3 border-b border-gray-200 flex gap-2">
            <button
              onClick={() => {
                setCreateModalType('folder');
                setCreateModalOpen(true);
              }}
              className="flex-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              + Folder
            </button>
            <button
              onClick={() => {
                setCreateModalType('file');
                setCreateModalOpen(true);
              }}
              className="flex-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              + File
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <FolderTree
              folders={folders}
              selectedFolderId={selectedFolderId}
              onSelectFolder={setSelectedFolderId}
              onRenameFolder={handleRenameFolder}
              onDeleteFolder={handleDeleteFolder}
            />
          </div>
          <div className="p-2 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Files in selected folder:</div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {files.map((file) => (
                <div
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`px-2 py-1 rounded text-sm cursor-pointer hover:bg-gray-100 ${
                    selectedFileId === file.id ? 'bg-blue-100' : ''
                  }`}
                >
                  {file.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 border border-gray-200 rounded-lg bg-white overflow-hidden">
          <FileEditor
            file={selectedFile}
            onSave={handleSaveFile}
            onDelete={handleDeleteFile}
          />
        </div>
      </div>

      {/* Create Modal */}
      <CreateItemModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        type={createModalType}
        onCreateFolder={handleCreateFolder}
        onCreateFile={handleCreateFile}
      />
    </div>
  );
}
