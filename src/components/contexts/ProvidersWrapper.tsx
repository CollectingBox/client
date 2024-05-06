import React from 'react';
import RQProvider from './RQProvider';
import OpenProvider from './MapDataProvider';
import SystemProvider from './SystemProvider';
import CompleteProvider from './CompleteProvider';

const allProviders = [
	RQProvider,
	SystemProvider,
	CompleteProvider,
	OpenProvider,
];

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
	return allProviders.reduce(
		(acc, Provider) => <Provider>{acc}</Provider>,
		children,
	);
};

export default ProvidersWrapper;
