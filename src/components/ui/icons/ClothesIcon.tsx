import React from 'react';
import ClothesEnabled from '@/public/icons/clothes.svg';
import ClothesDisabled from '@/public/icons/clothes_disabled.svg';

interface Props {
	enabled?: boolean;
}

const ClothesIcon = ({ enabled }: Props) => {
	return enabled ? <ClothesEnabled /> : <ClothesDisabled />;
};

export default ClothesIcon;
