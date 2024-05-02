import { IReview } from '@/types/collection';
import Tag from '../Tag';

export default function VisitMessage({ content, createdDate }: IReview) {
	return (
		<div className="flex items-end gap-S-8">
			<Tag
				text={
					content === 'EXIST' ? '잘 이용했어요 👍' : '수거함이 사라졌어요 😢'
				}
				size="L"
			/>
			<span className="text-Gray-300 Label-Small">{createdDate}</span>
		</div>
	);
}
