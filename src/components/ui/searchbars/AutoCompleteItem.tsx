'use client';

import PinMarker from '@/public/icons/complete-marker.svg';

interface Props {
	address: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	handleSearch: (value: string) => void;
	isCurrentIndex: boolean;
}

const AutoCompleteItem = ({
	address,
	setValue,
	handleSearch,
	isCurrentIndex,
}: Props) => {
	const onClick = () => {
		setValue(address);
		handleSearch(address);
		setValue('');
	};
	return (
		<div
			className={`flex gap-S-8 px-S-16 py-S-6 hover:bg-Gray-50 ${isCurrentIndex && 'bg-Gray-50'}`}
			onClick={onClick}
		>
			<PinMarker />
			<p className="flex-1 text-Gray-400 Body-Large">{address}</p>
		</div>
	);
};

export default AutoCompleteItem;
