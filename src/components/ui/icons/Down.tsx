interface Props {
	w?: number;
	h?: number;
	color?: string;
}

const Down = ({ w, h, color }: Props) => {
	return (
		<svg
			width={w ? w : '24'}
			height={h ? h : '24'}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M3.50173 6.93944C3.81132 6.66425 4.28538 6.69214 4.56056 7.00173L12 15.3711L19.4395 7.00173C19.7146 6.69214 20.1887 6.66425 20.4983 6.93944C20.8079 7.21463 20.8358 7.68868 20.5606 7.99827L12.5606 16.9983C12.4182 17.1584 12.2142 17.25 12 17.25C11.7858 17.25 11.5818 17.1584 11.4395 16.9983L3.43945 7.99827C3.16426 7.68869 3.19215 7.21463 3.50173 6.93944Z"
				fill={color ? color : '#625F5D'}
			/>
		</svg>
	);
};

export default Down;
