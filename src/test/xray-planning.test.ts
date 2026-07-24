import { describe, expect, it } from 'vitest';
import { annotationToTreatmentItem, applyPricingItem, createAnnotation, normalizeAnnotations, pricingItemsForTool, xrayPlanTotal } from '@/lib/xrayPlanning';

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

  it('applies the matching admin price and brand to a marker', () => {
    const marker = createAnnotation('implant', 0.5, 0.5);
    const priced = applyPricingItem(marker, {
      id: 'price-1',
      code: 'implant-straumann',
      kind: 'implant',
      display_name: 'Implant — Straumann',
      brand: 'Straumann',
      unit_price: 950,
      currency: 'EUR',
      active: true,
      sort_order: 10,
    });

    expect(priced).toMatchObject({
      label: 'Implant — Straumann',
      pricingCode: 'implant-straumann',
      brand: 'Straumann',
      price: 950,
    });
  });

  it('only offers active prices for the selected tool and currency', () => {
    const items = [
      { id: '1', code: 'implant-eur', kind: 'implant' as const, display_name: 'Implant EUR', brand: null, unit_price: 800, currency: 'EUR', active: true, sort_order: 20 },
      { id: '2', code: 'implant-gbp', kind: 'implant' as const, display_name: 'Implant GBP', brand: null, unit_price: 700, currency: 'GBP', active: true, sort_order: 10 },
      { id: '3', code: 'inactive', kind: 'implant' as const, display_name: 'Inactive', brand: null, unit_price: 1, currency: 'EUR', active: false, sort_order: 0 },
    ];

    expect(pricingItemsForTool(items, 'implant', 'EUR').map(item => item.code)).toEqual(['implant-eur']);
  });
});
