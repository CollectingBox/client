'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IErrorProviderContext {
	isToastError: boolean;
	setIsToastError: Dispatch<SetStateAction<boolean>>;
	errorContent: string;
	setErrorContent: Dispatch<SetStateAction<string>>;
}

export const ErrorContext = createContext<IErrorProviderContext>({
	isToastError: false,
	setIsToastError: () => {},
	errorContent: 'register',
	setErrorContent: () => {},
});

export default function ErrorProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isToastError, setIsToastError] = useState(false);
	const [errorContent, setErrorContent] = useState('register');

	return (
		<ErrorContext.Provider
			value={{ isToastError, setIsToastError, errorContent, setErrorContent }}
		>
			{children}
		</ErrorContext.Provider>
	);
}
