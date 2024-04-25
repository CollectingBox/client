import PinMarker from '@/public/icons/complete-marker.svg';

interface Props {
	address: string;
}

const AutoCompleteItem = ({ address }: Props) => {
	return (
		<div className="flex gap-S-8">
			<PinMarker />
			<p className="flex-1 text-Gray-400 Body-Large">{address}</p>
		</div>
	);
};

export default AutoCompleteItem;
