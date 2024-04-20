import React from 'react';

interface Props {
	text: string;
	colored?: boolean;
	size?: 'S' | 'L';
}

const Tag = ({ text, colored, size = 'S' }: Props) => {
	return (
		<p
			className={`inline-block ${size === 'S' ? 'py-S-4 px-S-8 Label-Medium' : 'py-S-6 px-S-12 Label-large'} rounded-[4px] ${colored ? 'text-Green-500 bg-Green-50' : 'text-Gray-600 bg-Gray-100'} `}
		>
			{text}
		</p>
	);
};

export default Tag;
