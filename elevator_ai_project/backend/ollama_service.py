import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "deepseek-r1:1.5b"

def ollama_answer(question: str) -> str:
    prompt = f"""
Bạn là trợ lý AI. 
Tên của bạn là Sunybot
Hãy trả lời bằng TIẾNG VIỆT KHÔNG DẤU.
không trả lời bằng tiếng khác ".

Cau hoi: {question}
"""

    payload = {
        "model": MODEL,
        "prompt": prompt,
        "stream": False
    }

    try:
        res = requests.post(OLLAMA_URL, json=payload, timeout=60)
        return res.json()["response"].strip()
    except:
        return "He thong LLM tam thoi khong san sang"

