import { SystemContext } from '@/components/contexts/SystemProvider';
import { useContext, useEffect } from 'react';

const useNetworkStatus = () => {
	const { setIsSystemError, setType } = useContext(SystemContext);

	useEffect(() => {
		const handleOffline = () => {
			setType('network');
			setIsSystemError(true);
		};
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('offline', handleOffline);
		};
	}, [setIsSystemError, setType]);
};

export default useNetworkStatus;
