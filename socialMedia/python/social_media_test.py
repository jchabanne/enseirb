import unittest
from unittest.mock import patch
import http_client
import social_media

class SocialMediaTest(unittest.TestCase):
    def test_fetch_social_media_post(self):
        fake_post = { "id": 123, "user_id": 1, "title": "fake post", "body": "fake body"}

        with patch.object(http_client, "get", return_value=fake_post) as get:
            post = social_media.getPost(123)

        get.assert_called_once_with("https://jsonplaceholder.typicode.com/posts/123")
        self.assertEqual(post["user_id"], 1)
        self.assertEqual(post["title"], "fake post")
        self.assertEqual(post["body"], "fake body")

if __name__ == "__main__":
    unittest.main()