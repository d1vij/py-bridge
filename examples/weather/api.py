import requests

def get_weather(city):
    url = f"http://wttr.in/{city}?format=j1"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        temp = data["current_condition"][0]["temp_C"]
        desc = data["current_condition"][0]["weatherDesc"][0]["value"]
        return {"city": city, "temperature": temp, "description": desc}
    else:
        return {"error": "Failed to fetch weather"}