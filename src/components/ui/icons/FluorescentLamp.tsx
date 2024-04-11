import React from 'react';
import ClothesSvg from '@/public/icons/fluorescentLamp.svg';
import Image from 'next/image';

const FluorescentLampIcon = ({ size }: { size: number }) => (
	<Image src={ClothesSvg} alt="clothes icon" width={size} height={size} />
);

export default FluorescentLampIcon;
