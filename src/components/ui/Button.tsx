import { cn } from '@/lib/utils';
import React, { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: 'default' | 'contained' | 'disabled';
}

const Button = ({ children, variant = 'default', ...props }: Props) => {
	const commonStyle =
		'flex w-full gap-S-6 py-S-12 px-S-16 justify-center items-center rounded-lg Title-Small';

	const variantStyle = {
		default: 'border border-solid border-Green-500 text-Green-500 ',
		contained: 'bg-Green-500 text-white',
		disabled: 'bg-Gray-200 text-white',
	};

	return (
		<button {...props} className={cn(commonStyle, variantStyle[variant])}>
			{children}
		</button>
	);
};

export default Button;
