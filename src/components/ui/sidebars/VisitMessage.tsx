import { IReview } from '@/types/collection';
import Tag from '../Tag';

export default function VisitMessage({ content, createdDate }: IReview) {
	return (
		<div className="flex items-end gap-S-8">
			<Tag text={content} size="L" />
			<span className="text-Gray-300 Label-Small">{createdDate}</span>
		</div>
	);
}
