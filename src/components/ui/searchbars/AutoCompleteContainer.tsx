import AutoCompleteItem from './AutoCompleteItem';

interface Props {
	items: string[];
}

const AutoCompleteContainer = ({ items }: Props) => {
	return (
		<div className="absolute top-[38px] w-full flex flex-col py-S-20 px-S-16 gap-S-12 bg-white rounded-b-[16px]">
			{items.map((address, index) => (
				<AutoCompleteItem key={index} address={address} />
			))}
		</div>
	);
};

export default AutoCompleteContainer;
