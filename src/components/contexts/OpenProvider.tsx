'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IOpenProviderContext {
	isSidebarOpen: boolean;
	setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
	collectionId?: number;
	setCollectionId: (value: number) => void;
}

export const OpenContext = createContext<IOpenProviderContext>({
	isSidebarOpen: false,
	setIsSidebarOpen: () => {},
	setCollectionId: (value: number) => {},
});

export default function OpenProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [collectionId, setCollectionId] = useState<number>();

	return (
		<OpenContext.Provider
			value={{ isSidebarOpen, setIsSidebarOpen, collectionId, setCollectionId }}
		>
			{children}
		</OpenContext.Provider>
	);
}
