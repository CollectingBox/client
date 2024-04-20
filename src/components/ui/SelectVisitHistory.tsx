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

interface Props {
	handleSelectOption: (value: string) => void;
}

export function SelectVisitHistory({ handleSelectOption }: Props) {
	return (
		<Select onValueChange={handleSelectOption}>
			<SelectTrigger className="w-[280px] focus:border-Green-400">
				<SelectValue placeholder="선택" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value="disappeared">
						<Tag text="수거함이 사라졌어요 😢" />
					</SelectItem>
					<SelectItem value="exist">
						<Tag text="잘 이용했어요 👍" />
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
