import { IReview } from '@/types/collection';
import Tag from '../Tag';

export default function VisitMessage({ content, createdDate }: IReview) {
	return (
		<div className="flex gap-S-8 items-end">
			<Tag text={content} size="L" />
			<span className="Label-Small text-Gray-300">{createdDate}</span>
		</div>
	);
}
