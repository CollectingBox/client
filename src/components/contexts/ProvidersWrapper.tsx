import React from 'react';
import RQProvider from './RQProvider';
import SystemProvider from './SystemProvider';
import GetTypeProvider from './GetTypeProvider';

const allProviders = [RQProvider, SystemProvider, GetTypeProvider];

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
	return allProviders.reduce(
		(acc, Provider) => <Provider>{acc}</Provider>,
		children,
	);
};

export default ProvidersWrapper;
