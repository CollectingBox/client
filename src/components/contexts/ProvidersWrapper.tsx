import React from 'react';
import RQProvider from './RQProvider';
import SystemProvider from './SystemProvider';

const allProviders = [RQProvider, SystemProvider];

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
	return allProviders.reduce(
		(acc, Provider) => <Provider>{acc}</Provider>,
		children,
	);
};

export default ProvidersWrapper;
