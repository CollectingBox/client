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
			location: null,
			roadName: '서울특별시 성동구 무학로 33',
			streetNumber: '효창동 5-74',
			modifiedDate: '2024-04-14',
			tag: '폐의류',
		});
	}),
];
