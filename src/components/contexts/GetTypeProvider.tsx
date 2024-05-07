'use client';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IGetTypeProviderContext {
	getType: 'latlng' | 'search';
	setGetType: Dispatch<SetStateAction<'latlng' | 'search'>>;
}

export const getTypeContext = createContext<IGetTypeProviderContext>({
	getType: 'latlng',
	setGetType: () => {},
});

const GetTypeProvider = ({ children }: { children: React.ReactNode }) => {
	const [getType, setGetType] = useState<'latlng' | 'search'>('latlng');

	return (
		<getTypeContext.Provider value={{ getType, setGetType }}>
			{children}
		</getTypeContext.Provider>
	);
};

export default GetTypeProvider;
