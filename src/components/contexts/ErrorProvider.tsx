'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IErrorProviderContext {
	isToastError: boolean;
	setIsToastError: Dispatch<SetStateAction<boolean>>;
	errorContent: 'filter' | 'search' | 'seoul' | 'data' | 'review';
	setErrorContent: Dispatch<
		SetStateAction<'filter' | 'search' | 'seoul' | 'data' | 'review'>
	>;
}

export const ErrorContext = createContext<IErrorProviderContext>({
	isToastError: false,
	setIsToastError: () => {},
	errorContent: 'filter',
	setErrorContent: () => {},
});

export default function ErrorProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isToastError, setIsToastError] = useState(false);
	const [errorContent, setErrorContent] = useState<
		'filter' | 'search' | 'seoul' | 'data' | 'review'
	>('filter');

	return (
		<ErrorContext.Provider
			value={{ isToastError, setIsToastError, errorContent, setErrorContent }}
		>
			{children}
		</ErrorContext.Provider>
	);
}
