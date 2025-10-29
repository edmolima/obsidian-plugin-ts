import { describe, it, expect } from 'vitest';
import { cn } from '../src/shared/lib/utils';

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('op-text-red-500', 'op-bg-blue-500')).toBe(
      'op-text-red-500 op-bg-blue-500'
    );
  });

  it('handles conditional classes', () => {
    expect(cn('op-text-red-500', false && 'op-hidden')).toBe('op-text-red-500');
    expect(cn('op-text-red-500', true && 'op-hidden')).toBe(
      'op-text-red-500 op-hidden'
    );
  });

  it('merges conflicting tailwind classes correctly', () => {
    // tailwind-merge should keep the last one
    expect(cn('op-p-2', 'op-p-4')).toBe('op-p-4');
  });
});
