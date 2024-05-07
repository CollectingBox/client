'use client';
import { useContext } from 'react';
import { AnimationControls, PanInfo, motion } from 'framer-motion';
import './styles.css';
import BoxInformation from '../ui/sidebars/BoxInformation';
import VisitRecord from '../ui/sidebars/VisitRecord';
import DiscardMethod from '../ui/sidebars/DiscardMethod';
import { MapDataContext } from '../contexts/MapDataProvider';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCollectionDetail } from '@/service/collection';

export default function BottomSheet({
	controls,
}: {
	controls: AnimationControls;
}) {
	const { collectionId } = useContext(MapDataContext);

	const { data: collectionDetailDTO, isError } = useQuery({
		queryKey: ['collectionDetail', collectionId],
		queryFn: () => getCollectionDetail(collectionId!), //TODO: type assertion 없이 타입에러 내지 않을 방법 필요
		enabled: !!collectionId,
		placeholderData: keepPreviousData,
	});

	function onDragEnd(event: MouseEvent, info: PanInfo) {
		const shouldPull = info.velocity.y < 0;
		if (shouldPull) {
			controls.start('full');
		} else {
			controls.start('half');
		}
	}

	return (
		<motion.div
			drag="y"
			onDragEnd={onDragEnd}
			initial="closed"
			animate={controls}
			transition={{
				type: 'spring',
				damping: 40,
				stiffness: 400,
			}}
			variants={{
				full: { y: '10%' },
				half: { y: '250px' },
				closed: { y: '100%' },
			}}
			dragConstraints={{ top: 0 }}
			dragElastic={0}
			style={{
				position: 'fixed',
				bottom: 0,
				display: 'inline-block',
				backgroundColor: 'white',
				width: '100%',
				height: 520,
				border: '1px solid #E0E0E0',
				boxShadow:
					'0px 2px 5px rgba(0, 0, 0, 0.06), 0px 2px 13px rgba(0, 0, 0, 0.12)',
				borderRadius: '30px 30px 0px 0px',
				overflow: 'hidden',
				zIndex: 5,
			}}
		>
			<div className="DragHandleEdge">
				<div className="DragHandle" />
			</div>
			{collectionDetailDTO?.data && (
				<div className="h-[480px] overflow-y-scroll pt-6 scrollbar-hide">
					<BoxInformation collectionDetail={collectionDetailDTO?.data} />
					<VisitRecord reviews={collectionDetailDTO?.data.reviews} />
					{collectionDetailDTO?.data.tag !== '쓰레기통' && (
						<DiscardMethod tag={collectionDetailDTO?.data.tag} />
					)}
				</div>
			)}
		</motion.div>
	);
}
