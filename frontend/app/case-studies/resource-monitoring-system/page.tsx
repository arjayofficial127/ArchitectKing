'use client';

import { CaseStudyLayout } from '@/components/case-studies/CaseStudyLayout';
import { DiagramCreator } from '@/components/case-studies/DiagramCreator';

export default function ResourceMonitoringSystemCaseStudy() {
  return (
    <CaseStudyLayout
      title="Enterprise Resource Assessment & Monitoring Platform"
      subtitle="Global Insurance & Advisory Environment"
      summary="Enterprise-grade resource assessment and monitoring platform enabling real-time visibility into organizational resources, capacity planning, and operational metrics across distributed teams."
      problemContext={
        <>
          <p className="mb-4">
            A global enterprise client in the insurance and advisory sector required comprehensive visibility into resource allocation, utilization, and capacity across multiple departments and projects. Manual tracking and fragmented reporting systems created gaps in decision-making.
          </p>
          <p className="mb-4">
            Key challenges included:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Lack of real-time visibility into resource allocation and utilization</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Fragmented data across multiple systems requiring manual consolidation</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Complex role-based access requirements for different organizational levels</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Need for interactive dashboards supporting data-driven decision making</span>
            </li>
          </ul>
        </>
      }
      systemArchitecture={
        <>
          <p className="mb-4">
            The platform follows a layered architecture with clear separation between data collection, processing, and visualization layers. The system aggregates data from multiple sources and presents it through role-based dashboards.
          </p>
          <p className="mb-4">
            Core components include:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Data aggregation layer collecting metrics from multiple enterprise systems</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Processing engine for real-time calculations and trend analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Role-based access control ensuring appropriate data visibility per user level</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Interactive dashboard layer with configurable widgets and reporting modules</span>
            </li>
          </ul>
        </>
      }
      technicalStack={['React', 'TypeScript', '.NET Core', 'SQL Server', 'Azure', 'REST APIs', 'Chart.js']}
      myContributions={
        <>
          <p className="mb-4">
            Hands-on contribution within a team environment. Key responsibilities included:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Developed interactive dashboards and reporting modules using React and Chart.js</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Integrated backend APIs for enterprise data visualization and real-time updates</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Implemented secure role-based access control for multi-level organizational access</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Participated in CI/CD deployment workflows ensuring reliable production releases</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Built responsive UI components supporting desktop and tablet viewing</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Collaborated with backend team to design efficient API contracts for data retrieval</span>
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
              <span>Real-time data updates using WebSocket connections for live dashboard refresh</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Configurable widget system allowing users to customize dashboard layouts</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Efficient data caching strategies reducing API load and improving response times</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Role-based filtering ensuring users only see data appropriate to their access level</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Export capabilities for reports supporting PDF and Excel formats</span>
            </li>
          </ul>
        </>
      }
      outcomeImpact={
        <>
          <p className="mb-4">
            The system successfully addresses enterprise resource monitoring needs:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Real-time visibility into resource allocation enabling faster decision-making</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Unified data presentation eliminating need for manual report consolidation</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Improved capacity planning through interactive dashboards and trend analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Secure access control ensuring appropriate data visibility across organizational levels</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Enhanced operational efficiency with automated reporting and data visualization</span>
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
              backgroundColor: '#FBFCFF',
              titleColor: '#0F172A',
              labelColor: '#64748B',
              textColor: '#334155',
              flowColor: '#94A3B8',
              boundaryFill: '#F8FAFC',
              boundaryStroke: '#CBD5E1',
              accentColor: '#0EA5E9',
            },
            animation: {
              enabled: true,
              edgeFlow: true,
              pulseHighlights: false,
              edgeFlowDurationMs: 1900,
            },
            layers: [
              {
                id: 'data-sources-layer',
                nodes: [
                  {
                    id: 'enterprise-systems',
                    label: 'Enterprise\nSystems',
                    type: 'card',
                    subLabels: ['HRIS', 'Project Tools', 'Time Tracking'],
                  },
                ],
              },
              {
                id: 'aggregation-layer',
                label: 'Data Aggregation & Processing',
                boundary: true,
                highlight: true,
                accentColor: '#0EA5E9',
                nodes: [
                  {
                    id: 'data-aggregator',
                    label: 'Data Aggregator',
                    type: 'card',
                    fillColor: '#F0F9FF',
                    strokeColor: '#38BDF8',
                    emphasis: 'accent',
                  },
                  {
                    id: 'processing-engine',
                    label: 'Processing Engine',
                    type: 'card',
                    subLabels: ['Real-time Calc', 'Trend Analysis'],
                  },
                ],
              },
              {
                id: 'access-layer',
                nodes: [
                  {
                    id: 'rbac-service',
                    label: 'Role-Based\nAccess Control',
                    type: 'card',
                    fillColor: '#EFF6FF',
                    strokeColor: '#60A5FA',
                    emphasis: 'glow',
                  },
                ],
              },
              {
                id: 'presentation-layer',
                nodes: [
                  {
                    id: 'dashboard-engine',
                    label: 'Dashboard Engine',
                    type: 'card',
                    subLabels: ['Interactive Widgets', 'Chart.js'],
                  },
                  {
                    id: 'reporting-module',
                    label: 'Reporting Module',
                    type: 'card',
                    subLabels: ['PDF Export', 'Excel Export'],
                  },
                ],
              },
            ],
            edges: [
              { from: 'enterprise-systems', to: 'data-aggregator', color: '#38BDF8', emphasis: true },
              { from: 'data-aggregator', to: 'processing-engine', color: '#0EA5E9', emphasis: true, animated: true },
              { from: 'processing-engine', to: 'rbac-service', color: '#0284C7', emphasis: true, animated: true },
              { from: 'rbac-service', to: 'dashboard-engine' },
              { from: 'rbac-service', to: 'reporting-module' },
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
              backgroundColor: '#FCFCFF',
              titleColor: '#111827',
              labelColor: '#64748B',
              textColor: '#334155',
              flowColor: '#94A3B8',
              boundaryFill: '#F8FAFC',
              boundaryStroke: '#CBD5E1',
              accentColor: '#8B5CF6',
            },
            animation: {
              enabled: true,
              edgeFlow: false,
              pulseHighlights: true,
            },
            layers: [
              {
                id: 'user-layer',
                nodes: [
                  {
                    id: 'executive-users',
                    label: 'Executive\nUsers',
                    type: 'card',
                  },
                  {
                    id: 'manager-users',
                    label: 'Manager\nUsers',
                    type: 'card',
                  },
                  {
                    id: 'team-users',
                    label: 'Team\nUsers',
                    type: 'card',
                  },
                ],
              },
              {
                id: 'access-control-layer',
                label: 'Access Control Layer',
                boundary: true,
                highlight: true,
                accentColor: '#8B5CF6',
                nodes: [
                  {
                    id: 'permission-engine',
                    label: 'Permission Engine',
                    type: 'card',
                    subLabels: ['Role Mapping', 'Data Filtering'],
                    fillColor: '#F5F3FF',
                    strokeColor: '#8B5CF6',
                    emphasis: 'pulse',
                  },
                ],
              },
              {
                id: 'data-layer',
                nodes: [
                  {
                    id: 'filtered-data',
                    label: 'Filtered Data\nService',
                    type: 'card',
                  },
                ],
              },
              {
                id: 'presentation-layer',
                nodes: [
                  {
                    id: 'executive-dashboard',
                    label: 'Executive\nDashboard',
                    type: 'card',
                    subLabels: ['Org-wide Metrics'],
                  },
                  {
                    id: 'manager-dashboard',
                    label: 'Manager\nDashboard',
                    type: 'card',
                    subLabels: ['Dept Metrics'],
                  },
                  {
                    id: 'team-dashboard',
                    label: 'Team\nDashboard',
                    type: 'card',
                    subLabels: ['Team Metrics'],
                  },
                ],
              },
            ],
            edges: [
              { from: 'executive-users', to: 'permission-engine' },
              { from: 'manager-users', to: 'permission-engine' },
              { from: 'team-users', to: 'permission-engine' },
              { from: 'permission-engine', to: 'filtered-data', color: '#8B5CF6', width: 1.8, emphasis: true, dashed: true },
              { from: 'filtered-data', to: 'executive-dashboard' },
              { from: 'filtered-data', to: 'manager-dashboard' },
              { from: 'filtered-data', to: 'team-dashboard' },
            ],
          }}
        />
      }
    />
  );
}
