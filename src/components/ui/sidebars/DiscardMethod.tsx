import { useState } from 'react';
import Down from '../icons/Down';
import Up from '../icons/Up';

interface Props {
	tag: string;
}

const methodTypes = [
	{
		tag: '폐의류',
		methods: [
			{
				title: '헌옷은 어떻게 버리나요?',
				descriptions: [
					'의류수거함에 수거된 의류나 신발, 모자는 분류 후 재판매되거나 수출됩니다. 그렇기에 비교적 깨끗하고 다른 사람이 다시 사용할 수 있는 옷만 배출해주세요.',
					'찢어지거나 오염이 심해 다른 사람이 입을 수 없는 상태라면 일반쓰레기로 종량제 봉투에 버려주세요.',
				],
			},
			{
				title: '속옷과 양말도 의류수거함에 버리나요?',
				descriptions: [
					'손상된 부분이 없고, 다른 사람이 입을 수 있는 속옷은 배출할 수 있어요. 그러나 의류수거함에 따라 수거 품목이 조금씩 다르기에 방문한 의류수거함에 적힌 수거 품목을 꼭 확인해주세요. ',
					'간혹 배출된 속옷이나 스타킹 등을 훔쳐 보관하거나 판매하는 경우가 있으니 손으로 꺼낼 수 없을 정도로 깊이 넣어주세요.',
					'양말과 스타킹은 모두 일반쓰레기로 종량제 봉투에 버려야 해요.',
				],
			},
			{
				title: '의류수거함에 버리면 안되는 것이 있나요?',
				descriptions: [
					'베개, 방석은 모두 일반 쓰레기로 종량제 봉투에 버려야 해요. 솜 이불이나 쿨매트나 장판류는 대형 폐기물 스티커를 구매하거나 구청에 사전 신고 후 버려야 하고요.',
					'또한 바퀴 달린 가방이나 신발이나 털 신발, 슬리퍼, 실내화나 고무 재질의 신발도 버릴 수 없어요.',
				],
			},
		],
	},
];

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
