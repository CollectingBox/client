import VisitMessage from './VisitMessage';
import Down from '../icons/Down';
import Add from '../icons/Add';

interface IMessage {
	content: string;
	date: string;
}

const messages: IMessage[] = [
	{ content: '수거함이 사라졌어요 😢', date: '24.4.13' },
	{ content: '수거함이 사라졌어요 😢', date: '24.8.23' },
];

export default function VisitRecord() {
	return (
		<section className="flex flex-col gap-S-20 p-S-28 bg-white">
			<div className="flex gap-[10px] justify-between">
				<h5 className="flex-1 text-Gray-700 Title-Small">방문 기록</h5>
				<div className="flex items-center gap-S-6">
					<div className="flex justify-center items-center w-[18px] h-[18px] rounded-full bg-Green-500">
						<Add color={'white'} w={12} h={12} />
					</div>
					<p className="text-Green-500 Body-Small">기록 남기기</p>
				</div>
			</div>
			<div className="flex flex-col gap-S-16">
				{messages.length > 0 && (
					<>
						{messages.map((message, index) => (
							<VisitMessage
								key={index}
								content={message.content}
								date={message.date}
							/>
						))}
						<div className="flex justify-center items-center gap-S-4 Label-Medium h-S-16 text-Gray-500">
							더보기
							<Down w={14} h={14} />
						</div>
					</>
				)}
				{messages.length === 0 && (
					<div className="flex flex-col items-center gap-S-8 pb-S-2">
						<p className="text-Gray-400 Title-Small">방문 기록이 없어요</p>
						<p className="text-Gray-400 Label-Large">
							수거함을 이용했다면 방문 기록을 남겨보세요
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
