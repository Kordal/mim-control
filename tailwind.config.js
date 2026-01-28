/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,svelte}"],
  theme: {
    extend: {
      colors: {
        // --- 1. The Foundation (Backgrounds) ---
        background: {
          DEFAULT: '#121212', // Deep black
          panel: '#1E1E1E',   // Dark gray panel
          hover: '#2A2A2A',   // Hover state gray
        },
        
        // --- 2. Typography (Text) ---
        text: {
          primary: '#FAFAFA',   // Near white
          secondary: '#A0A0A0', // Mid gray
          tertiary: '#666666',  // Darker gray
        },

        // --- 3. Borders ---
        border: {
          DEFAULT: '#3A3A3A', // Standard gray border
          subtle: '#252525',  // Subtle divider
        },

        // --- 4. Semantic Signals (Status) ---
        status: {
          critical: '#B0B0B0', // Light gray (was red)
          warning: '#808080',  // Medium gray (was amber)
          success: '#D0D0D0',  // Lighter gray (was green)
        },

        // --- 5. Actions & Tech ---
        brand: {
          blue: '#909090',    // Medium gray (was blue)
          purple: '#707070',  // Darker gray (was purple)
        },
        button: {
          primary: '#E0E0E0',   // Light gray
          secondary: '#A0A0A0', // Medium gray
          tertiary: '#606060',  // Dark gray
        }
      },
      
      // --- 6. Custom Shadows (Grayscale Glows) ---
      boxShadow: {
        'glow-critical': '0 0 20px -5px rgba(180, 180, 180, 0.4)', // Gray glow
        'glow-blue': '0 0 20px -5px rgba(144, 144, 144, 0.4)',     // Gray glow
        'panel': '0 4px 6px -1px rgba(0, 0, 0, 0.6)',              // Deeper shadow
      },
      
      // --- 7. Animations ---
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}