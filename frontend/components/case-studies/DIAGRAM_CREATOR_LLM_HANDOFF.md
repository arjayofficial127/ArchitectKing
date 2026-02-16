# Diagram Creator - LLM Handoff Spec

Use this document when asking ChatGPT (or any LLM) to generate `DiagramCreator` configs.

Primary reference: `frontend/components/case-studies/DIAGRAM_CREATOR_USAGE.md`

## What To Output

- Return only the `data={{ ... }}` object for `<DiagramCreator />`
- Use `layout: 'layered'` unless explicitly asked for manual
- Keep labels readable and short
- Use selective highlighting only (not full-canvas heavy coloring)

## Required Shape (Layered)

```tsx
data={{
  schemaVersion: 1,
  title: 'Your Diagram Title',
  layout: 'layered',
  preset: 'architecture', // architecture | flow | infrastructure
  theme: {
    backgroundColor: '#FCFCFD',
    titleColor: '#111827',
    labelColor: '#64748B',
    textColor: '#334155',
    flowColor: '#94A3B8',
    boundaryFill: '#F8FAFC',
    boundaryStroke: '#CBD5E1',
    boundaryLabelColor: '#64748B',
    accentColor: '#F4C430',
  },
  animation: {
    enabled: true,
    edgeFlow: true,
    pulseHighlights: false,
    edgeFlowDurationMs: 1800,
    pulseDurationMs: 2200,
  },
  layers: [
    {
      id: 'layer-id',
      label: 'Optional Group Label',
      boundary: true,
      highlight: true,
      accentColor: '#0EA5E9',
      boundaryFill: '#F8FAFC',
      boundaryStroke: '#CBD5E1',
      boundaryLabelColor: '#64748B',
      nodes: [
        {
          id: 'node-id',
          label: 'Node Label',
          subLabels: ['Optional', 'Details'],
          type: 'card', // card | soft
          fillColor: '#F0F9FF',
          strokeColor: '#38BDF8',
          textColor: '#1E293B',
          emphasis: 'accent', // none | accent | glow | pulse
        },
      ],
    },
  ],
  edges: [
    {
      from: 'source-node-id',
      to: 'target-node-id',
      color: '#0EA5E9',
      width: 1.8,
      dashed: false,
      animated: true,
      emphasis: true,
    },
  ],
}}
```

## Diagram Style Rules (Important)

- Base style should stay neutral and clean.
- Highlight budget:
  - 1-3 focus nodes
  - 1-2 focus paths
  - optional 1 highlighted boundary group
- Prefer one accent color per diagram.
- Use animation only on primary flow.
- Avoid too many sub-label lines per node.

## Prompt Template For ChatGPT

```text
Generate a DiagramCreator `data={{ ... }}` object for a [DIAGRAM TYPE] diagram.

Context:
- Domain: [YOUR DOMAIN]
- Audience: [ENGINEERING / EXECUTIVE / MIXED]
- Goal: [WHAT SHOULD BE UNDERSTOOD IMMEDIATELY]

Requirements:
- Use `layout: 'layered'` and `preset: 'architecture'` unless better otherwise.
- Keep it enterprise-clean and readable.
- Use selective emphasis only:
  - max 3 highlighted nodes
  - max 2 emphasized edges
  - optional 1 highlighted boundary layer
- Include `theme` and `animation` configs.
- Use stable IDs and meaningful labels.
- Return ONLY the `data={{ ... }}` object, no explanations.
```

## Quick Starters (Kinds of Diagrams)

- System architecture
- Workflow/process flow
- Module breakdown
- Data pipeline
- Integration map
- Org/role visibility map
- Validation lifecycle
- UI module map
- Service dependency graph
- Security boundary map

## Validation Checklist (Before Using Output)

- IDs are unique.
- Every edge references existing nodes.
- Node labels are short and clear.
- No over-highlighting.
- Animation is subtle.
- Diagram remains understandable when animation is off.
