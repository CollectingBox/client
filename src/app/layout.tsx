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
				{/* 임시로 http 통신 허용 */}
				<meta
					http-equiv="Content-Security-Policy"
					content="upgrade-insecure-requests"
				/>
				<Script
					src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&libraries=services,clusterer&autoload=false`}
					strategy="beforeInteractive"
				/>
			</head>
			<body className={inter.className}>
				<ProvidersWrapper>
					<main className="flex xl:flex-row w-[100dvw] overflow-hidden">
						<Sidebar />
						{children}
						<div id="portal"></div>
					</main>
				</ProvidersWrapper>
			</body>
		</html>
	);
}
