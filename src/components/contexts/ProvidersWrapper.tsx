import React from 'react';
import RQProvider from './RQProvider';
import OpenProvider from './OpenProvider';
import FilterProvider from './FilterProvider';
import SystemProvider from './SystemProvider';
import MovedProvider from './MovedProvider';
import CompleteProvider from './CompleteProvider';

const allProviders = [
	RQProvider,
	FilterProvider,
	SystemProvider,
	MovedProvider,
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
