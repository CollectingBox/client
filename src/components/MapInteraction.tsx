'use client';

import React from 'react';
import { useMediaQuery } from 'react-responsive';
import MapController from './MapController';
import { AnimationControls } from 'framer-motion';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('./Sidebar'), {
	ssr: false,
});
const BottomSheet = dynamic(() => import('./BottomSheet/BottomSheet'));

interface Props {
	controls: AnimationControls;
}

const MapInteraction = ({ controls }: Props) => {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width:1224px' });

	return (
		<>
			<div className="absolute left-0 top-0 w-[100dvw]">
				<div className="xl:flex xl:h-28 xl:items-start">
					{isTabletOrMobile ? <BottomSheet controls={controls} /> : <Sidebar />}
					<MapController />
				</div>
			</div>
		</>
	);
};

export default MapInteraction;
