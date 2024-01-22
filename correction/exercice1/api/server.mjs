import Fastify from "fastify";

export function createServer() {
  const fastify = Fastify();

  fastify.get("/feature/:code", async function handler(request, reply) {
    const { code } = request.params;
    return reply.send({ code, enabled: true });
  });

  return fastify;
}
