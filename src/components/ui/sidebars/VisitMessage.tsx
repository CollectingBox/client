import { IReview } from '@/types/collection';

export default function VisitMessage({ content, createdDate }: IReview) {
	return (
		<div className="flex gap-S-8 items-end">
			<div className="flex justify-center items-center p-S-6 bg-Gray-100 rounded-[4px] Label-Large">
				{content}
			</div>
			<span className="Label-Small text-Gray-300">{createdDate}</span>
		</div>
	);
}
