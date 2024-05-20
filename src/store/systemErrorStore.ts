import { createStore } from './store';
import { SystemErrorType } from '@/types/define';

interface SystemState {
	isSystemError: boolean;
	setIsSystemError: (
		value: boolean | ((prevState: boolean) => boolean),
	) => void;
	type: SystemErrorType;
	setType: (
		value: SystemErrorType | ((prevState: SystemErrorType) => SystemErrorType),
	) => void;
}

export const useSystemStore = createStore<SystemState>((set) => ({
	isSystemError: false,
	setIsSystemError: (value: boolean | ((prevState: boolean) => boolean)) =>
		set((state) => {
			state.isSystemError =
				typeof value === 'function' ? value(state.isSystemError) : value;
		}),
	type: 'SERVER',
	setType: (
		value: SystemErrorType | ((prevState: SystemErrorType) => SystemErrorType),
	) =>
		set((state) => {
			state.type = typeof value === 'function' ? value(state.type) : value;
		}),
}));
