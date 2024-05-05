'use client';

import React, { useContext, useRef, useState } from 'react';
import Kakaomap from './Kakaomap';
import useKakaoLoader from '@/utils/util';
import ToastComplete from './ui/toasts/ToastComplete';
import SystemErrorModal from './ui/modal/SystemErrorModal';
import { SystemContext } from './contexts/SystemProvider';
import { useAnimation } from 'framer-motion';
import useCompletionStatus from '@/hooks/useCompletionStatus';
import useNetworkStatus from '@/hooks/useNetworkStatus';
import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';
import { MapDataContext } from './contexts/MapDataProvider';
import MapController from './MapController';
import ReSearchBtn from './ui/ReSearchBtn';

const Sidebar = dynamic(() => import('./Sidebar'), {
	ssr: false,
});
const BottomSheet = dynamic(() => import('./BottomSheet/BottomSheet'));

const MainPage = () => {
	useKakaoLoader();
	const isTabletOrMobile = useMediaQuery({ query: '(max-width:1224px' });

	const { isMoved } = useContext(MapDataContext);
	const { isComplete } = useCompletionStatus();
	const { isSystemError } = useContext(SystemContext);
	useNetworkStatus();

	const controls = useAnimation();

	return (
		<div className="absolute">
			<Kakaomap controls={controls} />
			<div className="absolute left-0 top-0 w-[100dvw]">
				<div className="xl:flex xl:h-28 xl:items-start">
					{isTabletOrMobile ? <BottomSheet controls={controls} /> : <Sidebar />}
					<MapController />
					{isMoved && <ReSearchBtn />}
				</div>
			</div>
			{isComplete && <ToastComplete />}
			{isSystemError && <SystemErrorModal />}
		</div>
	);
};

export default MainPage;
