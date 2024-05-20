'use client';
import { useContext, useState } from 'react';
import React from 'react';
import CopyIcon from '@/public/icons/copy.svg';
import CheckIcon from '@/public/icons/check.svg';
import { CompleteContext } from './contexts/CompleteProvider';

export default function Copy({ text }: { text: string }) {
	const [icon, setIcon] = useState(CopyIcon);
	const { setIsComplete, setCompleteContent } = useContext(CompleteContext);

	const copy = async () => {
		await navigator?.clipboard?.writeText(text);
		setIcon(CheckIcon);
		setCompleteContent('COPY');
		setIsComplete(true);
	};

	return (
		<pre className="flex items-center">
			<button onClick={copy} className="my-auto">
				{icon}
			</button>
		</pre>
	);
}
