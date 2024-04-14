import React from 'react';
import PillEnabled from '@/public/icons/pill.svg';
import PillDisabled from '@/public/icons/pill_disabled.svg';

interface Props {
	enabled?: boolean;
}

const PillIcon = ({ enabled }: Props) => {
	return enabled ? <PillEnabled /> : <PillDisabled />;
};

export default PillIcon;
