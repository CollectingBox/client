import React from 'react';
import RQProvider from './RQProvider';

const allProviders = [RQProvider];

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
	return allProviders.reduce(
		(acc, Provider) => <Provider>{acc}</Provider>,
		children,
	);
};

export default ProvidersWrapper;
