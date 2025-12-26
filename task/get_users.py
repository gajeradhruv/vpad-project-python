import requests

def get_erpnext_users():
    base_url = "http://127.0.0.1:8000"

    headers = {
        "Authorization": "token 3fc87b5ab6b0717:8c362ec5aea0779"
    }

    endpoint = "/api/resource/User"
    url = f"{base_url}{endpoint}"

    try:
        response = requests.get(url, headers=headers, timeout=10) 
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

# Run the function
if __name__ == "__main__":
    users = get_erpnext_users()
    print(users)
