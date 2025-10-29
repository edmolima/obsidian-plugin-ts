/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // Prefix to avoid conflicts with Obsidian's styles
  prefix: 'op-',
  // Important to override Obsidian styles when needed
  important: true,
};
