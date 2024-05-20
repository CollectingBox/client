'use client';

import { CompleteContent } from '@/types/define';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface ICompleteProviderContext {
	isComplete: boolean;
	setIsComplete: Dispatch<SetStateAction<boolean>>;
	completeContent: CompleteContent;
	setCompleteContent: Dispatch<SetStateAction<CompleteContent>>;
}

export const CompleteContext = createContext<ICompleteProviderContext>({
	isComplete: false,
	setIsComplete: () => {},
	completeContent: 'REGISTER',
	setCompleteContent: () => {},
});

export default function CompleteProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isComplete, setIsComplete] = useState(false);
	const [completeContent, setCompleteContent] =
		useState<CompleteContent>('REGISTER');

	return (
		<CompleteContext.Provider
			value={{ isComplete, setIsComplete, completeContent, setCompleteContent }}
		>
			{children}
		</CompleteContext.Provider>
	);
}
