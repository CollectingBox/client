import { http, HttpResponse } from 'msw';

const COLLECTIONS_MOCK = [
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
];

export const handlers = [
	http.get('/api/collections', () => {
		return HttpResponse.json([
			{
				id: 1,
				latitude: 37.4975,
				longitude: 127.03,
				tag: '폐의류',
			},
			{
				id: 2,
				latitude: 37.4985,
				longitude: 127.026,
				tag: '폐형광등',
			},
			{
				id: 3,
				latitude: 37.4995,
				longitude: 127.028,
				tag: '폐의약품',
			},
		]);
	}),
	http.get('/api/collections/:id', ({ params }) => {
		const { id } = params;
		console.log(params);
		return HttpResponse.json(COLLECTIONS_MOCK[Number(id) - 1]);
	}),
];
