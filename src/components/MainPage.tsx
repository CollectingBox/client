'use client';

import React from 'react';
import Kakaomap from './Kakaomap';
import ToastComplete from './ui/toasts/ToastComplete';
import SystemErrorModal from './ui/modal/SystemErrorModal';
import { useAnimation } from 'framer-motion';
import useCompletionStatus from '@/hooks/useCompletionStatus';
import useNetworkStatus from '@/hooks/useNetworkStatus';
import dynamic from 'next/dynamic';
import ToastError from './ui/toasts/ToastError';
import useErrorStatus from '@/hooks/useErrorStatus';
import { useSystemStore } from '@/store/systemErrorStore';

const MapInteraction = dynamic(() => import('./MapInteraction'), {
	ssr: false,
});

const MainPage = () => {
	const { isComplete } = useCompletionStatus();
	const { isToastError } = useErrorStatus();
	const { isSystemError } = useSystemStore();
	useNetworkStatus();

	const controls = useAnimation();

	return (
		<div className="absolute">
			<Kakaomap controls={controls} />
			<MapInteraction controls={controls} />
			{isToastError && <ToastError />}
			{isComplete && <ToastComplete />}
			{isSystemError && <SystemErrorModal />}
		</div>
	);
};

export default MainPage;
