'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IOpenProviderContext {
	isMoved: boolean;
	setIsMoved: Dispatch<SetStateAction<boolean>>;
}

export const MovedContext = createContext<IOpenProviderContext>({
	isMoved: false,
	setIsMoved: () => {},
});

export default function MovedProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isMoved, setIsMoved] = useState(false);

	return (
		<MovedContext.Provider value={{ isMoved, setIsMoved }}>
			{children}
		</MovedContext.Provider>
	);
}
