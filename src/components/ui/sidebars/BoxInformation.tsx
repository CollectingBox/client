import RoadView1Icon from '@/public/icons/roadview1.svg';
import Direction1 from '../icons/Direction1';
import Copy from '@/components/Copy';

export default function BoxInformation() {
	return (
		<section className="flex flex-col w-full px-S-28 pt-S-12 pb-S-32 bg-white xl:rounded-none">
			<div className="flex flex-col gap-S-20">
				<div className="flex flex-col gap-S-24">
					<header>
						<div className="flex justify-center items-center w-S-48 h-S-24 py-S-4 px-S-8 rounded-[4px] Label-Medium text-Green-500 bg-Green-50">
							폐의류
						</div>
					</header>
					<div className="flex flex-col gap-S-12">
						<h2 className="text-Gray-900 Title-Large">
							CU 용산효창공원점 맞은편 수거함
						</h2>
						<div className="flex flex-col gap-S-8">
							<span className="flex gap-S-4">
								<h3 className="text-Gray-700 Body-Large">
									서울 용산구 효창원로66길 18
								</h3>
								<Copy text={'서울 용산구 효창원로66길 18'} />
							</span>
							<span className="flex gap-S-6">
								<div className="flex justify-center items-center w-[30px] h-S-20 py-S-2 px-S-6 rounded-[4px] bg-Gray-100 text-Gray-500 Label-Small">
									지번
								</div>
								<h3 className="flex items-center text-Gray-500 Label-Medium">
									효창동 5-84
								</h3>
							</span>
						</div>
					</div>
					<div className="flex justify-between gap-[10px]">
						<button className="flex flex-1 gap-S-6 py-S-12 px-S-16 justify-center items-center border border-solid border-Green-500 rounded-lg text-Green-500 Title-Small">
							<RoadView1Icon />
							로드뷰
						</button>
						<button className="flex flex-1 gap-S-6 py-S-12 px-S-16 justify-center items-center bg-Green-500 rounded-lg text-white Title-Small">
							<Direction1 className="white" />
							길찾기
						</button>
					</div>
				</div>
				<span className="Label-Small text-Gray-300">
					마지막 업데이트 2024.3.27
				</span>
			</div>
		</section>
	);
}
