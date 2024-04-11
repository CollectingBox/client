import React from 'react';
import ClothesSvg from '@/public/icons/clothes.svg';
import Image from 'next/image';

const ClothesIcon = ({ size }: { size: number }) => (
	<Image src={ClothesSvg} alt="clothes icon" width={size} height={size} />
);

export default ClothesIcon;
