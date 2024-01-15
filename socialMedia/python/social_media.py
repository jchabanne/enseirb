import http_client

__BASE_URL__ = "https://jsonplaceholder.typicode.com"

def getPost(postId):
    return http_client.get(f'{__BASE_URL__}/posts/{postId}')
