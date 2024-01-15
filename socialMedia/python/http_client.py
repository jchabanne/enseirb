import urllib.request
import json

def get(url):
    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            print("Status Code:", response.status)
            body = response.read().decode("utf-8")
            return json.loads(body)
    except Exception as e:
        print(e)
