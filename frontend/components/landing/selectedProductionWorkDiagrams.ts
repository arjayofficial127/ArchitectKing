import { LayeredDiagramData } from '@/components/case-studies/diagram/types';

export type SelectedProductionProjectId =
  | 'airunote'
  | 'wtw-comrise'
  | 'coats-inventory'
  | 'denr-chainsaw'
  | 'kinetic-forms';

export const selectedProductionWorkDiagrams: Record<SelectedProductionProjectId, LayeredDiagramData> = {
  airunote: {
    schemaVersion: 1,
    title: 'Knowledge Capture Topology',
    layout: 'layered',
    preset: 'architecture',
    theme: {
      backgroundColor: '#FCFCFD',
      titleColor: '#111827',
      labelColor: '#64748B',
      textColor: '#334155',
      flowColor: '#94A3B8',
      boundaryFill: '#F8FAFC',
      boundaryStroke: '#CBD5E1',
      accentColor: '#14B8A6',
    },
    layers: [
      { id: 'input', nodes: [{ id: 'capture', label: 'Capture\nChannels', type: 'card', subLabels: ['TXT', 'MD', 'RTF'], emphasis: 'accent', fillColor: '#ECFEFF', strokeColor: '#14B8A6' }] },
      { id: 'core', label: 'Privacy Core', boundary: true, highlight: true, accentColor: '#14B8A6', nodes: [{ id: 'folder', label: 'Folder\nHierarchy', type: 'card' }, { id: 'metadata', label: 'Metadata\nEngine', type: 'card' }] },
      { id: 'output', nodes: [{ id: 'ai', label: 'AI Assist\nServices', type: 'card', emphasis: 'glow', fillColor: '#F0FDFA', strokeColor: '#2DD4BF' }] },
    ],
    edges: [
      { from: 'capture', to: 'folder', color: '#14B8A6', emphasis: true, animated: true },
      { from: 'folder', to: 'metadata' },
      { from: 'metadata', to: 'ai', color: '#14B8A6', emphasis: true, dashed: true },
    ],
  },
  'wtw-comrise': {
    schemaVersion: 1,
    title: 'Operational Intelligence Surface',
    layout: 'layered',
    preset: 'flow',
    theme: {
      backgroundColor: '#FCFCFF',
      titleColor: '#0F172A',
      labelColor: '#64748B',
      textColor: '#334155',
      flowColor: '#94A3B8',
      boundaryFill: '#F8FAFC',
      boundaryStroke: '#CBD5E1',
      accentColor: '#0284C7',
    },
    layers: [
      { id: 'sources', nodes: [{ id: 'systems', label: 'Enterprise\nSources', type: 'card', subLabels: ['Projects', 'HR', 'Time Logs'] }] },
      { id: 'processing', label: 'Metrics Processing', boundary: true, highlight: true, accentColor: '#0284C7', nodes: [{ id: 'compute', label: 'Compute\nPipelines', type: 'card', emphasis: 'accent', fillColor: '#F0F9FF', strokeColor: '#38BDF8' }, { id: 'rbac', label: 'Role\nFilter', type: 'card' }] },
      { id: 'surface', nodes: [{ id: 'dash', label: 'Live\nDashboards', type: 'card' }, { id: 'reports', label: 'Report\nExports', type: 'card' }] },
    ],
    edges: [
      { from: 'systems', to: 'compute', color: '#0284C7', emphasis: true, animated: true },
      { from: 'compute', to: 'rbac' },
      { from: 'rbac', to: 'dash', color: '#0284C7', dashed: true },
      { from: 'rbac', to: 'reports' },
    ],
  },
  'coats-inventory': {
    schemaVersion: 1,
    title: 'Inventory Control Grid',
    layout: 'layered',
    preset: 'infrastructure',
    theme: {
      backgroundColor: '#FCFCFD',
      titleColor: '#111827',
      labelColor: '#64748B',
      textColor: '#334155',
      flowColor: '#94A3B8',
      boundaryFill: '#F8FAFC',
      boundaryStroke: '#CBD5E1',
      accentColor: '#F97316',
    },
    layers: [
      { id: 'floor', nodes: [{ id: 'warehouse', label: 'Warehouse\nOps', type: 'card' }, { id: 'supervisor', label: 'Supervisor\nView', type: 'card' }] },
      { id: 'app', label: 'Real-Time Inventory Stack', boundary: true, highlight: true, accentColor: '#F97316', nodes: [{ id: 'tracker', label: 'Stock\nTracker', type: 'card', emphasis: 'pulse', fillColor: '#FFF7ED', strokeColor: '#FB923C' }, { id: 'search', label: 'Search +\nFilters', type: 'card' }, { id: 'alerts', label: 'Reorder\nSignals', type: 'card' }] },
      { id: 'data', nodes: [{ id: 'db', label: 'Inventory\nDatabase', type: 'card', subLabels: ['SKU', 'Movements', 'Audit'] }] },
    ],
    edges: [
      { from: 'warehouse', to: 'tracker' },
      { from: 'supervisor', to: 'search' },
      { from: 'tracker', to: 'alerts', color: '#F97316', emphasis: true, animated: true },
      { from: 'tracker', to: 'db' },
      { from: 'search', to: 'db', dashed: true },
    ],
  },
  'denr-chainsaw': {
    schemaVersion: 1,
    title: 'Compliance Workflow Fabric',
    layout: 'layered',
    preset: 'flow',
    theme: {
      backgroundColor: '#FDFCFB',
      titleColor: '#111827',
      labelColor: '#64748B',
      textColor: '#334155',
      flowColor: '#94A3B8',
      boundaryFill: '#FAFAF9',
      boundaryStroke: '#D6D3D1',
      accentColor: '#DC2626',
    },
    layers: [
      { id: 'citizen', nodes: [{ id: 'portal', label: 'Citizen\nPortal', type: 'card', subLabels: ['Registration', 'Uploads'] }] },
      { id: 'gov-core', label: 'Verification + Permits', boundary: true, highlight: true, accentColor: '#DC2626', nodes: [{ id: 'validate', label: 'Validation\nEngine', type: 'card', emphasis: 'accent', fillColor: '#FEF2F2', strokeColor: '#F87171' }, { id: 'workflow', label: 'Permit\nWorkflow', type: 'card' }, { id: 'notify', label: 'Status\nNotifier', type: 'card' }] },
      { id: 'records', nodes: [{ id: 'archive', label: 'Secure\nRecords', type: 'card' }] },
    ],
    edges: [
      { from: 'portal', to: 'validate', color: '#DC2626', emphasis: true, animated: true },
      { from: 'validate', to: 'workflow', color: '#EF4444', dashed: true },
      { from: 'workflow', to: 'notify' },
      { from: 'workflow', to: 'archive' },
    ],
  },
  'kinetic-forms': {
    schemaVersion: 1,
    title: 'Dynamic Form Runtime',
    layout: 'layered',
    preset: 'architecture',
    theme: {
      backgroundColor: '#FCFCFF',
      titleColor: '#111827',
      labelColor: '#64748B',
      textColor: '#334155',
      flowColor: '#94A3B8',
      boundaryFill: '#F8FAFC',
      boundaryStroke: '#CBD5E1',
      accentColor: '#7C3AED',
    },
    layers: [
      { id: 'builder', nodes: [{ id: 'designer', label: 'Form\nDesigner', type: 'card', subLabels: ['Non-Technical', 'Config-Driven'] }] },
      { id: 'runtime', label: 'Logic Runtime', boundary: true, highlight: true, accentColor: '#7C3AED', nodes: [{ id: 'renderer', label: 'Conditional\nRenderer', type: 'card', fillColor: '#F5F3FF', strokeColor: '#A78BFA' }, { id: 'rules', label: 'Validation\nRules', type: 'card', emphasis: 'glow', fillColor: '#EDE9FE', strokeColor: '#8B5CF6' }, { id: 'state', label: 'State\nOrchestrator', type: 'card' }] },
      { id: 'integration', nodes: [{ id: 'api', label: 'Secure API\nBridge', type: 'card', subLabels: ['Auth', 'Encryption'] }] },
    ],
    edges: [
      { from: 'designer', to: 'renderer' },
      { from: 'renderer', to: 'rules', color: '#7C3AED', emphasis: true, animated: true },
      { from: 'rules', to: 'state' },
      { from: 'state', to: 'api', dashed: true },
    ],
  },
};
