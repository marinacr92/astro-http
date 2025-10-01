import type { APIRoute } from 'astro';
import { Clients, db, eq } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const { clientId } = params;
  const responde = { method: 'GET', clientId: clientId };
  return new Response(JSON.stringify(responde), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId ?? '';

  try {
    const { id, ...body } = await request.json(); // Para asegurar que no se guarde el id si se manda por el body, desestructurar y no mandar el id

    const results = await db
      .update(Clients)
      .set(body)
      .where(eq(Clients.id, +clientId));

    const updatedClient = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, +clientId));

    return new Response(JSON.stringify(updatedClient.at(0)), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ msg: 'No body found' }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId ?? '';

  const { rowsAffected } = await db
    .delete(Clients)
    .where(eq(Clients.id, +clientId));

  if (rowsAffected > 0) {
    return new Response(
      JSON.stringify({
        msg: 'Deleted',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return new Response(
    JSON.stringify({
      msg: `Client with id ${clientId} not found`,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
