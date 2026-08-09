import type { XrayAnnotation } from '@/lib/xrayPlanning';

export interface DemoXrayCase {
  id: string;
  database_id: string;
  share_token: string;
  patient_name: string;
  phone: string;
  email: null;
  message: string;
  preferred_visit_date: string;
  xray_image_url: string;
  annotated_image_url: null;
  annotations: XrayAnnotation[];
  status: 'new';
  doctor_notes: null;
  currency: 'EUR';
  delivery_status: 'not_sent';
  delivery_error: null;
  plan_version: number;
  plan_expires_at: null;
  price_total: number;
  doctor_id: null;
  created_at: string;
  updated_at: string;
  is_demo: true;
}

export const DEMO_XRAY_CASES: DemoXrayCase[] = [
  {
    id: 'demo-case-implant-gap',
    database_id: 'd1000000-0000-4000-8000-000000000001',
    share_token: 'd0000000-0000-4000-8000-000000000001',
    patient_name: 'DEMO 01 — Implant Gap',
    phone: '+900000000001',
    email: null,
    message: 'Synthetic case: missing upper molar. Compare Straumann and Neodent implant options.',
    preferred_visit_date: '2026-08-04',
    xray_image_url: '/demo/xrays/demo-implant-gap.svg',
    annotated_image_url: null,
    annotations: [],
    status: 'new',
    doctor_notes: null,
    currency: 'EUR',
    delivery_status: 'not_sent',
    delivery_error: null,
    plan_version: 0,
    plan_expires_at: null,
    price_total: 0,
    doctor_id: null,
    created_at: '2026-07-24T09:10:00.000Z',
    updated_at: '2026-07-24T09:10:00.000Z',
    is_demo: true,
  },
  {
    id: 'demo-case-extractions',
    database_id: 'd1000000-0000-4000-8000-000000000002',
    share_token: 'd0000000-0000-4000-8000-000000000002',
    patient_name: 'DEMO 02 — Extractions',
    phone: '+900000000002',
    email: null,
    message: 'Synthetic case: mark two non-restorable teeth with extraction X markers.',
    preferred_visit_date: '2026-08-08',
    xray_image_url: '/demo/xrays/demo-extractions.svg',
    annotated_image_url: null,
    annotations: [],
    status: 'new',
    doctor_notes: null,
    currency: 'EUR',
    delivery_status: 'not_sent',
    delivery_error: null,
    plan_version: 0,
    plan_expires_at: null,
    price_total: 0,
    doctor_id: null,
    created_at: '2026-07-24T09:20:00.000Z',
    updated_at: '2026-07-24T09:20:00.000Z',
    is_demo: true,
  },
  {
    id: 'demo-case-crowns',
    database_id: 'd1000000-0000-4000-8000-000000000003',
    share_token: 'd0000000-0000-4000-8000-000000000003',
    patient_name: 'DEMO 03 — Crowns & Canal',
    phone: '+900000000003',
    email: null,
    message: 'Synthetic case: test zirconia crown and root-canal planning with itemised fees.',
    preferred_visit_date: '2026-08-12',
    xray_image_url: '/demo/xrays/demo-crowns-canal.svg',
    annotated_image_url: null,
    annotations: [],
    status: 'new',
    doctor_notes: null,
    currency: 'EUR',
    delivery_status: 'not_sent',
    delivery_error: null,
    plan_version: 0,
    plan_expires_at: null,
    price_total: 0,
    doctor_id: null,
    created_at: '2026-07-24T09:30:00.000Z',
    updated_at: '2026-07-24T09:30:00.000Z',
    is_demo: true,
  },
  {
    id: 'demo-case-all-on-4',
    database_id: 'd1000000-0000-4000-8000-000000000004',
    share_token: 'd0000000-0000-4000-8000-000000000004',
    patient_name: 'DEMO 04 — All-on-4',
    phone: '+900000000004',
    email: null,
    message: 'Synthetic full-arch case: place an upper All-on-4 marker and review the plan total.',
    preferred_visit_date: '2026-08-16',
    xray_image_url: '/demo/xrays/demo-all-on-4.svg',
    annotated_image_url: null,
    annotations: [],
    status: 'new',
    doctor_notes: null,
    currency: 'EUR',
    delivery_status: 'not_sent',
    delivery_error: null,
    plan_version: 0,
    plan_expires_at: null,
    price_total: 0,
    doctor_id: null,
    created_at: '2026-07-24T09:40:00.000Z',
    updated_at: '2026-07-24T09:40:00.000Z',
    is_demo: true,
  },
  {
    id: 'demo-case-mixed',
    database_id: 'd1000000-0000-4000-8000-000000000005',
    share_token: 'd0000000-0000-4000-8000-000000000005',
    patient_name: 'DEMO 05 — Mixed Plan',
    phone: '+900000000005',
    email: null,
    message: 'Synthetic complex case: combine implant, extraction, crown and clinical-note markers.',
    preferred_visit_date: '2026-08-20',
    xray_image_url: '/demo/xrays/demo-mixed-plan.svg',
    annotated_image_url: null,
    annotations: [],
    status: 'new',
    doctor_notes: null,
    currency: 'EUR',
    delivery_status: 'not_sent',
    delivery_error: null,
    plan_version: 0,
    plan_expires_at: null,
    price_total: 0,
    doctor_id: null,
    created_at: '2026-07-24T09:50:00.000Z',
    updated_at: '2026-07-24T09:50:00.000Z',
    is_demo: true,
  },
];

export const getDemoXrayCase = (id?: string) => {
  if (!id) return undefined;
  const demoCase = DEMO_XRAY_CASES.find(item => item.id === id || item.database_id === id);
  return demoCase ? { ...demoCase, id } : undefined;
};

export const isVirtualDemoXray = (id?: string) =>
  Boolean(id && id.startsWith('demo-case-'));

export const isDirectXrayUrl = (value: string) =>
  /^(?:https?:\/\/|\/)/.test(value);
