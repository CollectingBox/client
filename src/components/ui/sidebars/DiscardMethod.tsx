import { useState } from 'react';
import Down from '../icons/Down';
import Up from '../icons/Up';
import { methodTypes } from '@/utils/methodTypes';

interface Props {
	tag: string;
}

export default function DiscardMethod({ tag }: Props) {
	const DM = methodTypes.filter((item) => item.tag === tag)[0].methods;
	const [openIndex, SetOpenIndex] = useState(-1);
	return (
		<section className="flex flex-col gap-S-20 p-S-24 bg-white">
			<h5 className="Title-Small text-Gray-700">배출 방법</h5>
			<div className="flex flex-col gap-S-14">
				{DM.map((method, index) => (
					<div
						key={index}
						className="flex flex-col gap-S-16 p-S-16 bg-Green-50 rounded-[8px]"
					>
						<div className="flex justify-between">
							<p className="text-Green-500 Title-Small">{method.title}</p>
							{openIndex !== index ? (
								<span onClick={() => SetOpenIndex(index)}>
									<Down color="#45995E" />
								</span>
							) : (
								<span onClick={() => SetOpenIndex(-1)}>
									<Up color="#45995E" />
								</span>
							)}
						</div>
						{openIndex === index && (
							<div className="bg-transparent">
								{method.descriptions.map((content, index) => (
									<p
										key={`description-${index}`}
										className="text-Gray-600 Label-Large leading-[26px]"
									>
										{content}
									</p>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</section>
	);
}
