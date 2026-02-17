// ============================================================================
// NODE HEIGHT CALCULATION
// ============================================================================

import { SemanticNode, CalculatedNode } from './types';
import { LAYOUT_CONSTANTS } from './constants';

export function calculateNodeHeight(
  node: SemanticNode,
  expanded: boolean = false
): number {
  const labelLines = node.label.split('\n').length;
  const labelHeight = labelLines * LAYOUT_CONSTANTS.NODE_LABEL_HEIGHT;
  const subLabelHeight = (node.subLabels?.length || 0) * LAYOUT_CONSTANTS.NODE_SUBLABEL_HEIGHT;
  const detailHeight = expanded && node.details
    ? node.details.length * LAYOUT_CONSTANTS.NODE_DETAIL_HEIGHT
    : 0;
  const padding = LAYOUT_CONSTANTS.NODE_PADDING * 2;
  
  return Math.max(
    LAYOUT_CONSTANTS.NODE_MIN_HEIGHT,
    labelHeight + subLabelHeight + detailHeight + padding
  );
}

export function createCalculatedNode(
  node: SemanticNode,
  x: number,
  y: number,
  expanded: boolean = false
): CalculatedNode {
  const height = calculateNodeHeight(node, expanded);
  
  return {
    id: node.id,
    x,
    y,
    width: LAYOUT_CONSTANTS.NODE_WIDTH,
    height,
    label: node.label,
    subLabels: node.subLabels || [],
    details: node.details || [],
    type: node.type || 'card',
    expandable: node.expandable || false,
    expanded,
    fillColor: node.fillColor,
    strokeColor: node.strokeColor,
    textColor: node.textColor,
    accentColor: node.accentColor,
    emphasis: node.emphasis,
  };
}
