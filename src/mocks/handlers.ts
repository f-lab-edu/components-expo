import { http } from 'msw';

export const handlers = [
  http.get('/api/user', ({ request }) => {
    console.log('[MSW] Req: ', request);
    return new Response();
  }),
];
