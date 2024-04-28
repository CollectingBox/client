import React from 'react';

interface Props {
	text: string;
	colored?: boolean;
	size?: 'S' | 'L';
}

const Tag = ({ text, colored, size = 'S' }: Props) => {
	return (
		<p
			className={`inline-block ${size === 'S' ? 'px-S-8 py-S-4 Label-Medium' : 'Label-large px-S-12 py-S-6'} rounded-[4px] ${colored ? 'bg-Green-50 text-Green-500' : 'bg-Gray-100 text-Gray-600'} `}
		>
			{text}
		</p>
	);
};

export default Tag;
