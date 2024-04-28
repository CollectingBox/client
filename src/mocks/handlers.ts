import { ICollection, ICollectionDetail } from '@/types/collection';
import { http, HttpResponse } from 'msw';

export const COLLECTION_MOCK: ICollection[] = [
	{
		id: 1,
		latitude: 37.4975,
		longitude: 127.03,
		tag: '폐건전지',
	},
	{
		id: 2,
		latitude: 37.4985,
		longitude: 127.026,
		tag: '폐의류',
	},
	{
		id: 3,
		latitude: 37.4995,
		longitude: 127.028,
		tag: '폐형광등',
	},
	{
		id: 4,
		latitude: 37.5,
		longitude: 127.03,
		tag: '폐의약품',
	},
	{
		id: 5,
		latitude: 37.4975,
		longitude: 127.027,
		tag: '쓰레기통',
	},
];

export const COLLECTION_DETAILS_MOCK: ICollectionDetail[] = [
	{
		location: '서울숲',
		roadName: '서울특별시 성동구 뚝섬로 273',
		streetNumber: '서울특별시 성동구 성수동1가 685-20',
		modifiedDate: '2023-12-28',
		tag: '폐건전지',
		reviews: [
			{
				content: 'EXIST',
				createdDate: '24.04.17',
			},
		],
	},
	{
		location: '이마트24',
		roadName: '서울특별시 강남구 도산대로66길 43',
		streetNumber: '서울특별시 강남구 청담동 16-19',
		modifiedDate: '2024-04-17',
		tag: '폐의류',
		reviews: [
			{
				content: 'EXIST',
				createdDate: '24.04.17',
			},
		],
	},
	{
		location: '버거킹 앞',
		roadName: '서울 강남구 강남대로 406 GLASS TOWER',
		streetNumber: '서울특별시 강남구 역삼동 820-9 GLASS TOWER',
		modifiedDate: '2022-01-27',
		tag: '폐형광등',
		reviews: [
			{
				content: 'EXIST',
				createdDate: '24.04.17',
			},
		],
	},
	{
		location: '하이디라오',
		roadName: '서울 강남구 학동로 33길',
		streetNumber: '서울특별시 강남구 논현동 수산타워',
		modifiedDate: '2022-01-27',
		tag: '폐의약품',
		reviews: [
			{
				content: '가봤는데 없어요',
				createdDate: '24.04.20',
			},
		],
	},
	{
		location: '스타벅스 앞 수거함',
		roadName: '서울 강남구 강남대로 18길 11',
		streetNumber: '서울특별시 강남구 역삼동 1542',
		modifiedDate: '2022-01-27',
		tag: '쓰레기통',
		reviews: [
			{
				content: '이용했어요',
				createdDate: '24.04.19',
			},
		],
	},
];

export const handlers = [
	http.get('/api/collections', () => {
		return HttpResponse.json(COLLECTION_MOCK);
	}),
	http.get('/api/collections/:id', ({ params }) => {
		const { id } = params;
		return HttpResponse.json(COLLECTION_DETAILS_MOCK[Number(id) - 1]);
	}),
];
