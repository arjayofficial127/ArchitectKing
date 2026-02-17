// ============================================================================
// LAYER POSITION CALCULATION
// ============================================================================

import { LayeredDiagramData, CalculatedLayer, CalculatedNode, CalculatedLayout } from './types';
import { getPresetConstants } from './constants';
import { createCalculatedNode } from './calculateNodeHeights';

export function calculateLayeredLayout(
  data: LayeredDiagramData,
  expandedNodes: Set<string> = new Set()
): CalculatedLayout {
  const constants = getPresetConstants(data.preset);
  const layers: CalculatedLayer[] = [];
  const nodeMap = new Map<string, CalculatedNode>();
  
  let currentX = constants.LEFT_MARGIN;
  let maxHeight = 0;

  data.layers.forEach((layer) => {
    // Calculate node positions within layer
    // Start nodes below title space (title is at TOP_MARGIN - 20, so nodes start at TOP_MARGIN + 60)
    let currentY = constants.TOP_MARGIN + 60;
    const calculatedNodes: CalculatedNode[] = [];

    layer.nodes.forEach((node) => {
      const expanded = expandedNodes.has(node.id);
      const calculatedNode = createCalculatedNode(node, currentX, currentY, expanded);
      
      calculatedNodes.push(calculatedNode);
      nodeMap.set(node.id, calculatedNode);
      
      currentY += calculatedNode.height + constants.NODE_GAP;
    });

    // Calculate layer dimensions
    const layerHeight = currentY - constants.NODE_GAP - (constants.TOP_MARGIN + 60);
    const layerWidth = constants.NODE_WIDTH;
    
    maxHeight = Math.max(maxHeight, layerHeight);

    // If boundary, add padding
    const boundaryPadding = layer.boundary ? constants.BOUNDARY_PADDING : 0;
    const layerX = currentX - (layer.boundary ? boundaryPadding : 0);
    const layerY = constants.TOP_MARGIN + 60 - (layer.boundary ? boundaryPadding : 0);
    const layerWidthWithBoundary = layerWidth + (layer.boundary ? boundaryPadding * 2 : 0);
    const layerHeightWithBoundary = layerHeight + (layer.boundary ? boundaryPadding * 2 : 0);

    // Adjust node positions if boundary exists
    if (layer.boundary) {
      calculatedNodes.forEach(node => {
        node.x += boundaryPadding;
        node.y += boundaryPadding;
      });
    }

    layers.push({
      id: layer.id,
      x: layerX,
      y: layerY,
      width: layerWidthWithBoundary,
      height: layerHeightWithBoundary,
      label: layer.label,
      boundary: layer.boundary,
      boundaryFill: layer.boundaryFill,
      boundaryStroke: layer.boundaryStroke,
      boundaryLabelColor: layer.boundaryLabelColor,
      highlight: layer.highlight,
      accentColor: layer.accentColor,
      nodes: calculatedNodes,
    });

    // Move to next layer position
    currentX += layerWidthWithBoundary + constants.LAYER_GAP;
  });

  const totalWidth = currentX - constants.LAYER_GAP + constants.LEFT_MARGIN;
  // Add extra space at top for title (title is at TOP_MARGIN - 20, so we need at least 60px)
  const titleSpace = 60;
  const totalHeight = maxHeight + constants.TOP_MARGIN + titleSpace + 
    (data.layers.some(l => l.boundary) ? constants.BOUNDARY_PADDING * 2 : 0);

  return { layers, nodeMap, totalWidth, totalHeight };
}
