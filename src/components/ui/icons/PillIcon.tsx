import React from 'react';
import PillSvg from '@/public/icons/pill.svg';
import Image from 'next/image';

const PillIcon = ({ size }: { size: number }) => (
	<Image src={PillSvg} alt="pill icon" width={size} height={size} />
);

export default PillIcon;
