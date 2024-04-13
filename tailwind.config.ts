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
			spacing: {
				'S-2': '2px',
				'S-4': '4px',
				'S-6': '6px',
				'S-8': '8px',
				'S-12': '12px',
				'S-14': '14px',
				'S-16': '16px',
				'S-20': '20px',
				'S-24': '24px',
				'S-28': '28px',
				'S-32': '32px',
				'S-36': '36px',
				'S-40': '40px',
				'S-44': '44px',
				'S-48': '48px',
				'S-56': '56px',
				'S-64': '64px',
				'S-80': '80px',
				'S-96': '96px',
				'S-112': '112px',
				'S-128': '128px',
				'S-144': '144px',
				'S-160': '160px',
				'S-176': '176px',
				'S-192': '192px',
				'S-208': '208px',
			},
		},
	},
	plugins: [
		plugin(function ({
			addUtilities,
			addComponents,
		}: {
			addUtilities: PluginAPI['addUtilities'];
			addComponents: PluginAPI['addComponents'];
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
			addComponents({
				'.Elevation-1-Bottom': {
					boxShadow: '0 2px 4px 0 rgba(51, 49, 46, 0.15)',
				},
				'.Elevation-1-Top': {
					boxShadow: '0 -2px 4px 0 rgba(46, 49, 51, 0.15)',
				},
				'.Elevation-2-Bottom': {
					boxShadow: '0 4px 8px 0 rgba(51, 49, 46, 0.15)',
				},
				'.Elevation-2-Top': {
					boxShadow: '0 -4px 8px 0 rgba(46, 49, 51, 0.15)',
				},
				'.Elevation-3-Bottom': {
					boxShadow: '0 6px 12px 0 rgba(51, 49, 46, 0.15)',
				},
				'.Elevation-3-Top': {
					boxShadow: '0 -6px 12px 0 rgba(46, 49, 51, 0.15)',
				},
				'.Elevation-4-Bottom': {
					boxShadow: '0 8px 16px 0 rgba(51, 49, 46, 0.15)',
				},
				'.Elevation-4-Top': {
					boxShadow: '0 -8px 16px 0 rgba(46, 49, 51, 0.15)',
				},
				'.Elevation-5-Bottom': {
					boxShadow: '0 10px 20px 0 rgba(51, 49, 46, 0.15)',
				},
				'.Elevation-5-Top': {
					boxShadow: ' 0 -10px 20px 0 rgba(46, 49, 51, 0.15)',
				},
			});
		}),
	],
};
export default config;
