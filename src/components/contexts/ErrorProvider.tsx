'use client';

import { ErrorToast } from '@/types/define';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IErrorProviderContext {
	isToastError: boolean;
	setIsToastError: Dispatch<SetStateAction<boolean>>;
	errorContent: ErrorToast;
	setErrorContent: Dispatch<SetStateAction<ErrorToast>>;
}

export const ErrorContext = createContext<IErrorProviderContext>({
	isToastError: false,
	setIsToastError: () => {},
	errorContent: 'FILTER',
	setErrorContent: () => {},
});

export default function ErrorProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isToastError, setIsToastError] = useState(false);
	const [errorContent, setErrorContent] = useState<ErrorToast>('FILTER');

	return (
		<ErrorContext.Provider
			value={{ isToastError, setIsToastError, errorContent, setErrorContent }}
		>
			{children}
		</ErrorContext.Provider>
	);
}
