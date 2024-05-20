import { useSystemStore } from '@/store/systemErrorStore';
import { useEffect } from 'react';

const useNetworkStatus = () => {
	const { setIsSystemError, setType } = useSystemStore();

	useEffect(() => {
		const handleOffline = () => {
			setType('OFFLINE');
			setIsSystemError(true);
		};
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('offline', handleOffline);
		};
	}, [setIsSystemError, setType]);
};

export default useNetworkStatus;
