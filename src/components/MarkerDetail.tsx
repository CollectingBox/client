'use client';
import React, { useEffect, useState } from 'react';
import { getCollectionDetail } from '@/service/collection';
import { ICollectionDetail } from '@/types/collection';

const MarkerDetail = ({ collectionId }: { collectionId: number }) => {
	const [detail, setDetail] = useState<ICollectionDetail>();

	useEffect(() => {
		getCollectionDetail(collectionId).then(setDetail);
	}, []);

	return (
		<div className="absolute top-[-160px] left-[-70px] flex flex-col gap-3 p-[20px] bg-white min-w-[300px] border-2 border-[#ECE9E5] rounded-lg">
			<p className="text-Gray-700 text-[20px]">{detail?.roadName}</p>
			<p className="flex items-center gap-2 text-Gray-500">
				<div className="px-3 py-1 rounded-md bg-Gray-100">지번</div>
				{detail?.streetNumber}
			</p>
			<p className="text-Gray-300 text-[14px]">
				마지막 업데이트: {detail?.modifiedDate}
			</p>
			<div className="flex justify-between gap-3 font-semibold">
				<button className="p-2 border-[1px] border-Green-500 rounded-lg text-Green-500 flex-1">
					X 로드뷰
				</button>
				<button className="p-2 bg-Green-500 rounded-lg text-white flex-1">
					X 길찾기
				</button>
			</div>
		</div>
	);
};

export default MarkerDetail;
