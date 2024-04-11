import React from 'react';
import BatterySvg from '@/public/icons/battery.svg';
import Image from 'next/image';

const BatteryIcon = ({ size }: { size: number }) => (
	<Image src={BatterySvg} alt="battery icon" width={size} height={size} />
);

export default BatteryIcon;
