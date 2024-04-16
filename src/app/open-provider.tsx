'use client';

import { createContext, useState } from 'react';

export const OpenContext = createContext({
	isOpen: true,
	setIsOpen: (value: boolean) => {},
});

export default function OpenProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<OpenContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</OpenContext.Provider>
	);
}
