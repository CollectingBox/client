import React from 'react';
import RQProvider from './RQProvider';
import OpenProvider from './open-provider';

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<RQProvider>
			<OpenProvider>{children}</OpenProvider>
		</RQProvider>
	);
};

export default ProvidersWrapper;
