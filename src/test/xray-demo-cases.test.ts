import { describe, expect, it } from 'vitest';
import { DEMO_XRAY_CASES, getDemoXrayCase, isDirectXrayUrl, isVirtualDemoXray } from '@/lib/xrayDemoCases';

describe('X-ray demo cases', () => {
  it('provides five clearly labelled synthetic cases with unique X-rays', () => {
    expect(DEMO_XRAY_CASES).toHaveLength(5);
    expect(new Set(DEMO_XRAY_CASES.map(item => item.id)).size).toBe(5);
    expect(new Set(DEMO_XRAY_CASES.map(item => item.database_id)).size).toBe(5);
    expect(new Set(DEMO_XRAY_CASES.map(item => item.xray_image_url)).size).toBe(5);
    expect(DEMO_XRAY_CASES.every(item => item.is_demo && item.patient_name.startsWith('DEMO'))).toBe(true);
  });

  it('resolves virtual demo routes and relative public X-ray assets', () => {
    expect(getDemoXrayCase('demo-case-all-on-4')?.patient_name).toContain('All-on-4');
    expect(getDemoXrayCase(DEMO_XRAY_CASES[0].database_id)?.id).toBe(DEMO_XRAY_CASES[0].database_id);
    expect(isVirtualDemoXray('demo-case-mixed')).toBe(true);
    expect(isDirectXrayUrl('/demo/xrays/demo-mixed-plan.svg')).toBe(true);
  });
});
