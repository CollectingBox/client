import { createStore } from './store';

type SidebarStoreType = {
	selectedColltionId?: number;
	setSelectedCollectionId: (value: number) => void;
};

const useSelectedCollectionStore = createStore<SidebarStoreType>((set) => ({
	selectedColltionId: undefined,
	setSelectedCollectionId: (value: number) =>
		set((state) => {
			state.selectedColltionId = value;
		}),
}));

export const useSelectedCollectionId = () =>
	useSelectedCollectionStore((state) => state.selectedColltionId);
export const useSetSelectedCollectionId = () =>
	useSelectedCollectionStore((state) => state.setSelectedCollectionId);
