import { methodTypes } from '@/utils/methodTypes';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../shadcn-ui/accordion';

interface Props {
	tag: string;
}

export default function DiscardMethod({ tag }: Props) {
	const DM = methodTypes.filter((item) => item.tag === tag)[0].methods;
	return (
		<section className="flex flex-col gap-S-20 bg-white p-S-24">
			<h5 className="text-Gray-700 Title-Small">배출 방법</h5>
			<Accordion className="flex flex-col gap-4" type="single" collapsible>
				{DM.map((method, index) => (
					<AccordionItem
						key={method.title}
						className="rounded-[8px] bg-Green-50  px-S-12"
						value={`item-${index}`}
					>
						<AccordionTrigger className="text-Green-500 Title-Small">
							{method.title}
						</AccordionTrigger>
						<AccordionContent className="text-Gray-600">
							{method.descriptions.map((content, index) => (
								<p
									key={`description-${index}`}
									className="text-Gray-600 Label-Large-Custom"
								>
									{content}
								</p>
							))}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}
