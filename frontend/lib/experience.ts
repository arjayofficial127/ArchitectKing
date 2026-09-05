/**
 * Career facts for the public homepage.
 *
 * SOURCE OF TRUTH: public/pdf/"ARVIN JAYSON CASTRO - Solutions Architect Lead.docx"
 * (the same document served at /resume). Every role, organisation, date and
 * contribution below is taken from that résumé.
 *
 * Nothing here may be invented. If a detail is not in the résumé, leave it out
 * rather than filling the layout.
 */

export interface Role {
  /** Job title exactly as the résumé states it. */
  title: string;
  /** Employer. `client` is set separately where the résumé names one. */
  organisation: string;
  /** Named client or end customer, where the résumé distinguishes one. */
  client?: string;
  /** Engagement type, only where the résumé states it. */
  arrangement?: string;
  period: string;
  /** One-line scope, condensed from the résumé's own bullets. */
  summary: string;
  /** Concrete contributions, each traceable to a résumé bullet. */
  contributions: readonly string[];
  /** Short labels, each supported by that role's résumé bullets. */
  tags: readonly string[];
}

export const roles: readonly Role[] = [
  {
    title: 'Tech Lead, Software',
    organisation: 'BaseOfUI',
    arrangement: 'Contract',
    period: 'Aug 2025 – Apr 2026',
    summary:
      'Led product and technical direction for a multi-tenant SaaS platform for building and operating websites, forms, content, and internal business workflows.',
    contributions: [
      'Architected and delivered core capabilities across authentication, organizations, RBAC, page building and publishing, forms and submissions, file storage, templates, and applications.',
      'Directed end-to-end delivery from product discovery and UX design through architecture, implementation, testing, and release planning - hands-on across frontend, API, and data layers.',
    ],
    tags: ['Multi-tenant SaaS', 'RBAC', 'Page building', 'Forms'],
  },
  {
    title: 'Senior Full-Stack Engineer',
    organisation: 'Comrise Risewave',
    client: 'Willis Towers Watson',
    period: 'Dec 2024 – Aug 2025',
    summary:
      'Delivered enterprise-grade Income Review modules supporting financial data processing.',
    contributions: [
      'Designed a configurable reporting engine with rule-based validation pipelines.',
      'Built scalable backend services focused on performance, reliability, and maintainability, and modeled database schemas and migrations for evolving business requirements.',
    ],
    tags: ['Reporting engine', 'Validation pipelines', 'Backend services'],
  },
  {
    title: 'Solutions Architect (Hands-on Full-Stack)',
    organisation: 'AOTXnologies',
    period: 'Feb 2020 – Nov 2024',
    summary:
      'Architected and delivered a production-grade multi-tenant Learning Management System supporting scalable tenant growth.',
    contributions: [
      'Designed architecture across frontend, API and data layers as the primary technical driver, implementing tenant isolation and role-based access control for secure multi-organization environments.',
      'Established CI/CD pipelines and engineering standards for production readiness, and led technical direction while actively delivering across the full stack.',
    ],
    tags: ['Multi-tenant LMS', 'Tenant isolation', 'GraphQL', 'CI/CD'],
  },
  {
    title: 'Senior Full-Stack Developer',
    organisation: 'Kinetic Staffing',
    period: 'May 2016 – Feb 2020',
    summary: 'Delivered an enterprise organization and role management platform.',
    contributions: [
      'Built a dynamic form builder and reporting dashboards end-to-end.',
      'Designed REST APIs and optimized database models for performance and scalability.',
    ],
    tags: ['Form builder', 'Dashboards', 'REST APIs'],
  },
] as const;

/**
 * Earlier roles, shown as a compact line rather than full entries. Also from
 * the résumé; the full detail lives in the PDF at /resume.
 */
export const earlierRoles = [
  { organisation: 'Rumble Asia / Coffey International', period: '2013 – 2016' },
  { organisation: 'Trinko Inc / Optimum Innovatus / DBSoft / Pointwest', period: '2010 – 2013' },
] as const;

export const education = {
  qualification: 'BS Computer Science',
  institution: 'University of Santo Tomas',
  period: '2006 – 2010',
} as const;

/** Path to the résumé served by the /resume route. */
export const RESUME_ROUTE = '/resume';
