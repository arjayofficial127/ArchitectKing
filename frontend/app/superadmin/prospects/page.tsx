'use client';

import { useProspects } from '@/hooks/superadmin/useProspects';

export default function SuperAdminProspectsPage() {
  const { prospects, loading, error } = useProspects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prospects</h1>
          <p className="text-gray-600 mt-1">Manage prospects and pipeline</p>
        </div>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          disabled
        >
          Add Prospect
        </button>
      </div>

      {loading && (
        <div className="text-gray-600">Loading prospects...</div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {!loading && !error && prospects.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-500 text-sm">No prospects found</p>
        </div>
      )}

      {!loading && !error && prospects.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-3">
            {prospects.map((prospect) => (
              <div key={prospect.id} className="border border-gray-200 rounded p-4">
                <pre className="text-xs overflow-auto">{JSON.stringify(prospect, null, 2)}</pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
