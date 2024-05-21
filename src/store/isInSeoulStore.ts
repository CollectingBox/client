import { createStore } from './store';

interface IsInSeoulState {
	isInSeoul: boolean;
	setIsInSeoul: (value: boolean | ((prevState: boolean) => boolean)) => void;
}

export const useIsInSeoulStroe = createStore<IsInSeoulState>((set) => ({
	isInSeoul: true,
	setIsInSeoul: (value: boolean | ((prevState: boolean) => boolean)) =>
		set((state) => {
			state.isInSeoul =
				typeof value === 'function' ? value(state.isInSeoul) : value;
		}),
}));
