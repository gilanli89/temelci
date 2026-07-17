import { describe, expect, it } from 'vitest';
import { annotationToTreatmentItem, normalizeAnnotations, xrayPlanTotal } from '@/lib/xrayPlanning';

describe('X-ray planning helpers', () => {
  it('upgrades legacy markers and keeps normalized coordinates', () => {
    const annotations = normalizeAnnotations([{ id: 'a', x: 1.2, y: -0.2, label: 'Extraction', tooth: '14', price: 80, note: '' }]);
    expect(annotations).toEqual([{ id: 'a', kind: 'extraction', x: 1, y: 0, label: 'Extraction', tooth: '14', price: 80, note: '' }]);
  });

  it('maps full-arch annotations to treatment items', () => {
    const [annotation] = normalizeAnnotations([{ id: 'a4', kind: 'all_on_4', x: 0.5, y: 0.35, arch: 'upper', price: 5000 }]);
    expect(annotation.label).toBe('All-on-4 (upper)');
    expect(annotationToTreatmentItem(annotation, 'request-id', 0)).toMatchObject({
      request_id: 'request-id',
      treatment_key: 'All-on-4 (upper)',
      price: 5000,
    });
  });

  it('calculates the quoted plan total', () => {
    const annotations = normalizeAnnotations([
      { id: '1', x: 0.2, y: 0.2, label: 'Implant', price: 900 },
      { id: '2', x: 0.3, y: 0.2, label: 'Extraction', price: null },
    ]);
    expect(xrayPlanTotal(annotations)).toBe(900);
  });
});
