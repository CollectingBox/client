import { createStore } from './store';
import { ErrorToast } from '@/types/define';

interface ErrorToastState {
	isToastError: boolean;
	errorContent: ErrorToast;
	setIsToastError: (value: boolean | ((prevState: boolean) => boolean)) => void;
	setErrorContent: (
		value: ErrorToast | ((prevState: ErrorToast) => ErrorToast),
	) => void;
}

export const useErrorToastStore = createStore<ErrorToastState>((set) => ({
	isToastError: false,
	errorContent: 'FILTER',
	setIsToastError: (value: boolean | ((prevState: boolean) => boolean)) =>
		set((state) => {
			state.isToastError =
				typeof value === 'function' ? value(state.isToastError) : value;
		}),
	setErrorContent: (
		value: ErrorToast | ((prevState: ErrorToast) => ErrorToast),
	) =>
		set((state) => {
			state.errorContent =
				typeof value === 'function' ? value(state.errorContent) : value;
		}),
}));
