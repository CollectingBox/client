'use client';

import ReactDOM from 'react-dom';

interface Props {
	children: React.ReactNode;
}

const ModalPortal = ({ children }: Props) => {
	if (typeof window === 'undefined') {
		return null;
	}

	const el = document.getElementById('portal') as HTMLElement;
	return ReactDOM.createPortal(children, el);
};

export default ModalPortal;
