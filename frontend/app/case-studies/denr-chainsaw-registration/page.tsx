'use client';

import { CaseStudyLayout } from '@/components/case-studies/CaseStudyLayout';
import { DiagramCreator } from '@/components/case-studies/DiagramCreator';

export default function DenrChainsawRegistrationCaseStudy() {
  return (
    <CaseStudyLayout
      title="Government Equipment Registration Platform"
      subtitle="Public Sector Compliance System"
      summary="Secure government compliance system for equipment registration and permit processing, enabling citizens to register equipment, track permit status, and maintain compliance with regulatory requirements."
      problemContext={
        <>
          <p className="mb-4">
            A public sector agency required a digital system to manage equipment registration and permit processing, replacing paper-based workflows that were slow, error-prone, and difficult to track.
          </p>
          <p className="mb-4">
            Key challenges included:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Paper-based registration processes causing delays and data entry errors</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Lack of real-time permit status tracking for applicants</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Complex validation workflows requiring secure document processing</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Need for responsive design supporting access from various devices and locations</span>
            </li>
          </ul>
        </>
      }
      systemArchitecture={
        <>
          <p className="mb-4">
            The system follows a secure, multi-layer architecture with clear separation between public-facing registration interfaces and internal processing workflows. Security and compliance are built into every layer.
          </p>
          <p className="mb-4">
            Core components include:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Public registration portal enabling citizen self-service registration</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Validation engine processing registration data and document verification</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Permit processing workflow with status tracking and notification system</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Secure backend services ensuring data privacy and regulatory compliance</span>
            </li>
          </ul>
        </>
      }
      technicalStack={['React', 'TypeScript', '.NET Core', 'SQL Server', 'Azure', 'Government APIs', 'PDF Generation']}
      myContributions={
        <>
          <p className="mb-4">
            Hands-on contribution within a team environment. Key responsibilities included:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Developed registration forms and validation workflows with comprehensive error handling</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Integrated backend services for permit processing and status tracking</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Improved UI responsiveness across devices ensuring accessibility from mobile and desktop</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Deployed updates within secure production environment following government security protocols</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Built document upload and verification features supporting required compliance documentation</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Collaborated with public sector stakeholders to refine registration workflows and user experience</span>
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
              <span>Multi-step form wizard with progress tracking and save-resume capabilities</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Client-side and server-side validation ensuring data accuracy and security</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Responsive design optimized for mobile devices enabling field registration</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Secure document storage and processing following government data protection standards</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Status notification system keeping applicants informed throughout permit processing</span>
            </li>
          </ul>
        </>
      }
      outcomeImpact={
        <>
          <p className="mb-4">
            The system successfully addresses government compliance and registration needs:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Streamlined registration process reducing processing time and manual data entry errors</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Real-time permit status tracking improving transparency and citizen satisfaction</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Enhanced compliance through automated validation and secure document processing</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Improved accessibility with responsive design supporting various devices and locations</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Secure production environment ensuring data privacy and regulatory compliance</span>
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
              accentColor: '#DC2626',
            },
            animation: {
              enabled: true,
              edgeFlow: true,
              pulseHighlights: false,
              edgeFlowDurationMs: 1850,
            },
            layers: [
              {
                id: 'public-layer',
                nodes: [
                  {
                    id: 'citizen-portal',
                    label: 'Citizen\nRegistration Portal',
                    type: 'card',
                    subLabels: ['Public Access', 'Self-Service'],
                  },
                ],
              },
              {
                id: 'validation-layer',
                label: 'Validation & Processing',
                boundary: true,
                highlight: true,
                accentColor: '#DC2626',
                nodes: [
                  {
                    id: 'validation-engine',
                    label: 'Validation Engine',
                    type: 'card',
                    subLabels: ['Client-side', 'Server-side'],
                    fillColor: '#FEF2F2',
                    strokeColor: '#F87171',
                    emphasis: 'accent',
                  },
                  {
                    id: 'document-processor',
                    label: 'Document Processor',
                    type: 'card',
                    subLabels: ['Upload', 'Verification'],
                  },
                ],
              },
              {
                id: 'workflow-layer',
                nodes: [
                  {
                    id: 'permit-workflow',
                    label: 'Permit Processing\nWorkflow',
                    type: 'card',
                    subLabels: ['Status Tracking', 'Notifications'],
                  },
                ],
              },
              {
                id: 'backend-layer',
                nodes: [
                  {
                    id: 'secure-backend',
                    label: 'Secure Backend\nServices',
                    type: 'card',
                    subLabels: ['.NET Core', 'SQL Server', 'Azure'],
                  },
                ],
              },
            ],
            edges: [
              { from: 'citizen-portal', to: 'validation-engine' },
              { from: 'citizen-portal', to: 'document-processor' },
              { from: 'validation-engine', to: 'permit-workflow', color: '#DC2626', emphasis: true, animated: true },
              { from: 'document-processor', to: 'permit-workflow', color: '#EF4444', emphasis: true, dashed: true },
              { from: 'permit-workflow', to: 'secure-backend' },
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
              accentColor: '#D97706',
            },
            animation: {
              enabled: true,
              edgeFlow: false,
              pulseHighlights: true,
            },
            layers: [
              {
                id: 'form-layer',
                nodes: [
                  {
                    id: 'multi-step-form',
                    label: 'Multi-Step\nForm Wizard',
                    type: 'card',
                    subLabels: ['Progress Tracking', 'Save-Resume'],
                  },
                ],
              },
              {
                id: 'validation-layer',
                label: 'Validation Pipeline',
                boundary: true,
                highlight: true,
                accentColor: '#D97706',
                nodes: [
                  {
                    id: 'client-validation',
                    label: 'Client Validation',
                    type: 'card',
                    subLabels: ['Real-time', 'User Feedback'],
                    fillColor: '#FFFBEB',
                    strokeColor: '#F59E0B',
                  },
                  {
                    id: 'server-validation',
                    label: 'Server Validation',
                    type: 'card',
                    subLabels: ['Security', 'Data Integrity'],
                    fillColor: '#FEF3C7',
                    strokeColor: '#D97706',
                    emphasis: 'pulse',
                  },
                ],
              },
              {
                id: 'processing-layer',
                nodes: [
                  {
                    id: 'status-tracker',
                    label: 'Status Tracker',
                    type: 'card',
                    subLabels: ['Real-time Updates'],
                  },
                  {
                    id: 'notification-service',
                    label: 'Notification\nService',
                    type: 'card',
                    subLabels: ['Email', 'SMS'],
                  },
                ],
              },
              {
                id: 'storage-layer',
                nodes: [
                  {
                    id: 'secure-storage',
                    label: 'Secure Document\nStorage',
                    type: 'card',
                    subLabels: ['Azure', 'Compliance'],
                  },
                ],
              },
            ],
            edges: [
              { from: 'multi-step-form', to: 'client-validation' },
              { from: 'client-validation', to: 'server-validation', color: '#D97706', width: 1.8, emphasis: true },
              { from: 'server-validation', to: 'status-tracker' },
              { from: 'status-tracker', to: 'notification-service' },
              { from: 'server-validation', to: 'secure-storage' },
            ],
          }}
        />
      }
    />
  );
}
