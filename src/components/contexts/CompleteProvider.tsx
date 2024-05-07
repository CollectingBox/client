'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface ICompleteProviderContext {
	isComplete: boolean;
	setIsComplete: Dispatch<SetStateAction<boolean>>;
	completeContent: 'register' | 'copy';
	setCompleteContent: Dispatch<SetStateAction<'register' | 'copy'>>;
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
	const [completeContent, setCompleteContent] = useState<'register' | 'copy'>(
		'register',
	);

	return (
		<CompleteContext.Provider
			value={{ isComplete, setIsComplete, completeContent, setCompleteContent }}
		>
			{children}
		</CompleteContext.Provider>
	);
}
