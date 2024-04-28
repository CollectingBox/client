import RoadView1Icon from '@/public/icons/roadview1.svg';
import Direction1 from '../icons/Direction1';
import Copy from '@/components/Copy';
import { ICollectionDetail } from '@/types/collection';
import Tag from '../Tag';
import Button from '../Button';

interface Props {
	collectionDetail: ICollectionDetail;
}

export default function BoxInformation({
	collectionDetail: { tag, location, roadName, streetNumber, modifiedDate },
}: Props) {
	return (
		<section className="flex w-full flex-col bg-white px-S-28 pb-S-32 pt-S-12 xl:rounded-none">
			<div className="flex flex-col gap-S-20">
				<div className="flex flex-col gap-S-24">
					<header>
						<Tag text={tag} colored />
					</header>
					<div className="flex flex-col gap-S-12">
						<h2 className="text-Gray-900 Title-Large">{location}</h2>
						<div className="flex flex-col gap-S-8">
							<span className="flex gap-S-4">
								<h3 className="text-Gray-700 Body-Large">{roadName}</h3>
								<Copy text={roadName || ''} />
							</span>
							<span className="flex gap-S-6">
								<div className="flex h-S-20 w-[30px] items-center justify-center rounded-[4px] bg-Gray-100 px-S-6 py-S-2 text-Gray-500 Label-Small">
									지번
								</div>
								<h3 className="flex items-center text-Gray-500 Label-Medium">
									{streetNumber}
								</h3>
							</span>
						</div>
					</div>
					<div className="flex justify-between gap-[10px]">
						<Button>
							<RoadView1Icon />
							로드뷰
						</Button>
						<Button variant="contained">
							<Direction1 className="white" />
							길찾기
						</Button>
					</div>
				</div>
				<span className="text-Gray-300 Label-Small">
					마지막 업데이트 {modifiedDate}
				</span>
			</div>
		</section>
	);
}
