'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface ICompleteProviderContext {
	isComplete: boolean;
	setIsComplete: Dispatch<SetStateAction<boolean>>;
	content: string;
	setContent: Dispatch<SetStateAction<string>>;
}

export const CompleteContext = createContext<ICompleteProviderContext>({
	isComplete: false,
	setIsComplete: () => {},
	content: 'register',
	setContent: () => {},
});

export default function CompleteProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isComplete, setIsComplete] = useState(false);
	const [content, setContent] = useState('register');

	return (
		<CompleteContext.Provider
			value={{ isComplete, setIsComplete, content, setContent }}
		>
			{children}
		</CompleteContext.Provider>
	);
}
