import React from 'react';
import PillMarkerSvg from '@/public/icons/pillMarker.svg';
import Image from 'next/image';

const PillMarkerIcon = ({ size }: { size: number }) => (
	<Image
		src={PillMarkerSvg}
		alt="pill marker icon"
		width={size}
		height={size}
	/>
);

export default PillMarkerIcon;
