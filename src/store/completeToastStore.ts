import { createStore } from './store';
import { CompleteContent } from '@/types/define';

interface CompleteState {
	isComplete: boolean;
	completeContent: CompleteContent;
	setIsComplete: (value: boolean | ((prevState: boolean) => boolean)) => void;
	setCompleteContent: (
		value: CompleteContent | ((prevState: CompleteContent) => CompleteContent),
	) => void;
}

export const useCompleteToastStore = createStore<CompleteState>((set) => ({
	isComplete: false,
	completeContent: 'REGISTER',
	setIsComplete: (value: boolean | ((prevState: boolean) => boolean)) =>
		set((state) => {
			state.isComplete =
				typeof value === 'function' ? value(state.isComplete) : value;
		}),
	setCompleteContent: (
		value: CompleteContent | ((prevState: CompleteContent) => CompleteContent),
	) =>
		set((state) => {
			state.completeContent =
				typeof value === 'function' ? value(state.completeContent) : value;
		}),
}));
