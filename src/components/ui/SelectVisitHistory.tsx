import * as React from 'react';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import Tag from './Tag';
import { VisitHistoryType } from '@/types/collection';

interface Props {
	handleSelectOption: (value: VisitHistoryType) => void;
}

export function SelectVisitHistory({ handleSelectOption }: Props) {
	return (
		<Select onValueChange={handleSelectOption}>
			<SelectTrigger className="h-S-56 w-full focus:border-Green-400">
				<SelectValue placeholder="선택" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value="DISAPPEAR">
						<Tag text="수거함이 사라졌어요 😢" />
					</SelectItem>
					<SelectItem value="EXIST">
						<Tag text="잘 이용했어요 👍" />
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
