// ============================================================================
// STYLING UTILITIES
// ============================================================================

import { DiagramMode, NodeType, ManualNode, DiagramTheme } from './types';

export interface NodeStyle {
  fill: string;
  stroke: string;
  strokeWidth: number;
  rx: number;
  width?: number;
  height?: number;
}

export interface BoundaryStyle {
  fill: string;
  stroke: string;
  strokeWidth: number;
  rx: number;
}

export interface TextStyles {
  title: string;
  label: string;
  boxTitle: string;
  text: string;
  flow: string;
}

export function getNodeStyle(
  nodeTypeOrNode: NodeType | ManualNode,
  mode: DiagramMode = 'light',
  overrides?: {
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    rx?: number;
  }
): NodeStyle {
  const isDark = mode === 'dark';
  const isManualNode = typeof nodeTypeOrNode === 'object' && 'x' in nodeTypeOrNode;
  const nodeType = isManualNode ? (nodeTypeOrNode.type || 'card') : nodeTypeOrNode;
  
  const baseStyle = nodeType === 'soft'
    ? {
        fill: isDark ? '#111827' : '#f9fafb',
        stroke: isDark ? '#4b5563' : '#e5e7eb',
        strokeWidth: 1.2,
        rx: 14,
      }
    : {
        fill: isDark ? '#1f2937' : '#ffffff',
        stroke: isDark ? '#374151' : '#e5e7eb',
        strokeWidth: 1.2,
        rx: 14,
      };
  
  if (isManualNode) {
    return {
      ...baseStyle,
      ...overrides,
      width: nodeTypeOrNode.width,
      height: nodeTypeOrNode.height,
      rx: overrides?.rx || nodeTypeOrNode.rx || baseStyle.rx,
    };
  }

  return {
    ...baseStyle,
    ...overrides,
  };
}

export function getBoundaryStyle(
  mode: DiagramMode = 'light',
  overrides?: {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    rx?: number;
  }
): BoundaryStyle {
  const isDark = mode === 'dark';
  
  return {
    fill: overrides?.fill ?? (isDark ? '#111827' : '#f9fafb'),
    stroke: overrides?.stroke ?? (isDark ? '#4b5563' : '#d1d5db'),
    strokeWidth: overrides?.strokeWidth ?? 1.5,
    rx: overrides?.rx ?? 18,
  };
}

export function getTextStyles(mode: DiagramMode = 'light', theme?: DiagramTheme): TextStyles {
  const isDark = mode === 'dark';
  
  return {
    title: theme?.titleColor ?? (isDark ? '#f9fafb' : '#111827'),
    label: theme?.labelColor ?? (isDark ? '#9ca3af' : '#6b7280'),
    boxTitle: theme?.boxTitleColor ?? (isDark ? '#f9fafb' : '#111827'),
    text: theme?.textColor ?? (isDark ? '#d1d5db' : '#374151'),
    flow: theme?.flowColor ?? (isDark ? '#6b7280' : '#9ca3af'),
  };
}

export function getBackgroundColor(mode: DiagramMode = 'light'): string {
  return mode === 'dark' ? 'bg-slate-900' : 'bg-white';
}
