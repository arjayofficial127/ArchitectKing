'use client';

import { CaseStudyLayout } from '@/components/case-studies/CaseStudyLayout';
import { DiagramCreator } from '@/components/case-studies/DiagramCreator';

export default function ThreadInventorySystemCaseStudy() {
  return (
    <CaseStudyLayout
      title="Manufacturing Inventory & Operations Platform"
      subtitle="Global Manufacturing Environment"
      summary="Production-grade inventory tracking and management system for manufacturing operations, enabling real-time stock monitoring, automated reordering, and comprehensive reporting for supply chain optimization."
      problemContext={
        <>
          <p className="mb-4">
            A large-scale manufacturing operation required accurate, real-time inventory tracking across multiple product lines and warehouse locations. Manual tracking methods led to stock discrepancies, delayed reordering, and operational inefficiencies.
          </p>
          <p className="mb-4">
            Key challenges included:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Real-time inventory tracking across multiple warehouse locations and product lines</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Manual stock counting leading to discrepancies and delayed reordering decisions</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Complex search and filtering requirements for large product catalogs</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Need for comprehensive reporting supporting supply chain optimization</span>
            </li>
          </ul>
        </>
      }
      systemArchitecture={
        <>
          <p className="mb-4">
            The system follows a service-oriented architecture with clear separation between inventory tracking, reporting, and integration layers. Real-time updates ensure accurate stock levels across all system components.
          </p>
          <p className="mb-4">
            Core components include:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Inventory tracking engine maintaining real-time stock levels and transaction history</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Search and filtering system supporting complex queries across product attributes</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Reporting module generating insights for supply chain optimization</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Integration layer connecting with backend inventory services and ERP systems</span>
            </li>
          </ul>
        </>
      }
      technicalStack={['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Express.js', 'Material-UI']}
      myContributions={
        <>
          <p className="mb-4">
            Hands-on contribution within a team environment. Key responsibilities included:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Built inventory tracking dashboards using React with real-time data updates</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Integrated REST APIs with backend inventory services for stock level synchronization</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Implemented search, filtering, and reporting capabilities supporting complex queries</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Supported production deployment and data integrity checks ensuring system reliability</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Developed responsive UI components optimized for warehouse tablet devices</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Collaborated with manufacturing team to refine workflows and user experience</span>
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
              <span>Real-time stock level updates using efficient polling and WebSocket connections</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Advanced search with multi-criteria filtering supporting product attributes and locations</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Transaction history tracking with audit trail for inventory movements</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Data integrity validation preventing negative stock levels and duplicate entries</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Optimized database queries handling large product catalogs efficiently</span>
            </li>
          </ul>
        </>
      }
      outcomeImpact={
        <>
          <p className="mb-4">
            The system successfully addresses manufacturing inventory management needs:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Real-time inventory visibility reducing stock discrepancies and manual counting errors</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Improved reordering decisions through accurate stock level tracking and reporting</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Enhanced operational efficiency with automated inventory tracking and transaction logging</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Comprehensive reporting supporting supply chain optimization and capacity planning</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F4C430] mr-2 mt-1">•</span>
              <span>Data integrity checks ensuring reliable inventory records for production planning</span>
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
              accentColor: '#F97316',
            },
            animation: {
              enabled: true,
              edgeFlow: true,
              pulseHighlights: false,
              edgeFlowDurationMs: 1750,
            },
            layers: [
              {
                id: 'user-layer',
                nodes: [
                  {
                    id: 'warehouse-staff',
                    label: 'Warehouse\nStaff',
                    type: 'card',
                  },
                  {
                    id: 'management',
                    label: 'Management',
                    type: 'card',
                  },
                ],
              },
              {
                id: 'frontend-layer',
                nodes: [
                  {
                    id: 'inventory-ui',
                    label: 'Inventory\nDashboard',
                    type: 'card',
                    subLabels: ['React', 'Material-UI'],
                  },
                ],
              },
              {
                id: 'api-layer',
                label: 'API & Business Logic',
                boundary: true,
                highlight: true,
                accentColor: '#F97316',
                nodes: [
                  {
                    id: 'rest-api',
                    label: 'REST API\nLayer',
                    type: 'card',
                    subLabels: ['Express.js', 'Node.js'],
                    fillColor: '#FFF7ED',
                    strokeColor: '#FB923C',
                    emphasis: 'accent',
                  },
                  {
                    id: 'tracking-engine',
                    label: 'Tracking Engine',
                    type: 'card',
                    subLabels: ['Real-time Updates', 'Transaction Log'],
                  },
                ],
              },
              {
                id: 'data-layer',
                nodes: [
                  {
                    id: 'postgresql',
                    label: 'PostgreSQL\nDatabase',
                    type: 'card',
                    subLabels: ['Products', 'Stock Levels', 'History'],
                  },
                ],
              },
            ],
            edges: [
              { from: 'warehouse-staff', to: 'inventory-ui' },
              { from: 'management', to: 'inventory-ui' },
              { from: 'inventory-ui', to: 'rest-api', color: '#F97316', emphasis: true, animated: true },
              { from: 'rest-api', to: 'tracking-engine', color: '#EA580C', emphasis: true, animated: true },
              { from: 'tracking-engine', to: 'postgresql', dashed: true },
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
              accentColor: '#22C55E',
            },
            animation: {
              enabled: true,
              edgeFlow: false,
              pulseHighlights: true,
            },
            layers: [
              {
                id: 'search-layer',
                nodes: [
                  {
                    id: 'search-interface',
                    label: 'Search\nInterface',
                    type: 'card',
                  },
                ],
              },
              {
                id: 'processing-layer',
                label: 'Search & Filter Engine',
                boundary: true,
                highlight: true,
                accentColor: '#22C55E',
                nodes: [
                  {
                    id: 'query-builder',
                    label: 'Query Builder',
                    type: 'card',
                    subLabels: ['Multi-criteria', 'Attributes'],
                    fillColor: '#F0FDF4',
                    strokeColor: '#4ADE80',
                  },
                  {
                    id: 'filter-engine',
                    label: 'Filter Engine',
                    type: 'card',
                    subLabels: ['Location', 'Product Type'],
                    fillColor: '#ECFDF5',
                    strokeColor: '#22C55E',
                    emphasis: 'pulse',
                  },
                ],
              },
              {
                id: 'reporting-layer',
                nodes: [
                  {
                    id: 'report-generator',
                    label: 'Report Generator',
                    type: 'card',
                    subLabels: ['Supply Chain', 'Optimization'],
                  },
                  {
                    id: 'analytics-module',
                    label: 'Analytics\nModule',
                    type: 'card',
                    subLabels: ['Trends', 'Forecasting'],
                  },
                ],
              },
              {
                id: 'data-layer',
                nodes: [
                  {
                    id: 'product-catalog',
                    label: 'Product\nCatalog',
                    type: 'card',
                  },
                ],
              },
            ],
            edges: [
              { from: 'search-interface', to: 'query-builder' },
              { from: 'query-builder', to: 'filter-engine', color: '#22C55E', width: 1.8, emphasis: true, dashed: true },
              { from: 'filter-engine', to: 'product-catalog' },
              { from: 'product-catalog', to: 'report-generator' },
              { from: 'product-catalog', to: 'analytics-module' },
            ],
          }}
        />
      }
    />
  );
}
