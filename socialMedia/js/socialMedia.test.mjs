import assert from 'node:assert/strict';
import { test, mock } from 'node:test';
import { httpClient } from './httpClient.mjs';
import { socialMedia } from './socialMedia.mjs';

test("fetch social media post", async () => {
    const fakePost = { id: 123, userId: 1, title: "Fake post", body: "Fake body" };
    mock.method(httpClient, "get", () => fakePost);

    const post = await socialMedia.getPost(123);

    assert.equal(httpClient.get.mock.calls[0].arguments[0], "https://jsonplaceholder.typicode.com/posts/123")
    assert.equal(post.userId, 1);
    assert.equal(post.title, "Fake post");
    assert.equal(post.body, "Fake body");
});