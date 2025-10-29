import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Use default twMerge behavior (no built-in prefix handling reliably across versions)
const twMerge = extendTailwindMerge({});

/**
 * Merge Tailwind classes with proper precedence.
 * This function supports an `op-` prefix used across this template.
 * Approach:
 *  - Normalize input classes and remember which tokens were prefixed with `op-`.
 *  - Remove the `op-` prefix for merging so tailwind-merge can match groups.
 *  - Run tailwind-merge on stripped tokens.
 *  - Reapply `op-` to tokens that originally had the prefix.
 */
export function cn(...inputs: ClassValue[]) {
  const raw = clsx(inputs).trim();
  if (!raw) return '';

  const tokens = raw.split(/\s+/).map((t) => ({
    raw: t,
    stripped: t.startsWith('op-') ? t.slice(3) : t,
    wasPrefixed: t.startsWith('op-'),
  }));

  // Set of stripped tokens that were prefixed in the original input
  const prefixedSet = new Set(tokens.filter((t) => t.wasPrefixed).map((t) => t.stripped));

  // Merge on stripped tokens so tailwind-merge recognizes utility groups
  const strippedInput = tokens.map((t) => t.stripped).join(' ');
  const mergedStripped = twMerge(strippedInput);

  // Reapply 'op-' to tokens that originally had it
  const final = mergedStripped
    .split(/\s+/)
    .map((tok) => (prefixedSet.has(tok) ? `op-${tok}` : tok))
    .filter(Boolean)
    .join(' ');

  return final;
}
