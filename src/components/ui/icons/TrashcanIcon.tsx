import React from 'react';
import TrashcanSvg from '@/public/icons/trashcan.svg';
import Image from 'next/image';

const TrashcanIcon = ({ size }: { size: number }) => (
	<Image src={TrashcanSvg} alt="trashcan icon" width={size} height={size} />
);

export default TrashcanIcon;
