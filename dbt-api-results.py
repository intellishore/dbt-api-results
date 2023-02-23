import requests
import json
import os 

TOKEN = os.getenv("DBT_TOKEN")

BASE_URL = "https://cloud.getdbt.com/api/v2"

HEADERS = {
            "Content-Type": "application/json",
            "Authorization": f"Token {TOKEN}"
            }

ACCOUNT_NAME = "Intellishore"

PARAMETERS = {
    "order_by": "-id",
    "limit": 1
    }


def get_account_id(account_name: str) -> int:

    response = requests.get(url=f"{BASE_URL}/accounts/", headers=HEADERS)

    for account in response.json()["data"]:
        if account["name"] == account_name:
            account_id = account["id"]

    account_id = response.json()["data"][1]["id"]

    return account_id


def get_runs(account_id: int) -> dict:
    response = requests.get(url=f"{BASE_URL}/accounts/{account_id}/runs/", headers=HEADERS, params=PARAMETERS)
    runs = response.json()


    return runs

def get_run_id(runs: dict) -> int:

    run_id = runs["data"][0]["id"]

    return run_id

def save_artifact(arifact_type: str, artifact: dict) -> None:
    json_object = json.dumps(artifact, indent=4)
    with open(arifact_type, "w") as outfile:
        outfile.write(json_object)


def get_artifact(account_id: int, run_id: int, artifact_type: str) -> dict:

    response = requests.get(url=f"{BASE_URL}/accounts/{account_id}/runs/{run_id}/artifacts/{artifact_type}", headers=HEADERS, params=PARAMETERS)
    if response.status_code == 404:
        print(f"{artifact_type} is not found or generated")
    else:
        artifact = response.json()
        save_artifact(artifact_type, artifact) 
        print(f'loadet {artifact_type}')


if __name__ == "__main__":
    account_id = get_account_id(ACCOUNT_NAME)
    runs = get_runs(account_id)
    run_id = get_run_id(runs)

    artifact_types = ["manifest.json", "catalog.json", "run_results.json"]

    for artifact_type in artifact_types:
        artifact = get_artifact(account_id, run_id, artifact_type)