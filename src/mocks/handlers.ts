import { http, HttpResponse } from 'msw';

export const handlers = [
	http.get('/api/collections', () => {
		return HttpResponse.json([
			{
				id: 2,
				latitude: 37.4975,
				longitude: 127.03,
				tag: '폐의류',
			},
			{
				id: 3,
				latitude: 37.4985,
				longitude: 127.026,
				tag: '폐형광등',
			},
			{
				id: 4,
				latitude: 37.4995,
				longitude: 127.028,
				tag: '폐의약품',
			},
		]);
	}),
	http.get('/api/collections/:id', ({ params }) => {
		const { id } = params;
		return HttpResponse.json({
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
		});
	}),
];
