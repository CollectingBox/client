import Alert from '../icons/Alert';

interface Props {
	title: string;
	description: string;
	className?: string;
}

export default function ToastError({ title, description, className }: Props) {
	return (
		<div
			className={`${className ? className : ''} fixed bottom-[50px] max-w-[400px] xl:bottom-[S-24] left-S-12 xl:left-[110px] w-[95dvw] xl:w-[360px] flex gap-S-8 px-S-20 py-S-12 z-50 rounded-lg bg-[#92908e] opacity-70 Elevation-2-Bottom`}
		>
			<Alert color="white" />
			<div className="flex flex-col gap-S-4">
				<p className="Title-Small text-white">{title}</p>
				<p className="Label-Large text-white">{description}</p>
			</div>
		</div>
	);
}
