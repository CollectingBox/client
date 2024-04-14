import React from 'react';
import BatteryEnabled from '@/public/icons/battery.svg';
import BatteryDisabled from '@/public/icons/battery_disabled.svg';

interface Props {
	enabled?: boolean;
}

const BatteryIcon = ({ enabled }: Props) => {
	return enabled ? <BatteryEnabled /> : <BatteryDisabled />;
};

export default BatteryIcon;
