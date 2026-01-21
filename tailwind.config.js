/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,svetle}", // Adjust based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        // --- 1. The Foundation (Backgrounds) ---
        background: {
          DEFAULT: '#0F172A', // "Deep Void" - Main app background
          panel: '#1E293B',   // "Panel Grey" - Cards, Sidebars, Inputs
          hover: '#334155',   // "Active Grey" - Hover states, Dropdowns
        },
        
        // --- 2. Typography (Text) ---
        text: {
          primary: '#F8FAFC',   // High contrast white (Headers, Body)
          secondary: '#94A3B8', // Muted slate (Timestamps, Labels)
          tertiary: '#475569',
            // Darker slate (Placeholders, Disabled)
        },

        // --- 3. Borders ---
        border: {
          DEFAULT: '#334155', // Standard border
          subtle: '#1E293B',  // Subtle dividers
        },

        // --- 4. Semantic Signals (Status) ---
        status: {
          critical: '#EF4444', // Red Alert (P1, Error)
          warning: '#F59E0B',  // Caution Amber (P2, Degraded)
          success: '#10B981',  // System Green (Solved, Healthy)
        },

        // --- 5. Actions & Tech ---
        brand: {
          blue: '#3B82F6',    // "Tech Blue" - Primary Buttons, Links
          purple: '#8B5CF6',  // "Cyber Purple" - Technical Actions
        },
        button: {
          primary: "#10B981",
          secondary: "#F59E0B",
          tertiary: "#EF4444",
        }
      },
      
      // --- 6. Custom Shadows (The "Glow" Effects) ---
      boxShadow: {
        'glow-critical': '0 0 20px -5px rgba(239, 68, 68, 0.5)', // Red glow
        'glow-blue': '0 0 20px -5px rgba(59, 130, 246, 0.5)',    // Blue glow
        'panel': '0 4px 6px -1px rgba(0, 0, 0, 0.5)',            // Depth for cards
      },
      
      // --- 7. Animations ---
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}