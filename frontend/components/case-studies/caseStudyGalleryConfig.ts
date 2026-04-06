export interface CaseStudyGallerySlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  src: string;
}

export type CaseStudyGalleryId =
  | 'airunote'
  | 'resource-monitoring-system'
  | 'thread-inventory-system'
  | 'denr-chainsaw-registration'
  | 'custom-forms-management';

export const caseStudyGalleryConfig: Record<CaseStudyGalleryId, CaseStudyGallerySlide[]> = {
  airunote: [
    {
      id: 'overview',
      eyebrow: 'Workspace Overview',
      title: 'Knowledge command center',
      description: 'A unified workspace for capture, recent activity, and structured note visibility.',
      src: '/case-studies/airunote/pages/overview.html',
    },
    {
      id: 'knowledge-map',
      eyebrow: 'Knowledge Graph',
      title: 'Connected knowledge map',
      description: 'Notes, collections, and linked concepts surfaced as a clean operational map.',
      src: '/case-studies/airunote/pages/knowledge-map.html',
    },
    {
      id: 'ai-assistant',
      eyebrow: 'AI Capture',
      title: 'Assisted capture workflow',
      description: 'AI-driven extraction, tagging, and summarization designed for controlled knowledge intake.',
      src: '/case-studies/airunote/pages/ai-assistant.html',
    },
  ],
  'resource-monitoring-system': [
    {
      id: 'dashboard',
      eyebrow: 'Executive Dashboard',
      title: 'Portfolio-wide capacity visibility',
      description: 'A high-signal dashboard for utilization, availability, delivery risk, and regional performance.',
      src: '/case-studies/resource-monitoring-system/pages/dashboard.html',
    },
    {
      id: 'capacity',
      eyebrow: 'Capacity Planning',
      title: 'Allocation and bench planning',
      description: 'Forward-looking staffing and load balancing screens for active and upcoming work.',
      src: '/case-studies/resource-monitoring-system/pages/capacity.html',
    },
    {
      id: 'analytics',
      eyebrow: 'Analytics Review',
      title: 'Operational trend analysis',
      description: 'Historical utilization and intervention metrics presented for leadership review.',
      src: '/case-studies/resource-monitoring-system/pages/analytics.html',
    },
  ],
  'thread-inventory-system': [
    {
      id: 'inventory',
      eyebrow: 'Inventory Control',
      title: 'Live stock visibility',
      description: 'A warehouse-grade inventory screen with thresholds, movement velocity, and SKU health.',
      src: '/case-studies/thread-inventory-system/pages/inventory.html',
    },
    {
      id: 'operations',
      eyebrow: 'Operations Floor',
      title: 'Production operations board',
      description: 'Line status, replenishment urgency, and movement queues for manufacturing workflows.',
      src: '/case-studies/thread-inventory-system/pages/operations.html',
    },
    {
      id: 'reporting',
      eyebrow: 'Supply Chain Reporting',
      title: 'Inventory and fulfillment reporting',
      description: 'Performance and variance reporting for procurement and operations leads.',
      src: '/case-studies/thread-inventory-system/pages/reporting.html',
    },
  ],
  'denr-chainsaw-registration': [
    {
      id: 'registration',
      eyebrow: 'Citizen Submission',
      title: 'Digital registration intake',
      description: 'A guided registration surface for applicant identity, equipment details, and filing readiness.',
      src: '/case-studies/denr-chainsaw-registration/pages/registration.html',
    },
    {
      id: 'compliance',
      eyebrow: 'Compliance Review',
      title: 'Review and validation queue',
      description: 'An internal review workspace for requirement checks, document validation, and escalation.',
      src: '/case-studies/denr-chainsaw-registration/pages/compliance.html',
    },
    {
      id: 'tracking',
      eyebrow: 'Permit Tracking',
      title: 'Status tracking and field visibility',
      description: 'Application state, permit aging, and regional field activity presented in a single panel.',
      src: '/case-studies/denr-chainsaw-registration/pages/tracking.html',
    },
  ],
  'custom-forms-management': [
    {
      id: 'builder',
      eyebrow: 'Form Builder',
      title: 'Visual form composition',
      description: 'A metadata-driven builder for sections, fields, visibility rules, and publishing states.',
      src: '/case-studies/custom-forms-management/pages/builder.html',
    },
    {
      id: 'workflow',
      eyebrow: 'Workflow Routing',
      title: 'Routing and automation design',
      description: 'Approval steps, automation branches, and operational handoffs configured without code edits.',
      src: '/case-studies/custom-forms-management/pages/workflow.html',
    },
    {
      id: 'approvals',
      eyebrow: 'Approvals Center',
      title: 'Submission review and approvals',
      description: 'A decision workspace for approvers, SLAs, and workflow backlog visibility.',
      src: '/case-studies/custom-forms-management/pages/approvals.html',
    },
  ],
};