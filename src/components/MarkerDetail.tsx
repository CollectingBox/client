'use client';
import React, { useEffect, useState } from 'react';
import { getCollectionDetail } from 'service/collection';
import { ICollectionDetail } from 'types/collection';

const MarkerDetail = ({ collectionId }: { collectionId: number }) => {
	const [detail, setDetail] = useState<ICollectionDetail>();
	useEffect(() => {
		getCollectionDetail(collectionId).then(setDetail);
	}, []);

	return (
		<div className="flex flex-col gap-3 p-[20px] bg-white min-w-[300px] border-2 border-[#ECE9E5] rounded-lg">
			<p className="text-[#43413E] text-[20px]">{detail?.roadName}</p>
			<p className="flex items-center gap-2 text-[#817E7B]">
				<div className="px-3 py-1 rounded-md bg-[#ECE9E5]">지번</div>
				{detail?.streetNumber}
			</p>
			<p className="text-[#BFBBB7] text-[14px]">
				마지막 업데이트: {detail?.modifiedDate}
			</p>
			<div className="flex justify-between gap-3 font-semibold">
				<button className="p-2 border-[1px] border-[#45995E] rounded-lg text-[#45995E] flex-1">
					X 로드뷰
				</button>
				<button className="p-2 bg-[#45995E] rounded-lg text-white flex-1">
					X 길찾기
				</button>
			</div>
		</div>
	);
};

export default MarkerDetail;
