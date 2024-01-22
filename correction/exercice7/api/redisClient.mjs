import { createClient } from "redis";

const client = await createClient({ url: process.env.REDIS_URL })
  .on("error", (error) => console.log(error))
  .connect();

export async function getKey(key) {
  return await client.get(key);
}
