'use client';

import ReactDOM from 'react-dom';

interface Props {
	children: React.ReactNode;
}

const SystemPortal = ({ children }: Props) => {
	if (typeof window === 'undefined') {
		return null;
	}

	const el = document.getElementById('system') as HTMLElement;
	return ReactDOM.createPortal(children, el);
};

export default SystemPortal;
