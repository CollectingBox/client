import React from 'react';
import TrashcanEnabled from '@/public/icons/trashcan.svg';
import TrashcanDisabled from '@/public/icons/trashcan_disabled.svg';

interface Props {
	enabled?: boolean;
}

const TrashcanIcon = ({ enabled }: Props) => {
	return enabled ? <TrashcanEnabled /> : <TrashcanDisabled />;
};

export default TrashcanIcon;
