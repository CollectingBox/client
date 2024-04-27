'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IOpenProviderContext {
	openLevel: number;
	setOpenLevel: Dispatch<SetStateAction<number>>;
	collectionId?: number;
	setCollectionId: (value: number) => void;
}

export const OpenContext = createContext<IOpenProviderContext>({
	openLevel: 0,
	setOpenLevel: () => {},
	setCollectionId: (value: number) => {},
});

export default function OpenProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [openLevel, setOpenLevel] = useState(0);
	const [collectionId, setCollectionId] = useState<number>();

	return (
		<OpenContext.Provider
			value={{ openLevel, setOpenLevel, collectionId, setCollectionId }}
		>
			{children}
		</OpenContext.Provider>
	);
}
