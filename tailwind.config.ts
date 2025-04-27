
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Cores personalizadas para doces
				cream: {
					50: '#FFFBF5',
					100: '#FFF6E9',
					200: '#FEECD3',
					300: '#FDE2BC',
					400: '#FBD8A6',
					500: '#F9CE8F',
					600: '#E6B97B',
					700: '#D4A568',
					800: '#C19154',
					900: '#AF7D41',
				},
				cocoa: {
					50: '#F7F3F0',
					100: '#EFE7E1',
					200: '#DFCFC3',
					300: '#CFB7A5',
					400: '#BF9F87',
					500: '#AF8769',
					600: '#9C7458',
					700: '#896147',
					800: '#764E36',
					900: '#633B25',
				},
				mint: {
					50: '#F0F9F5',
					100: '#E1F3EB',
					200: '#C3E7D7',
					300: '#A5DBC3',
					400: '#87CFAF',
					500: '#69C39B',
					600: '#58B087',
					700: '#479D73',
					800: '#368A5F',
					900: '#25774B',
				},
				berry: {
					50: '#FAF0F5',
					100: '#F5E1EB',
					200: '#EBC3D7',
					300: '#E1A5C3',
					400: '#D787AF',
					500: '#CD699B',
					600: '#BA5887',
					700: '#A74773',
					800: '#94365F',
					900: '#81254B',
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
				display: ['Cormorant Garamond', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.95)' },
					to: { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
