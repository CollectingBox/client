import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				'Green-50': '#DCEFE2',
				'Green-100': '#C6E6CF',
				'Green-200': '#A3D9B3',
				'Green-300': '#82C997',
				'Green-400': '#65B07B',
				'Green-500': '#45995E',
				'Green-600': '#38814E',
				'Green-700': '#376845',
				'Green-800': '#33553D',
				'Green-900': '#233E2B',
				'Gray-50': '#F9F8F7',
				'Gray-100': '#ECE9E5',
				'Gray-200': '#D4CECA',
				'Gray-300': '#BFBBB7',
				'Gray-400': '#979491',
				'Gray-500': '#817E7B',
				'Gray-600': '#625F5D',
				'Gray-700': '#43413E',
				'Gray-800': '#33312E',
				'Gray-900': '#1B1A1A',
				'Brown-100': '#9C6841',
				'Brown-50': '#FFFBF5',
				'Red-100': '#B76166',
				'Blue-100': '#7096B9',
				Error: '#DD0B31',
				Success: '#0079D0',
			},
		},
		fontFamily: {
			Pretendard: ['Pretendard'],
		},
	},
	plugins: [],
};
export default config;
