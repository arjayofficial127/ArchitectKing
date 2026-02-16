// ============================================================================
// LAYOUT CONSTANTS - Architecture Visualization Platform
// ============================================================================

import { DiagramPreset } from './types';

export const LAYOUT_CONSTANTS = {
  NODE_WIDTH: 240,
  NODE_PADDING: 20,
  NODE_MIN_HEIGHT: 70,
  NODE_LABEL_HEIGHT: 30,
  NODE_SUBLABEL_HEIGHT: 20,
  NODE_DETAIL_HEIGHT: 18,
  LAYER_GAP: 80,
  NODE_GAP: 30,
  BOUNDARY_PADDING: 40,
  TITLE_HEIGHT: 100,
  TOP_MARGIN: 80,
  LEFT_MARGIN: 80,
  EDGE_ROUTING_OFFSET: 20,
} as const;

// Preset-specific adjustments
export interface PresetConfig {
  NODE_WIDTH: number;
  LAYER_GAP: number;
  NODE_GAP: number;
}

export const PRESET_CONFIG: Record<DiagramPreset, PresetConfig> = {
  architecture: {
    NODE_WIDTH: 240,
    LAYER_GAP: 80,
    NODE_GAP: 30,
  },
  flow: {
    NODE_WIDTH: 220,
    LAYER_GAP: 100,
    NODE_GAP: 25,
  },
  infrastructure: {
    NODE_WIDTH: 260,
    LAYER_GAP: 70,
    NODE_GAP: 35,
  },
};

export function getPresetConstants(preset: DiagramPreset = 'architecture') {
  const config = PRESET_CONFIG[preset];
  return { ...LAYOUT_CONSTANTS, ...config };
}
