import { useErrorToastStore } from '@/store/errorToastStore';
import { useEffect, useRef } from 'react';

const useErrorStatus = () => {
	const { isToastError, setIsToastError, errorContent } = useErrorToastStore();
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (isToastError) {
			timerRef.current = setTimeout(() => {
				setIsToastError(false);
			}, 3000);
		}
		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, [isToastError, errorContent, setIsToastError]);

	return { isToastError };
};

export default useErrorStatus;
