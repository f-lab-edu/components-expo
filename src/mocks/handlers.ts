import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/lodgings', async () => {
    const data = (await import('@/mocks/lodgings.json')).default;
    console.log('[MSW]: ', data);

    return HttpResponse.json({ data, statusCode: 200, message: 'success' });
  }),

  http.get('/api/movies', async () => {
    const data = (await import('@/mocks/movies.json')).default;
    console.log('[MSW]: ', data);

    return HttpResponse.json(data);
  }),
];
