import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
	children: React.ReactNode;
	variant?: 'default' | 'contained' | 'disabled';
}

const Button = ({ children, variant = 'default' }: Props) => {
	const commonStyle =
		'flex flex-1 gap-S-6 py-S-8 px-S-16 justify-center items-center rounded-lg Title-Small';

	const variantStyle = {
		default: 'border border-solid border-Green-500 text-Green-500 ',
		contained: 'bg-Green-500 text-white',
		disabled: 'bg-Gray-200 text-white',
	};

	return (
		<button className={cn(commonStyle, variantStyle[variant])}>
			{children}
		</button>
	);
};

export default Button;
