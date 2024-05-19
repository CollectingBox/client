import * as React from 'react';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/shadcn-ui/select';
import Tag from './Tag';
import { VisitHistoryType } from '@/types/collection';

interface Props {
	handleSelectOption: (value: VisitHistoryType) => void;
}

export function SelectVisitHistory({ handleSelectOption }: Props) {
	const [isOpen, setIsOpen] = React.useState(false);
	console.log(isOpen);
	const handleChangeIsOpen = (isOpen: boolean) => {
		setIsOpen(isOpen);
	};
	return (
		<Select
			onValueChange={handleSelectOption}
			onOpenChange={handleChangeIsOpen}
		>
			<SelectTrigger
				className={`h-S-56 w-full ${isOpen ? 'mb-16' : 'mb-0'} focus:border-Green-400`}
			>
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
