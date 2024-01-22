import { createServer } from "./server.mjs";

const server = createServer();

try {
  const address = await server.listen({ host: "0.0.0.0", port: 80 });
  console.log(`Server started on ${address}`);
} catch (err) {
  console.log(err);
  process.exit(1);
}
