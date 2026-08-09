import { describe, expect, it } from 'vitest';
import { formatLocalDateInputValue, isVisitDateValid } from '@/lib/dateInput';

describe('date input helpers', () => {
  it('always returns the ISO value expected by input[type=date]', () => {
    const localDate = new Date(2026, 6, 24, 12, 0, 0);
    expect(formatLocalDateInputValue(localDate)).toBe('2026-07-24');
  });

  it('accepts today and future dates but rejects past and malformed values', () => {
    const minimum = '2026-07-24';
    expect(isVisitDateValid('2026-07-24', minimum)).toBe(true);
    expect(isVisitDateValid('2026-08-15', minimum)).toBe(true);
    expect(isVisitDateValid('2026-07-23', minimum)).toBe(false);
    expect(isVisitDateValid('7/24/2026', minimum)).toBe(false);
  });
});
