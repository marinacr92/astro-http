import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const responde = { method: 'GET' };
  return new Response(JSON.stringify(responde), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST: APIRoute = async ({ params, request }) => {
  const responde = { method: 'POST' };
  return new Response(JSON.stringify(responde), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
