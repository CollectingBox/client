'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface IFilterProviderContext {
	selectedFilters: string[];
	setSelectedFilters: Dispatch<SetStateAction<string[]>>;
}

export const FilterContext = createContext<IFilterProviderContext>({
	selectedFilters: [],
	setSelectedFilters: () => {},
});

export default function FilterProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [selectedFilters, setSelectedFilters] = useState(['CLOTHES', 'LAMP']);
	return (
		<FilterContext.Provider value={{ selectedFilters, setSelectedFilters }}>
			{children}
		</FilterContext.Provider>
	);
}
