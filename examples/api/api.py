def getJoke():
    import requests
    response = requests.get("https://v2.jokeapi.dev/joke/Any")
    return response.json()
