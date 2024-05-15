import { createStore } from './store';

type SidebarStoreType = {
	isSidebarOpen: boolean;
	setIsSidebarOpen: (
		value: boolean | ((prevState: boolean) => boolean),
	) => void;
};

const useSidebarStateStore = createStore<SidebarStoreType>((set) => ({
	isSidebarOpen: false,
	setIsSidebarOpen: (value: boolean | ((prevState: boolean) => boolean)) =>
		set((state) => {
			state.isSidebarOpen =
				typeof value === 'function' ? value(state.isSidebarOpen) : value;
		}),
}));

export const useIsSidebarOpen = () =>
	useSidebarStateStore((state) => state.isSidebarOpen);
export const useSetIsSidebarOpen = () =>
	useSidebarStateStore((state) => state.setIsSidebarOpen);
