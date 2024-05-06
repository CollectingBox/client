'use client';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IGetTypeProviderContext {
	getType: string;
	setGetType: Dispatch<SetStateAction<string>>;
}

export const getTypeContext = createContext<IGetTypeProviderContext>({
	getType: 'latlng',
	setGetType: () => {},
});

const GetTypeProvider = ({ children }: { children: React.ReactNode }) => {
	const [getType, setGetType] = useState('latlng');

	return (
		<getTypeContext.Provider value={{ getType, setGetType }}>
			{children}
		</getTypeContext.Provider>
	);
};

export default GetTypeProvider;
