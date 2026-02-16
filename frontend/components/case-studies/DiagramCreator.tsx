'use client';

import { useMemo, useState, useRef, useCallback } from 'react';
import {
  DiagramData,
  DiagramCreatorProps,
  LayeredDiagramData,
  ManualDiagramData,
  CalculatedLayout,
  EdgeRoutingContext,
  EdgePath,
} from './diagram/types';
import { LAYOUT_CONSTANTS } from './diagram/constants';
import { calculateLayeredLayout } from './diagram/calculateLayerPositions';
import { routeEdge } from './diagram/routeEdges';
import { getNodeStyle, getBoundaryStyle, getTextStyles, getBackgroundColor } from './diagram/styles';
import { exportToSVG, exportToPNG, downloadFile, downloadPNG } from './diagram/export';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function DiagramCreator({
  data,
  className = '',
  mode = 'light',
  showExportButtons = false,
  onExportSVG,
  onExportPNG,
}: DiagramCreatorProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  
  const isLayered = 'layout' in data && data.layout !== 'manual';
  const layeredData = isLayered ? (data as LayeredDiagramData) : null;
  const modeValue = mode || 'light';
  
  const layout = useMemo(() => {
    if (isLayered) {
      return calculateLayeredLayout(data as LayeredDiagramData, expandedNodes);
    }
    return null;
  }, [data, isLayered, expandedNodes]);

  const { svgWidth, svgHeight, viewBox } = useMemo(() => {
    if (isLayered && layout) {
      const width = (data as LayeredDiagramData).width || layout.totalWidth;
      const height = (data as LayeredDiagramData).height || layout.totalHeight;
      return {
        svgWidth: width,
        svgHeight: height,
        viewBox: `0 0 ${width} ${height}`,
      };
    } else {
      const manualData = data as ManualDiagramData;
      const width = manualData.width || 1200;
      const height = manualData.height || 720;
      const vb = manualData.viewBox || `0 0 ${width} ${height}`;
      return { svgWidth: width, svgHeight: height, viewBox: vb };
    }
  }, [data, isLayered, layout]);

  const nodeMap = useMemo(() => {
    if (isLayered && layout) {
      return layout.nodeMap;
    }
    const map = new Map();
    (data as ManualDiagramData).nodes.forEach(node => {
      map.set(node.id, node);
    });
    return map;
  }, [data, isLayered, layout]);

  const title = 'title' in data ? data.title : undefined;
  const textStyles = getTextStyles(modeValue, layeredData?.theme);
  const edgeFlowDurationMs = layeredData?.animation?.edgeFlowDurationMs ?? 1800;
  const pulseDurationMs = layeredData?.animation?.pulseDurationMs ?? 2200;
  const enableEdgeAnimation = layeredData?.animation?.enabled && layeredData?.animation?.edgeFlow;
  const enablePulseHighlights = layeredData?.animation?.enabled && layeredData?.animation?.pulseHighlights;

  // Handle node expansion
  const handleNodeClick = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  // Export handlers
  const handleExportSVG = useCallback(() => {
    if (!svgRef.current) return;
    
    const svgString = exportToSVG(svgRef.current);
    
    if (onExportSVG) {
      onExportSVG(svgString);
    } else {
      downloadFile(svgString, 'diagram.svg', 'image/svg+xml');
    }
  }, [onExportSVG]);

  const handleExportPNG = useCallback(async () => {
    if (!svgRef.current) return;
    
    try {
      const dataUrl = await exportToPNG(svgRef.current);
      
      if (onExportPNG) {
        onExportPNG(dataUrl);
      } else {
        downloadPNG(dataUrl, 'diagram.png');
      }
    } catch (error) {
      console.error('Failed to export PNG:', error);
    }
  }, [onExportPNG]);

  // Render orthogonal edge path
  const renderEdgePath = (
    path: EdgePath,
    edgeStroke: string,
    edgeWidth: number,
    edgeDashed: boolean,
    edgeAnimated: boolean
  ) => {
    const strokeDasharray = edgeDashed || edgeAnimated ? '8 6' : undefined;

    if (path.x3 !== undefined && path.y3 !== undefined) {
      // L-shaped path
      return (
        <path
          d={`M ${path.x1} ${path.y1} L ${path.x3} ${path.y1} L ${path.x3} ${path.y2} L ${path.x2} ${path.y2}`}
          fill="none"
          stroke={edgeStroke}
          strokeWidth={edgeWidth}
          strokeDasharray={strokeDasharray}
          markerEnd="url(#arrow)"
        >
          {edgeAnimated && (
            <animate
              attributeName="stroke-dashoffset"
              from="14"
              to="0"
              dur={`${edgeFlowDurationMs}ms`}
              repeatCount="indefinite"
            />
          )}
        </path>
      );
    }
    // Straight path
    return (
      <line
        x1={path.x1}
        y1={path.y1}
        x2={path.x2}
        y2={path.y2}
        stroke={edgeStroke}
        strokeWidth={edgeWidth}
        strokeDasharray={strokeDasharray}
        markerEnd="url(#arrow)"
      >
        {edgeAnimated && (
          <animate
            attributeName="stroke-dashoffset"
            from="14"
            to="0"
            dur={`${edgeFlowDurationMs}ms`}
            repeatCount="indefinite"
          />
        )}
      </line>
    );
  };

  return (
    <div
      className={`w-full overflow-hidden rounded-lg ${getBackgroundColor(modeValue)} p-4 ${className}`}
      style={layeredData?.theme?.backgroundColor ? { backgroundColor: layeredData.theme.backgroundColor } : undefined}
    >
      {/* Export Buttons */}
      {showExportButtons && (
        <div className="mb-4 flex gap-2">
          <button
            onClick={handleExportSVG}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Export SVG
          </button>
          <button
            onClick={handleExportPNG}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Export PNG
          </button>
        </div>
      )}

      <svg
        ref={svgRef}
        width={svgWidth}
        height={svgHeight}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ maxWidth: '100%' }}
      >
        <defs>
          <style>
            {`.title { font: 600 28px Inter, sans-serif; fill: ${textStyles.title}; }
            .label { font: 500 14px Inter, sans-serif; fill: ${textStyles.label}; }
            .boxTitle { font: 600 16px Inter, sans-serif; fill: ${textStyles.boxTitle}; }
            .text { font: 500 14px Inter, sans-serif; fill: ${textStyles.text}; }
            .detail { font: 500 13px Inter, sans-serif; fill: ${textStyles.text}; opacity: 0.8; }
            @keyframes diagramPulse {
              0% { opacity: 1; }
              50% { opacity: 0.88; }
              100% { opacity: 1; }
            }`}
          </style>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L10,3 L0,6 Z" fill="context-stroke" />
          </marker>
          <filter id="diagram-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Title */}
        {title && (
          <text x={LAYOUT_CONSTANTS.LEFT_MARGIN} y={LAYOUT_CONSTANTS.TOP_MARGIN - 20} className="title">
            {title}
          </text>
        )}

        {isLayered && layout ? (
          <>
            {/* Render Layers with Boundaries */}
            {layout.layers.map((layer) => (
              <g key={layer.id}>
                {/* Boundary Container */}
                {layer.boundary && (
                  <>
                    {(() => {
                      const layerAccent = layer.accentColor ?? layeredData?.theme?.accentColor;
                      const highlightedBoundaryStroke = layer.highlight ? layerAccent : undefined;
                      const highlightedBoundaryFill = layer.highlight ? '#FFFDF5' : undefined;
                      const boundaryStyle = getBoundaryStyle(modeValue, {
                        fill: layer.boundaryFill ?? highlightedBoundaryFill ?? layeredData?.theme?.boundaryFill,
                        stroke: layer.boundaryStroke ?? highlightedBoundaryStroke ?? layeredData?.theme?.boundaryStroke,
                      });
                      return (
                    <rect
                      x={layer.x}
                      y={layer.y}
                      width={layer.width}
                      height={layer.height}
                      rx={boundaryStyle.rx}
                      fill={boundaryStyle.fill}
                      stroke={boundaryStyle.stroke}
                      strokeWidth={boundaryStyle.strokeWidth}
                    />
                      );
                    })()}
                    {layer.label && (
                      <text
                        x={layer.x + layer.width / 2}
                        y={layer.y + 25}
                        className="label"
                        fill={layer.boundaryLabelColor ?? layeredData?.theme?.boundaryLabelColor ?? textStyles.label}
                        textAnchor="middle"
                      >
                        {layer.label}
                      </text>
                    )}
                  </>
                )}

                {/* Render Nodes */}
                {layer.nodes.map((node) => {
                  const nodeIsPopped = node.emphasis === 'accent' || node.emphasis === 'glow' || node.emphasis === 'pulse';
                  const nodeAccent = node.accentColor ?? layer.accentColor ?? layeredData?.theme?.accentColor ?? '#F4C430';
                  const layerIsHighlighted = layer.highlight ?? false;
                  const style = getNodeStyle(node.type, modeValue, {
                    fillColor: node.fillColor ?? (layerIsHighlighted ? '#FFFBEB' : undefined),
                    strokeColor: node.strokeColor ?? (nodeIsPopped ? nodeAccent : undefined),
                    strokeWidth: nodeIsPopped ? 2 : undefined,
                  });
                  const shouldPulse = enablePulseHighlights && node.emphasis === 'pulse';
                  const shouldGlow = node.emphasis === 'glow' || node.emphasis === 'pulse';
                  const nodeTitleColor = node.textColor ?? textStyles.boxTitle;
                  const nodeBodyColor = node.textColor ?? textStyles.text;
                  
                  return (
                    <g key={node.id}>
                      <rect
                        x={node.x}
                        y={node.y}
                        width={node.width}
                        height={node.height}
                        rx={style.rx}
                        fill={style.fill}
                        stroke={style.stroke}
                        strokeWidth={style.strokeWidth}
                        style={{
                          cursor: node.expandable ? 'pointer' : 'default',
                          animation: shouldPulse ? `diagramPulse ${pulseDurationMs}ms ease-in-out infinite` : undefined,
                        }}
                        filter={shouldGlow ? 'url(#diagram-glow)' : undefined}
                        onClick={() => node.expandable && handleNodeClick(node.id)}
                      />
                      
                      {/* Main Label */}
                      {node.label.includes('\n') ? (
                        node.label.split('\n').map((line, lineIdx) => (
                          <text
                            key={lineIdx}
                            x={node.x + LAYOUT_CONSTANTS.NODE_PADDING}
                            y={node.y + LAYOUT_CONSTANTS.NODE_PADDING + (lineIdx + 1) * LAYOUT_CONSTANTS.NODE_LABEL_HEIGHT}
                            className="boxTitle"
                            fill={nodeTitleColor}
                          >
                            {line}
                          </text>
                        ))
                      ) : (
                        <text
                          x={node.x + LAYOUT_CONSTANTS.NODE_PADDING}
                          y={node.y + LAYOUT_CONSTANTS.NODE_PADDING + LAYOUT_CONSTANTS.NODE_LABEL_HEIGHT}
                          className="boxTitle"
                          fill={nodeTitleColor}
                        >
                          {node.label}
                        </text>
                      )}
                      
                      {/* Sub-labels */}
                      {node.subLabels.map((subLabel, idx) => (
                        <text
                          key={idx}
                          x={node.x + LAYOUT_CONSTANTS.NODE_PADDING}
                          y={node.y + LAYOUT_CONSTANTS.NODE_PADDING + LAYOUT_CONSTANTS.NODE_LABEL_HEIGHT + 
                            (node.label.split('\n').length * LAYOUT_CONSTANTS.NODE_LABEL_HEIGHT) + 
                            (idx + 1) * LAYOUT_CONSTANTS.NODE_SUBLABEL_HEIGHT}
                          className="text"
                          fill={nodeBodyColor}
                        >
                          {subLabel}
                        </text>
                      ))}
                      
                      {/* Expanded Details */}
                      {node.expanded && node.details.length > 0 && (
                        <>
                          <line
                            x1={node.x + LAYOUT_CONSTANTS.NODE_PADDING}
                            y1={node.y + LAYOUT_CONSTANTS.NODE_PADDING + 
                              LAYOUT_CONSTANTS.NODE_LABEL_HEIGHT + 
                              (node.label.split('\n').length * LAYOUT_CONSTANTS.NODE_LABEL_HEIGHT) +
                              (node.subLabels.length * LAYOUT_CONSTANTS.NODE_SUBLABEL_HEIGHT) + 10}
                            x2={node.x + node.width - LAYOUT_CONSTANTS.NODE_PADDING}
                            y2={node.y + LAYOUT_CONSTANTS.NODE_PADDING + 
                              LAYOUT_CONSTANTS.NODE_LABEL_HEIGHT + 
                              (node.label.split('\n').length * LAYOUT_CONSTANTS.NODE_LABEL_HEIGHT) +
                              (node.subLabels.length * LAYOUT_CONSTANTS.NODE_SUBLABEL_HEIGHT) + 10}
                            stroke={textStyles.flow}
                            strokeWidth="1"
                            opacity="0.3"
                          />
                          {node.details.map((detail, idx) => (
                            <text
                              key={idx}
                              x={node.x + LAYOUT_CONSTANTS.NODE_PADDING}
                              y={node.y + LAYOUT_CONSTANTS.NODE_PADDING + 
                                LAYOUT_CONSTANTS.NODE_LABEL_HEIGHT + 
                                (node.label.split('\n').length * LAYOUT_CONSTANTS.NODE_LABEL_HEIGHT) +
                                (node.subLabels.length * LAYOUT_CONSTANTS.NODE_SUBLABEL_HEIGHT) + 
                                25 + (idx + 1) * LAYOUT_CONSTANTS.NODE_DETAIL_HEIGHT}
                              className="detail"
                              fill={nodeBodyColor}
                            >
                              • {detail}
                            </text>
                          ))}
                        </>
                      )}
                      
                      {/* Expand indicator */}
                      {node.expandable && (
                        <text
                          x={node.x + node.width - LAYOUT_CONSTANTS.NODE_PADDING}
                          y={node.y + LAYOUT_CONSTANTS.NODE_PADDING + LAYOUT_CONSTANTS.NODE_LABEL_HEIGHT}
                          className="text"
                          textAnchor="end"
                          style={{ cursor: 'pointer', fontSize: '12px' }}
                          onClick={() => handleNodeClick(node.id)}
                        >
                          {node.expanded ? '−' : '+'}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            ))}

            {/* Render Edges with Orthogonal Routing */}
            {(data as LayeredDiagramData).edges.map((edge, idx) => {
              const fromNode = layout.nodeMap.get(edge.from);
              const toNode = layout.nodeMap.get(edge.to);
              
              if (!fromNode || !toNode) return null;

              // Find layers for context
              const fromLayer = layout.layers.find(l => l.nodes.some(n => n.id === fromNode.id));
              const toLayer = layout.layers.find(l => l.nodes.some(n => n.id === toNode.id));
              
              if (!fromLayer || !toLayer) return null;

              const context: EdgeRoutingContext = {
                fromNode,
                toNode,
                fromLayer,
                toLayer,
                layers: layout.layers,
              };

              const path = routeEdge(context);
              const edgeStroke = edge.color ?? (edge.emphasis ? layeredData?.theme?.accentColor : undefined) ?? textStyles.flow;
              const edgeWidth = edge.width ?? (edge.emphasis ? 1.8 : 1.3);
              const edgeAnimated = (edge.animated ?? false) || Boolean(enableEdgeAnimation);
              const edgeDashed = edge.dashed ?? false;

              return (
                <g key={`edge-${idx}`}>
                  {renderEdgePath(path, edgeStroke, edgeWidth, edgeDashed, edgeAnimated)}
                </g>
              );
            })}
          </>
        ) : (
          <>
            {/* Manual Layout Rendering (Backward Compatibility) */}
            {(data as ManualDiagramData).nodes.map((node) => {
              const style = getNodeStyle(node, modeValue);
              
              return (
                <g key={node.id}>
                  <rect
                    x={node.x}
                    y={node.y}
                    width={style.width}
                    height={style.height}
                    rx={style.rx}
                    fill={style.fill}
                    stroke={style.stroke}
                    strokeWidth={style.strokeWidth}
                  />
                  {node.type === 'coreBoundary' ? (
                    <text
                      x={node.x + (node.width || style.width || LAYOUT_CONSTANTS.NODE_WIDTH) / 2}
                      y={node.y + 25}
                      className="label"
                      textAnchor="middle"
                    >
                      {node.label}
                    </text>
                  ) : node.label.includes('\n') ? (
                    node.label.split('\n').map((line, lineIdx) => (
                      <text
                        key={lineIdx}
                        x={node.x + 20}
                        y={node.y + 30 + (lineIdx * 25)}
                        className="boxTitle"
                      >
                        {line}
                      </text>
                    ))
                  ) : (
                    <text
                      x={node.x + 20}
                      y={node.y + (node.subLabels && node.subLabels.length > 0 ? 30 : (style.height || LAYOUT_CONSTANTS.NODE_MIN_HEIGHT) / 2 + 5)}
                      className="boxTitle"
                    >
                      {node.label}
                    </text>
                  )}
                  {node.subLabels && node.subLabels.length > 0 && node.subLabels.map((subLabel, idx) => (
                    <text
                      key={idx}
                      x={node.x + 20}
                      y={node.y + (node.label.includes('\n') ? 80 : 50) + (idx * 20)}
                      className="text"
                    >
                      {subLabel}
                    </text>
                  ))}
                </g>
              );
            })}

            {/* Manual Edges */}
            {(data as ManualDiagramData).edges.map((edge, idx) => {
              const fromNode = nodeMap.get(edge.from);
              const toNode = nodeMap.get(edge.to);
              
              if (!fromNode || !toNode) return null;

              const fromStyle = getNodeStyle(fromNode, modeValue);
              const toStyle = getNodeStyle(toNode, modeValue);

              const fromWidth = fromStyle.width || (fromNode as any).width || LAYOUT_CONSTANTS.NODE_WIDTH;
              const fromHeight = fromStyle.height || (fromNode as any).height || LAYOUT_CONSTANTS.NODE_MIN_HEIGHT;
              const toHeight = toStyle.height || (toNode as any).height || LAYOUT_CONSTANTS.NODE_MIN_HEIGHT;
              
              const x1 = edge.x1 !== undefined ? edge.x1 : fromNode.x + fromWidth;
              const y1 = edge.y1 !== undefined ? edge.y1 : fromNode.y + fromHeight / 2;
              const x2 = edge.x2 !== undefined ? edge.x2 : toNode.x;
              const y2 = edge.y2 !== undefined ? edge.y2 : toNode.y + toHeight / 2;

              return (
                <line
                  key={`edge-${idx}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={textStyles.flow}
                  strokeWidth="1.3"
                  markerEnd="url(#arrow)"
                />
              );
            })}
          </>
        )}
      </svg>
    </div>
  );
}
