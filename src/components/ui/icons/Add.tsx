interface Props {
	color: string;
	w: number;
	h: number;
}

const Add = ({ color, w, h }: Props) => {
	return (
		<svg
			width={w}
			height={h}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H12.75V21C12.75 21.4142 12.4142 21.75 12 21.75C11.5858 21.75 11.25 21.4142 11.25 21V12.75H3C2.58579 12.75 2.25 12.4142 2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H11.25V3C11.25 2.58579 11.5858 2.25 12 2.25Z"
				fill={color}
			/>
		</svg>
	);
};

export default Add;