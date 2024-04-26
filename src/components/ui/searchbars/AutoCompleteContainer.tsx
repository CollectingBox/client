import AutoCompleteItem from './AutoCompleteItem';

interface Props {
	items: string[];
	setValue: React.Dispatch<React.SetStateAction<string>>;
	handleSearch: (value: string) => void;
}

const AutoCompleteContainer = ({ items, setValue, handleSearch }: Props) => {
	return (
		<div className="absolute top-[38px] w-full flex flex-col py-S-20 bg-white rounded-b-[16px]">
			{items.map((address, index) => (
				<AutoCompleteItem
					key={index}
					address={address}
					setValue={setValue}
					handleSearch={handleSearch}
				/>
			))}
		</div>
	);
};

export default AutoCompleteContainer;
