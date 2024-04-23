'use client';

import { createContext, useState } from 'react';

interface IOpenProviderContext {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	collectionId?: number;
	setCollectionId: (value: number) => void;
}

export const OpenContext = createContext<IOpenProviderContext>({
	isOpen: false,
	setIsOpen: (value: boolean) => {},
	setCollectionId: (value: number) => {},
});

export default function OpenProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [collectionId, setCollectionId] = useState<number>();

	return (
		<OpenContext.Provider
			value={{ isOpen, setIsOpen, collectionId, setCollectionId }}
		>
			{children}
		</OpenContext.Provider>
	);
}