// ============================================================================
// EDGE ROUTING - Orthogonal (L-shaped) paths
// ============================================================================

import { EdgePath, EdgeRoutingContext, CalculatedNode, CalculatedLayer } from './types';
import { LAYOUT_CONSTANTS } from './constants';

/**
 * Determines which side of a node to connect from/to
 */
function getNodeConnectionPoint(
  node: CalculatedNode,
  side: 'left' | 'right' | 'top' | 'bottom'
): { x: number; y: number } {
  switch (side) {
    case 'left':
      return { x: node.x, y: node.y + node.height / 2 };
    case 'right':
      return { x: node.x + node.width, y: node.y + node.height / 2 };
    case 'top':
      return { x: node.x + node.width / 2, y: node.y };
    case 'bottom':
      return { x: node.x + node.width / 2, y: node.y + node.height };
    default:
      return { x: node.x + node.width / 2, y: node.y + node.height / 2 };
  }
}

/**
 * Determines the best side to connect from a source node
 */
function getSourceSide(fromNode: CalculatedNode, toNode: CalculatedNode): 'left' | 'right' | 'top' | 'bottom' {
  const fromCenterX = fromNode.x + fromNode.width / 2;
  const toCenterX = toNode.x + toNode.width / 2;
  const fromCenterY = fromNode.y + fromNode.height / 2;
  const toCenterY = toNode.y + toNode.height / 2;

  const deltaX = toCenterX - fromCenterX;
  const deltaY = toCenterY - fromCenterY;

  // If target is to the right, use right side
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? 'right' : 'left';
  } else {
    return deltaY > 0 ? 'bottom' : 'top';
  }
}

/**
 * Determines the best side to connect to a target node
 */
function getTargetSide(fromNode: CalculatedNode, toNode: CalculatedNode): 'left' | 'right' | 'top' | 'bottom' {
  const fromCenterX = fromNode.x + fromNode.width / 2;
  const toCenterX = toNode.x + toNode.width / 2;
  const fromCenterY = fromNode.y + fromNode.height / 2;
  const toCenterY = toNode.y + toNode.height / 2;

  const deltaX = toCenterX - fromCenterX;
  const deltaY = toCenterY - fromCenterY;

  // If source is to the left, use left side
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? 'left' : 'right';
  } else {
    return deltaY > 0 ? 'top' : 'bottom';
  }
}

/**
 * Routes an edge with an orthogonal (L-shaped) path
 */
export function routeEdge(context: EdgeRoutingContext): EdgePath {
  const { fromNode, toNode } = context;

  const sourceSide = getSourceSide(fromNode, toNode);
  const targetSide = getTargetSide(fromNode, toNode);

  const start = getNodeConnectionPoint(fromNode, sourceSide);
  const end = getNodeConnectionPoint(toNode, targetSide);

  // For horizontal connections (left/right), use L-shaped path
  if ((sourceSide === 'right' && targetSide === 'left') || 
      (sourceSide === 'left' && targetSide === 'right')) {
    // Horizontal connection - use middle Y
    const midY = (start.y + end.y) / 2;
    return {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
      x3: start.x + (end.x - start.x) / 2,
      y3: midY,
    };
  }

  // For vertical connections (top/bottom), use L-shaped path
  if ((sourceSide === 'bottom' && targetSide === 'top') ||
      (sourceSide === 'top' && targetSide === 'bottom')) {
    // Vertical connection - use middle X
    const midX = (start.x + end.x) / 2;
    return {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
      x3: midX,
      y3: start.y + (end.y - start.y) / 2,
    };
  }

  // For diagonal connections, use L-shaped with horizontal first
  if (sourceSide === 'right' || sourceSide === 'left') {
    const midX = (start.x + end.x) / 2;
    return {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
      x3: midX,
      y3: start.y,
    };
  } else {
    const midY = (start.y + end.y) / 2;
    return {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
      x3: start.x,
      y3: midY,
    };
  }
}
