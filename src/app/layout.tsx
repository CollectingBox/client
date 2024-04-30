import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import Sidebar from '@/components/Sidebar';
import ProvidersWrapper from '@/components/contexts/ProvidersWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '우수함',
	description: '우리동네 수거함',
	icons: {
		icon: '/favicon.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<head>
				<Script
					src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&libraries=services,clusterer&autoload=false`}
					strategy="beforeInteractive"
				/>
			</head>
			<body className={inter.className}>
				<ProvidersWrapper>
					<main className="flex w-[100dvw] overflow-hidden xl:flex-row">
						{children}
						<div id="portal"></div>
					</main>
				</ProvidersWrapper>
			</body>
		</html>
	);
}
