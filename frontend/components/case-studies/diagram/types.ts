// ============================================================================
// TYPE DEFINITIONS - Architecture Visualization Platform
// ============================================================================

export type DiagramMode = 'light' | 'dark';
export type DiagramPreset = 'architecture' | 'flow' | 'infrastructure';
export type NodeType = 'card' | 'soft';
export type DiagramNodeEmphasis = 'none' | 'accent' | 'glow' | 'pulse';

export interface DiagramTheme {
  backgroundColor?: string;
  titleColor?: string;
  labelColor?: string;
  boxTitleColor?: string;
  textColor?: string;
  flowColor?: string;
  boundaryFill?: string;
  boundaryStroke?: string;
  boundaryLabelColor?: string;
  accentColor?: string;
}

export interface DiagramAnimation {
  enabled?: boolean;
  edgeFlow?: boolean;
  pulseHighlights?: boolean;
  edgeFlowDurationMs?: number;
  pulseDurationMs?: number;
}

export interface SemanticNode {
  id: string;
  label: string;
  subLabels?: string[];
  type?: NodeType;
  expandable?: boolean;
  details?: string[];
  fillColor?: string;
  strokeColor?: string;
  textColor?: string;
  accentColor?: string;
  emphasis?: DiagramNodeEmphasis;
}

export interface Layer {
  id: string;
  label?: string;
  boundary?: boolean;
  boundaryFill?: string;
  boundaryStroke?: string;
  boundaryLabelColor?: string;
  highlight?: boolean;
  accentColor?: string;
  nodes: SemanticNode[];
}

export interface Edge {
  from: string;
  to: string;
  color?: string;
  width?: number;
  dashed?: boolean;
  animated?: boolean;
  emphasis?: boolean;
}

export interface LayeredDiagramData {
  schemaVersion?: number;
  title?: string;
  layout: 'layered' | 'manual';
  preset?: DiagramPreset;
  theme?: DiagramTheme;
  animation?: DiagramAnimation;
  width?: number;
  height?: number;
  layers: Layer[];
  edges: Edge[];
}

// Legacy manual positioning (for backward compatibility)
export interface ManualNode {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  label: string;
  type?: 'card' | 'soft' | 'coreBoundary';
  subLabels?: string[];
  rx?: number;
}

export interface ManualEdge {
  from: string;
  to: string;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

export interface ManualDiagramData {
  nodes: ManualNode[];
  edges: ManualEdge[];
  title?: string;
  width?: number;
  height?: number;
  viewBox?: string;
}

export type DiagramData = LayeredDiagramData | ManualDiagramData;

export interface DiagramCreatorProps {
  data: DiagramData;
  className?: string;
  mode?: DiagramMode;
  showExportButtons?: boolean;
  onExportSVG?: (svgString: string) => void;
  onExportPNG?: (dataUrl: string) => void;
}

// ============================================================================
// CALCULATED LAYOUT TYPES
// ============================================================================

export interface CalculatedNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  subLabels: string[];
  details: string[];
  type: NodeType;
  expandable: boolean;
  expanded: boolean;
}

export interface CalculatedLayer {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  boundary?: boolean;
  nodes: CalculatedNode[];
}

export interface CalculatedLayout {
  layers: CalculatedLayer[];
  nodeMap: Map<string, CalculatedNode>;
  totalWidth: number;
  totalHeight: number;
}

// ============================================================================
// EDGE ROUTING TYPES
// ============================================================================

export interface EdgePath {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3?: number; // For L-shaped paths
  y3?: number;
}

export interface EdgeRoutingContext {
  fromNode: CalculatedNode;
  toNode: CalculatedNode;
  fromLayer: CalculatedLayer;
  toLayer: CalculatedLayer;
  layers: CalculatedLayer[];
}
