'use client';

import React, { useContext } from 'react';
import Kakaomap from './Kakaomap';
import ToastComplete from './ui/toasts/ToastComplete';
import SystemErrorModal from './ui/modal/SystemErrorModal';
import { SystemContext } from './contexts/SystemProvider';
import { useAnimation } from 'framer-motion';
import useCompletionStatus from '@/hooks/useCompletionStatus';
import useNetworkStatus from '@/hooks/useNetworkStatus';
import MapInteraction from './MapInteraction';

const MainPage = () => {
	const { isComplete } = useCompletionStatus();
	const { isSystemError } = useContext(SystemContext);
	useNetworkStatus();

	const controls = useAnimation();

	return (
		<div className="absolute">
			<Kakaomap controls={controls} />
			<MapInteraction controls={controls} />

			{/** Toast Messages */}
			{isComplete && <ToastComplete />}
			{isSystemError && <SystemErrorModal />}
		</div>
	);
};

export default MainPage;
