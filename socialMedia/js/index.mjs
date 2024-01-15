import { socialMedia } from "./socialMedia.mjs";

const post = await socialMedia.getPost(100);
console.log(post);