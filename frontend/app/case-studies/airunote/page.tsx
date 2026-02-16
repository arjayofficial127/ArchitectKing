'use client';

import { CaseStudyLayout } from '@/components/case-studies/CaseStudyLayout';
import { DiagramCreator } from '@/components/case-studies/DiagramCreator';

export default function AiruNoteCaseStudy() {
  return (
    <CaseStudyLayout
      title="AiruNote"
      subtitle="AI-Assisted TXT | MD | RTF Capture & Knowledge Management System"
      summary="AI-powered note capture, structured knowledge management, and document organization system. Built with privacy-first architecture and modular extensibility for enterprise knowledge workflows."
      problemContext={
        <>
          <p className="mb-4">
            Organizations needed a unified system to capture, organize, and retrieve knowledge across multiple document formats (TXT, Markdown, RTF) while maintaining privacy and supporting team collaboration.
          </p>
          <p className="mb-4">
            Key challenges included:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Fragmented knowledge across different file formats and storage locations</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Lack of structured organization and ownership boundaries</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Manual document management without AI-assisted capture capabilities</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Need for modular, installable architecture within larger platform ecosystems</span>
            </li>
          </ul>
        </>
      }
      systemArchitecture={
        <>
          <p className="mb-4">
            The system follows a modular, installable-app architecture with clear ownership boundaries and metadata-driven rendering. The architecture separates document lifecycle management from presentation logic, enabling extensibility without core system changes.
          </p>
          <p className="mb-4">
            Core components include:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Folder-based organization with hierarchical structure and ownership scoping</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Metadata-driven rendering engine supporting multiple document formats</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>AI-assisted capture workflows integrated into document creation pipeline</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Privacy-first data isolation ensuring user data remains secure and private</span>
            </li>
          </ul>
        </>
      }
      technicalStack={['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'AI Integration APIs']}
      myContributions={
        <>
          <p className="mb-4">
            Hands-on contribution within a team environment. Key responsibilities included:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Designed structured document lifecycle architecture with clear state transitions</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Implemented folder hierarchy and ownership boundary logic in backend services</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Built installable-app modular system enabling platform integration</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Created metadata-driven rendering engine supporting TXT, MD, and RTF formats</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Integrated AI-assisted capture workflows with secure API connections</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Developed React components for document editing, folder navigation, and search</span>
            </li>
          </ul>
        </>
      }
      implementationHighlights={
        <>
          <p className="mb-4">
            Notable implementation details:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Save-before-edit pattern preventing data loss during document modifications</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Optimistic UI updates with rollback capabilities for responsive user experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Hierarchical folder navigation with efficient data loading and caching strategies</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Format-specific rendering logic with preview capabilities for Markdown documents</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Privacy-first architecture ensuring user data isolation and security</span>
            </li>
          </ul>
        </>
      }
      outcomeImpact={
        <>
          <p className="mb-4">
            The system successfully addresses knowledge management challenges:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Unified document capture and organization across multiple formats</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Improved knowledge retrieval through structured folder organization and search</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Enhanced productivity with AI-assisted capture reducing manual data entry</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Modular architecture enables seamless integration within larger platform ecosystems</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Privacy-first design ensures secure handling of sensitive organizational knowledge</span>
            </li>
          </ul>
        </>
      }
      highLevelArchitectureDiagram={
        <DiagramCreator
          data={{
            schemaVersion: 1,
            title: 'High-Level Architecture',
            layout: 'layered',
            preset: 'architecture',
            theme: {
              backgroundColor: '#FCFCFD',
              titleColor: '#0F172A',
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
              pulseHighlights: true,
              edgeFlowDurationMs: 1700,
              pulseDurationMs: 2200,
            },
            layers: [
              {
                id: 'input-layer',
                nodes: [
                  {
                    id: 'ai-capture',
                    label: 'AI-Assisted\nCapture Engine',
                    type: 'card',
                    fillColor: '#FFF8E1',
                    strokeColor: '#F4C430',
                    emphasis: 'pulse',
                  },
                ],
              },
              {
                id: 'core-layer',
                label: 'Privacy-First Core Boundary',
                boundary: true,
                boundaryFill: '#F8FAFC',
                boundaryStroke: '#94A3B8',
                nodes: [
                  {
                    id: 'folder-hierarchy',
                    label: 'Folder-Based Hierarchy',
                    type: 'card',
                    subLabels: ['TXT Notes', 'Markdown Docs', 'RTF Files'],
                    fillColor: '#FEFCE8',
                    strokeColor: '#EAB308',
                    emphasis: 'accent',
                  },
                  {
                    id: 'api-layer',
                    label: 'API Layer',
                    type: 'card',
                  },
                  {
                    id: 'rendering-engine',
                    label: 'Rendering Engine',
                    type: 'card',
                    fillColor: '#F8FAFC',
                    strokeColor: '#CBD5E1',
                  },
                  {
                    id: 'management-services',
                    label: 'Management Services',
                    type: 'card',
                  },
                ],
              },
              {
                id: 'external-layer',
                nodes: [
                  {
                    id: 'ai-integration',
                    label: 'AI Integration APIs',
                    type: 'card',
                    fillColor: '#FFFBEB',
                    strokeColor: '#FDE68A',
                    emphasis: 'glow',
                  },
                  {
                    id: 'platform-ecosystem',
                    label: 'Platform Ecosystem',
                    type: 'card',
                  },
                  {
                    id: 'secure-storage',
                    label: 'Secure Storage',
                    type: 'card',
                  },
                ],
              },
            ],
            edges: [
              { from: 'ai-capture', to: 'folder-hierarchy', color: '#F4C430', width: 1.8, emphasis: true, animated: true },
              { from: 'folder-hierarchy', to: 'ai-integration', color: '#F4C430', width: 1.8, emphasis: true, animated: true },
              { from: 'rendering-engine', to: 'platform-ecosystem', dashed: true },
              { from: 'management-services', to: 'secure-storage', dashed: true },
            ],
          }}
        />
      }
      moduleBreakdownDiagram={
        <DiagramCreator
          data={{
            schemaVersion: 1,
            title: 'Module Breakdown',
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
            animation: {
              enabled: true,
              edgeFlow: false,
              pulseHighlights: true,
            },
            layers: [
              {
                id: 'input-layer',
                nodes: [
                  {
                    id: 'user-interface',
                    label: 'User Interface\nComponents',
                    type: 'card',
                    subLabels: ['Folder Tree', 'Document Editor', 'Search'],
                  },
                ],
              },
              {
                id: 'core-layer',
                label: 'Document Lifecycle Core',
                boundary: true,
                highlight: true,
                accentColor: '#14B8A6',
                nodes: [
                  {
                    id: 'document-service',
                    label: 'Document Service',
                    type: 'card',
                    subLabels: ['CRUD Operations', 'State Management'],
                    fillColor: '#ECFEFF',
                    strokeColor: '#14B8A6',
                    emphasis: 'accent',
                  },
                  {
                    id: 'folder-service',
                    label: 'Folder Service',
                    type: 'card',
                    subLabels: ['Hierarchy Management', 'Ownership Scoping'],
                  },
                  {
                    id: 'metadata-engine',
                    label: 'Metadata Engine',
                    type: 'card',
                    subLabels: ['Format Detection', 'Rendering Rules'],
                    fillColor: '#F0FDFA',
                    strokeColor: '#2DD4BF',
                  },
                ],
              },
              {
                id: 'processing-layer',
                nodes: [
                  {
                    id: 'ai-processor',
                    label: 'AI Capture\nProcessor',
                    type: 'card',
                  },
                  {
                    id: 'rendering-service',
                    label: 'Rendering Service',
                    type: 'card',
                    subLabels: ['TXT', 'Markdown', 'RTF'],
                  },
                ],
              },
              {
                id: 'storage-layer',
                nodes: [
                  {
                    id: 'database',
                    label: 'PostgreSQL\nDatabase',
                    type: 'card',
                    subLabels: ['Documents', 'Folders', 'Metadata'],
                  },
                ],
              },
            ],
            edges: [
              { from: 'user-interface', to: 'document-service', color: '#14B8A6', width: 1.8, emphasis: true, dashed: true },
              { from: 'user-interface', to: 'folder-service' },
              { from: 'document-service', to: 'metadata-engine' },
              { from: 'folder-service', to: 'metadata-engine' },
              { from: 'ai-processor', to: 'document-service' },
              { from: 'metadata-engine', to: 'rendering-service', color: '#14B8A6', emphasis: true },
              { from: 'document-service', to: 'database' },
              { from: 'folder-service', to: 'database' },
            ],
          }}
        />
      }
    />
  );
}
