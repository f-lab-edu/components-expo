import { http, HttpResponse } from 'msw';

type UpdateRequest = {
  id: string;
};

export const handlers = [
  http.get('/api/lodgings', async ({ request }) => {
    const offset = parseInt(request.url.split('?offset=')[1]);
    console.log('OFFSET: ', offset);
    const start = offset;
    const end = offset + 10;
    const data = (await import('@/mocks/lodgings.json')).default.slice(start, end);

    return HttpResponse.json({
      data,
      statusCode: 200,
      message: 'success',
      hasNext: offset < 10 ? true : false,
      nextOffset: offset < 10 ? offset + 10 : undefined,
    });
  }),

  http.put('/api/lodgings', async ({ request }) => {
    let mockLodgings = await import('@/mocks/lodgings.json').then((m) => m.default);

    const body = await request.json();
    const id = (body as UpdateRequest).id;

    mockLodgings = mockLodgings.map((item) =>
      item.id === id ? { ...item, isLiked: !item.isLiked } : item
    );

    return HttpResponse.json({ data: mockLodgings, statusCode: 200, message: 'success' });
  }),

  http.get('/api/movies', async () => {
    const data = (await import('@/mocks/movies.json')).default;
    console.log('[MSW]: ', data);

    return HttpResponse.json(data);
  }),
];
