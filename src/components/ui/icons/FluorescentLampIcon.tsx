import React from 'react';
import FluorescentLampEnabled from '@/public/icons/fluorescentLamp.svg';
import FluorescentLampDisabled from '@/public/icons/fluorescentLamp_disabled.svg';

interface Props {
	enabled?: boolean;
}

const FluorescentLampIcon = ({ enabled }: Props) => {
	return enabled ? <FluorescentLampEnabled /> : <FluorescentLampDisabled />;
};

export default FluorescentLampIcon;
