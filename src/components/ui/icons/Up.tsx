interface Props {
	w?: number;
	h?: number;
	color?: string;
}

const Up = ({ w, h, color }: Props) => {
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
				d="M20.4983 17.0606C20.1887 17.3357 19.7146 17.3079 19.4394 16.9983L12 8.6289L4.56055 16.9983C4.28536 17.3079 3.81131 17.3357 3.50172 17.0606C3.19213 16.7854 3.16425 16.3113 3.43943 16.0017L11.4394 7.00173C11.5818 6.84161 11.7858 6.75 12 6.75C12.2142 6.75 12.4182 6.84161 12.5605 7.00173L20.5605 16.0017C20.8357 16.3113 20.8079 16.7854 20.4983 17.0606Z"
				fill={color ? color : '#625F5D'}
			/>
		</svg>
	);
};

export default Up;
