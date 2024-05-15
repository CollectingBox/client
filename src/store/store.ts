import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const createStore = <T extends object>(
	initializer: StateCreator<
		T,
		[['zustand/devtools', never], ['zustand/immer', never]]
	>,
) =>
	create<T, [['zustand/devtools', never], ['zustand/immer', never]]>(
		devtools(immer(initializer)),
	);
