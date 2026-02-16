'use client';

import { CaseStudyLayout } from '@/components/case-studies/CaseStudyLayout';
import { DiagramCreator } from '@/components/case-studies/DiagramCreator';

export default function CustomFormsManagementCaseStudy() {
  return (
    <CaseStudyLayout
      title="Enterprise Workflow & Forms Management System"
      subtitle="Large-Scale Organizational Deployment"
      summary="Enterprise-grade dynamic forms platform enabling organizations to create, configure, and manage complex form workflows with conditional logic, validation rules, and seamless backend integration."
      problemContext={
        <>
          <p className="mb-4">
            A global organization needed a flexible system to create and manage custom forms without requiring development resources for each new form requirement. Hard-coded forms created maintenance burden and limited business agility.
          </p>
          <p className="mb-4">
            Key challenges included:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Hard-coded forms requiring developer intervention for every change or new requirement</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Lack of conditional logic and dynamic field rendering based on user input</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Complex validation requirements varying across different form types and use cases</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Need for secure backend integration ensuring data integrity and workflow automation</span>
            </li>
          </ul>
        </>
      }
      systemArchitecture={
        <>
          <p className="mb-4">
            The platform follows a metadata-driven architecture where form definitions are stored as configuration rather than code. This enables non-technical users to create and modify forms while maintaining system flexibility.
          </p>
          <p className="mb-4">
            Core components include:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Form builder engine supporting dynamic field creation and conditional logic</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Validation rules engine enabling complex, context-aware validation logic</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Workflow management system connecting form submissions to backend processes</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Secure API integration layer ensuring data integrity and authentication</span>
            </li>
          </ul>
        </>
      }
      technicalStack={['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Formik', 'Yup']}
      myContributions={
        <>
          <p className="mb-4">
            Hands-on contribution within a team environment. Key responsibilities included:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Built dynamic form components with conditional logic supporting complex workflows</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Connected frontend workflows to secure backend APIs ensuring data integrity</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Collaborated within Agile team to deliver feature modules on schedule</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Participated in production rollout and system enhancements based on user feedback</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Implemented validation rules engine supporting context-aware form validation</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Developed form builder UI enabling non-technical users to create custom forms</span>
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
              <span>Dynamic field rendering based on conditional logic and user input dependencies</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Client-side and server-side validation ensuring data accuracy and security</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Form state management handling complex multi-step workflows and save-resume capabilities</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Secure API integration with authentication and data encryption for sensitive information</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Reusable form components library reducing development time for new form types</span>
            </li>
          </ul>
        </>
      }
      outcomeImpact={
        <>
          <p className="mb-4">
            The system successfully addresses dynamic forms and workflow management needs:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Reduced dependency on development resources for form creation and modifications</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Increased business agility enabling faster form deployment and workflow changes</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Enhanced user experience with conditional logic and dynamic field rendering</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Improved data quality through comprehensive validation rules and secure backend integration</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Streamlined workflows connecting form submissions to automated backend processes</span>
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
              titleColor: '#111827',
              labelColor: '#64748B',
              textColor: '#334155',
              flowColor: '#94A3B8',
              boundaryFill: '#F8FAFC',
              boundaryStroke: '#CBD5E1',
              accentColor: '#7C3AED',
            },
            animation: {
              enabled: true,
              edgeFlow: true,
              pulseHighlights: false,
              edgeFlowDurationMs: 1750,
            },
            layers: [
              {
                id: 'builder-layer',
                nodes: [
                  {
                    id: 'form-builder',
                    label: 'Form Builder\nUI',
                    type: 'card',
                    subLabels: ['Drag & Drop', 'Visual Editor'],
                  },
                ],
              },
              {
                id: 'core-layer',
                label: 'Metadata-Driven Core',
                boundary: true,
                highlight: true,
                accentColor: '#7C3AED',
                nodes: [
                  {
                    id: 'form-definition',
                    label: 'Form Definition\nEngine',
                    type: 'card',
                    subLabels: ['JSON Config', 'Schema'],
                    fillColor: '#F5F3FF',
                    strokeColor: '#A78BFA',
                  },
                  {
                    id: 'conditional-logic',
                    label: 'Conditional Logic\nEngine',
                    type: 'card',
                    subLabels: ['Dynamic Fields', 'Rules'],
                    fillColor: '#EDE9FE',
                    strokeColor: '#8B5CF6',
                    emphasis: 'accent',
                  },
                  {
                    id: 'validation-engine',
                    label: 'Validation\nEngine',
                    type: 'card',
                    subLabels: ['Formik', 'Yup'],
                  },
                ],
              },
              {
                id: 'workflow-layer',
                nodes: [
                  {
                    id: 'workflow-manager',
                    label: 'Workflow\nManager',
                    type: 'card',
                    subLabels: ['State Management', 'Multi-step'],
                  },
                ],
              },
              {
                id: 'integration-layer',
                nodes: [
                  {
                    id: 'api-integration',
                    label: 'Secure API\nIntegration',
                    type: 'card',
                    subLabels: ['REST APIs', 'Authentication'],
                  },
                  {
                    id: 'backend-services',
                    label: 'Backend\nServices',
                    type: 'card',
                    subLabels: ['Node.js', 'PostgreSQL'],
                  },
                ],
              },
            ],
            edges: [
              { from: 'form-builder', to: 'form-definition' },
              { from: 'form-definition', to: 'conditional-logic', color: '#7C3AED', width: 1.8, emphasis: true, animated: true },
              { from: 'conditional-logic', to: 'validation-engine', color: '#6D28D9', width: 1.8, emphasis: true, animated: true },
              { from: 'validation-engine', to: 'workflow-manager' },
              { from: 'workflow-manager', to: 'api-integration' },
              { from: 'api-integration', to: 'backend-services' },
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
              accentColor: '#2563EB',
            },
            animation: {
              enabled: true,
              edgeFlow: false,
              pulseHighlights: true,
            },
            layers: [
              {
                id: 'runtime-layer',
                nodes: [
                  {
                    id: 'form-runtime',
                    label: 'Form Runtime\nEngine',
                    type: 'card',
                    subLabels: ['Dynamic Rendering'],
                  },
                ],
              },
              {
                id: 'logic-layer',
                label: 'Workflow & Validation Engine',
                boundary: true,
                highlight: true,
                accentColor: '#2563EB',
                nodes: [
                  {
                    id: 'conditional-renderer',
                    label: 'Conditional\nRenderer',
                    type: 'card',
                    subLabels: ['Field Dependencies'],
                    fillColor: '#EFF6FF',
                    strokeColor: '#60A5FA',
                  },
                  {
                    id: 'validation-rules',
                    label: 'Validation Rules\nEngine',
                    type: 'card',
                    subLabels: ['Context-aware', 'Real-time'],
                    fillColor: '#DBEAFE',
                    strokeColor: '#3B82F6',
                    emphasis: 'pulse',
                  },
                  {
                    id: 'state-manager',
                    label: 'State Manager',
                    type: 'card',
                    subLabels: ['Save-Resume', 'Multi-step'],
                  },
                ],
              },
              {
                id: 'integration-layer',
                nodes: [
                  {
                    id: 'api-client',
                    label: 'API Client',
                    type: 'card',
                    subLabels: ['Authentication', 'Encryption'],
                  },
                  {
                    id: 'data-transformer',
                    label: 'Data\nTransformer',
                    type: 'card',
                    subLabels: ['Format Conversion'],
                  },
                ],
              },
              {
                id: 'storage-layer',
                nodes: [
                  {
                    id: 'form-storage',
                    label: 'Form Storage\n& Metadata',
                    type: 'card',
                    subLabels: ['PostgreSQL', 'Config DB'],
                  },
                ],
              },
            ],
            edges: [
              { from: 'form-runtime', to: 'conditional-renderer' },
              { from: 'conditional-renderer', to: 'validation-rules', color: '#2563EB', width: 1.8, emphasis: true, dashed: true },
              { from: 'validation-rules', to: 'state-manager' },
              { from: 'state-manager', to: 'api-client' },
              { from: 'api-client', to: 'data-transformer' },
              { from: 'data-transformer', to: 'form-storage' },
            ],
          }}
        />
      }
    />
  );
}
