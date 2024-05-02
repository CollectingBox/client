'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface ISystemProviderContext {
	isSystemError: boolean;
	setIsSystemError: Dispatch<SetStateAction<boolean>>;
	type: string;
	setType: Dispatch<SetStateAction<string>>;
}

export const SystemContext = createContext<ISystemProviderContext>({
	isSystemError: true,
	setIsSystemError: () => {},
	type: 'server',
	setType: () => {},
});

export default function SystemProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSystemError, setIsSystemError] = useState(true);
	const [type, setType] = useState('server');

	return (
		<SystemContext.Provider
			value={{ isSystemError, setIsSystemError, type, setType }}
		>
			{children}
		</SystemContext.Provider>
	);
}
