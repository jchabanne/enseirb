import { httpClient } from "./httpClient.mjs"

const baseUrl = "https://jsonplaceholder.typicode.com"
 
export const socialMedia = {
    async getPost(postId) {
        return await httpClient.get(`${baseUrl}/posts/${postId}`);
    }
}