import React from 'react';
import TrashcanSvg from '@/public/icons/Trashcan.svg';
import Image from 'next/image';

const TrashcanIcon = ({ size }: { size: number }) => (
	<Image src={TrashcanSvg} alt="Trashcan icon" width={size} height={size} />
);

export default TrashcanIcon;
