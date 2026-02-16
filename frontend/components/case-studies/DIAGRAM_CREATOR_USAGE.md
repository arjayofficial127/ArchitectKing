# Architecture Diagram Engine - Usage Guide

The `DiagramCreator` component is a semantic, layer-driven architecture diagram engine that renders enterprise-grade SVG diagrams from structured JSON data.

For LLM handoff (ChatGPT-ready prompt + schema format), see:
`frontend/components/case-studies/DIAGRAM_CREATOR_LLM_HANDOFF.md`

## Features

- ✅ **Layer-based layout** - No manual x/y coordinates required
- ✅ **Automatic positioning** - Smart spacing and stacking
- ✅ **Boundary grouping** - Visual containers for logical groups
- ✅ **Auto-calculated edges** - Lines drawn between node centers
- ✅ **Dark mode support** - Enterprise-ready styling
- ✅ **Backward compatible** - Supports legacy manual layout mode

## Basic Usage (Layered Layout)

```tsx
import { DiagramCreator } from '@/components/case-studies/DiagramCreator';

<DiagramCreator
  data={{
    title: 'System Architecture',
    layout: 'layered', // default
    layers: [
      {
        id: 'input-layer',
        nodes: [
          {
            id: 'api-gateway',
            label: 'API Gateway',
            type: 'card',
          },
        ],
      },
      {
        id: 'core-layer',
        label: 'Core Services',
        boundary: true, // Draws container around layer
        nodes: [
          {
            id: 'auth-service',
            label: 'Auth Service',
            type: 'card',
            subLabels: ['JWT', 'OAuth2'],
          },
          {
            id: 'data-service',
            label: 'Data Service',
            type: 'card',
          },
        ],
      },
      {
        id: 'storage-layer',
        nodes: [
          {
            id: 'database',
            label: 'PostgreSQL',
            type: 'card',
          },
        ],
      },
    ],
    edges: [
      { from: 'api-gateway', to: 'auth-service' },
      { from: 'auth-service', to: 'database' },
    ],
  }}
/>
```

## Node Types

- **`card`** (default): White background, standard border
- **`soft`**: Light gray background, subtle border

## Multi-line Labels

Use `\n` for line breaks:

```tsx
{
  id: 'multi-line',
  label: 'First Line\nSecond Line',
}
```

## Sub-labels

Add additional text below the main label:

```tsx
{
  id: 'service',
  label: 'Auth Service',
  subLabels: ['JWT', 'OAuth2', 'SAML'],
}
```

## Boundary Containers

Set `boundary: true` on a layer to draw a container around it:

```tsx
{
  id: 'core-layer',
  label: 'Privacy-First Core Boundary', // Optional label at top
  boundary: true,
  nodes: [/* ... */],
}
```

## Layout Constants

The engine uses these spacing constants (automatically applied):

- Node width: 240px
- Layer gap: 80px
- Node gap: 30px
- Boundary padding: 40px

## Dark Mode

Enable dark mode styling:

```tsx
<DiagramCreator
  data={diagramData}
  mode="dark"
/>
```

## Theme Overrides (Per Diagram)

Use `theme` to customize palette while keeping defaults intact:

```tsx
<DiagramCreator
  data={{
    title: 'High-Level Architecture',
    layout: 'layered',
    theme: {
      backgroundColor: '#FCFCFD',
      titleColor: '#111827',
      flowColor: '#94A3B8',
      boundaryFill: '#F8FAFC',
      boundaryStroke: '#CBD5E1',
      accentColor: '#F4C430',
    },
    layers: [/* ... */],
    edges: [/* ... */],
  }}
/>
```

## Selective Highlighting (Node / Layer / Edge)

Highlight only key parts of a diagram:

```tsx
{
  id: 'core-layer',
  boundary: true,
  highlight: true,
  accentColor: '#0EA5E9',
  nodes: [
    {
      id: 'critical-node',
      label: 'Critical Node',
      fillColor: '#F0F9FF',
      strokeColor: '#38BDF8',
      emphasis: 'accent', // none | accent | glow | pulse
    },
  ],
}
```

```tsx
edges: [
  {
    from: 'critical-node',
    to: 'target-node',
    color: '#0EA5E9',
    width: 1.8,
    dashed: true,
    animated: true,
    emphasis: true,
  },
]
```

## Animation Controls

Keep animation subtle and optional:

```tsx
animation: {
  enabled: true,
  edgeFlow: true,
  pulseHighlights: true,
  edgeFlowDurationMs: 1800,
  pulseDurationMs: 2200,
}
```

## Manual Layout (Legacy)

For backward compatibility, manual positioning is still supported:

```tsx
<DiagramCreator
  data={{
    layout: 'manual',
    nodes: [
      {
        id: 'node1',
        x: 100,
        y: 200,
        width: 220,
        height: 100,
        label: 'Node Label',
        type: 'card',
      },
    ],
    edges: [
      {
        from: 'node1',
        to: 'node2',
        // Optional: custom coordinates
        x1: 300, y1: 250, x2: 420, y2: 295,
      },
    ],
  }}
/>
```

## Example: AiruNote Architecture

See `frontend/app/case-studies/airunote/page.tsx` for a complete example using the layered layout.

## Design Principles

- **Enterprise-grade**: Clean, neutral grayscale palette
- **No visual clutter**: Minimal styling, clear hierarchy
- **Deterministic**: Same input = same output
- **Dependency-free**: Pure SVG rendering
- **Type-safe**: Full TypeScript support
