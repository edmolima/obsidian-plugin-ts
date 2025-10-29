import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Custom tailwind-merge instance configured for 'op-' prefix
 */
const twMerge = extendTailwindMerge({
  prefix: 'op-',
});

/**
 * Merge Tailwind classes with proper precedence
 * Usage: cn('op-text-red-500', condition && 'op-bg-blue-500')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
