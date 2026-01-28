import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "deepseek-r1:1.5b"

def ollama_answer(question: str) -> str:
    payload = {
        "model": MODEL_NAME,
        "prompt": question,
        "stream": False
    }

    try:
        res = requests.post(OLLAMA_URL, json=payload, timeout=60)
        res.raise_for_status()
        return res.json()["response"].strip()
    except Exception as e:
        return "Xin loi, he thong LLM tam thoi khong san sang."

