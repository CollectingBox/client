'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface ICompleteProviderContext {
	isComplete: boolean;
	setIsComplete: Dispatch<SetStateAction<boolean>>;
	completeContent: string;
	setCompleteContent: Dispatch<SetStateAction<string>>;
}

export const CompleteContext = createContext<ICompleteProviderContext>({
	isComplete: false,
	setIsComplete: () => {},
	completeContent: 'register',
	setCompleteContent: () => {},
});

export default function CompleteProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isComplete, setIsComplete] = useState(false);
	const [completeContent, setCompleteContent] = useState('register');

	return (
		<CompleteContext.Provider
			value={{ isComplete, setIsComplete, completeContent, setCompleteContent }}
		>
			{children}
		</CompleteContext.Provider>
	);
}
