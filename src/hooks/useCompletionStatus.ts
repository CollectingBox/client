import { CompleteContext } from '@/components/contexts/CompleteProvider';
import { useContext, useEffect, useRef } from 'react';

const useCompletionStatus = () => {
	const { isComplete, setIsComplete } = useContext(CompleteContext);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (isComplete) {
			timerRef.current = setTimeout(() => {
				setIsComplete(false);
			}, 3000);
		}
		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, [isComplete, setIsComplete]);

	return { isComplete };
};

export default useCompletionStatus;
