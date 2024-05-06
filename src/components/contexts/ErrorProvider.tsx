'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IErrorProviderContext {
	isToastError: boolean;
	setIsToastError: Dispatch<SetStateAction<boolean>>;
	content: string;
	setContent: Dispatch<SetStateAction<string>>;
}

export const ErrorContext = createContext<IErrorProviderContext>({
	isToastError: false,
	setIsToastError: () => {},
	content: 'register',
	setContent: () => {},
});

export default function ErrorProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isToastError, setIsToastError] = useState(false);
	const [content, setContent] = useState('register');

	return (
		<ErrorContext.Provider
			value={{ isToastError, setIsToastError, content, setContent }}
		>
			{children}
		</ErrorContext.Provider>
	);
}
