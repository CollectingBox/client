'use client';
import { useState } from 'react';
import React from 'react';
import { BsCheckLg } from 'react-icons/bs';
import CopyIcon from '@/public/icons/copy.svg';

const CheckIcon = () => <BsCheckLg />;

export default function Copy({ text }: { text: string }) {
	const [icon, setIcon] = useState(CopyIcon);

	const copy = async () => {
		await navigator?.clipboard?.writeText(text);
		setIcon(CheckIcon);
		setTimeout(() => setIcon(CopyIcon), 2000);
	};

	return (
		<pre className="flex items-center">
			<button onClick={copy} className="my-auto">
				{icon}
			</button>
		</pre>
	);
}
