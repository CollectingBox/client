'use client';

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface Props {
	children: React.ReactNode;
}

const ModalPortal = ({ children }: Props) => {
	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => {
		setHasMounted(true);
	}, []);
	if (!hasMounted) {
		return null;
	}
	const el = document.getElementById('portal') as HTMLElement;
	return ReactDOM.createPortal(children, el);
};

export default ModalPortal;
