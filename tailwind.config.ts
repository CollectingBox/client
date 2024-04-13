import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/types/config';

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
	},
	plugins: [
		plugin(function ({
			addUtilities,
		}: {
			addUtilities: PluginAPI['addUtilities'];
		}) {
			addUtilities({
				'.Display-Large': {
					fontFamily: 'Pretendard',
					fontWeight: '600',
					fontSize: '57px',
					lineHeight: '64px',
					letterSpacing: '-0.01em',
				},
				'.Display-Medium': {
					fontFamily: 'Pretendard',
					fontWeight: '700',
					fontSize: '45px',
					lineHeight: '54px',
					letterSpacing: '-0.01em',
				},
				'.Display-Small': {
					fontFamily: 'Pretendard',
					fontWeight: '500',
					fontSize: '36px',
					lineHeight: '44px',
					letterSpacing: '-0.01em',
				},
				'.Headline-Large': {
					fontFamily: 'Pretendard',
					fontWeight: '600',
					fontSize: '32px',
					lineHeight: '42px',
					letterSpacing: '-0.01em',
				},
				'.Headline-Medium': {
					fontFamily: 'Pretendard',
					fontWeight: '700',
					fontSize: '28px',
					lineHeight: '38px',
					letterSpacing: '-0.01em',
				},
				'.Headline-Small': {
					fontFamily: 'Pretendard',
					fontWeight: '600',
					fontSize: '24px',
					lineHeight: '32px',
					letterSpacing: '-0.01em',
				},
				'.Title-Large': {
					fontFamily: 'Pretendard',
					fontWeight: '700',
					fontSize: '22px',
					lineHeight: '28px',
					letterSpacing: '-0.01em',
				},
				'.Title-Medium': {
					fontFamily: 'Pretendard',
					fontWeight: '600',
					fontSize: '18px',
					lineHeight: '26px',
					letterSpacing: '-0.01em',
				},
				'.Title-Small': {
					fontFamily: 'Pretendard',
					fontWeight: '600',
					fontSize: '16px',
					lineHeight: '24px',
					letterSpacing: '-0.01em',
				},
				'.Body-Large': {
					fontFamily: 'Pretendard',
					fontWeight: '500',
					fontSize: '16px',
					lineHeight: '24px',
					letterSpacing: '0em',
				},
				'.Body-Medium': {
					fontFamily: 'Pretendard',
					fontWeight: '600',
					fontSize: '14px',
					lineHeight: '20px',
					letterSpacing: '0em',
				},
				'.Body-Small': {
					fontFamily: 'Pretendard',
					fontWeight: '600',
					fontSize: '12px',
					lineHeight: '16px',
					letterSpacing: '0em',
				},
				'.Label-Large': {
					fontFamily: 'Pretendard',
					fontWeight: '500',
					fontSize: '14px',
					lineHeight: '20px',
					letterSpacing: '0em',
				},
				'.Label-Medium': {
					fontFamily: 'Pretendard',
					fontWeight: '500',
					fontSize: '12px',
					lineHeight: '16px',
					letterSpacing: '0em',
				},
				'.Label-Small': {
					fontFamily: 'Pretendard',
					fontWeight: '500',
					fontSize: '10px',
					lineHeight: '16px',
					letterSpacing: '0em',
				},
			});
		}),
	],
};
export default config;
