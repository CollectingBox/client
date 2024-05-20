import { ErrorContext } from '@/components/contexts/ErrorProvider';
import { useContext, useEffect, useRef } from 'react';

const useErrorStatus = () => {
	const { isToastError, setIsToastError, errorContent } =
		useContext(ErrorContext);
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
