'use client';
import { useState } from 'react';
import React from 'react';
import CopyIcon from '@/public/icons/copy.svg';
import CheckIcon from '@/public/icons/check.svg';
import { useCompleteToastStore } from '@/store/completeToastStore';

export default function Copy({ text }: { text: string }) {
	const [icon, setIcon] = useState(CopyIcon);
	const { setIsComplete, setCompleteContent } = useCompleteToastStore();

	const copy = async () => {
		await navigator?.clipboard?.writeText(text);
		setIcon(CheckIcon);
		setTimeout(() => setIcon(CopyIcon), 2000);
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
