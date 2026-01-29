from fastapi import FastAPI
from pydantic import BaseModel

from backend.chatbot_engine import chatbot_reply
from backend.employee_service import find_employee

app = FastAPI(title="SUNYBOT API")

# --------- DATA MODELS ----------
class ChatRequest(BaseModel):
    message: str

class EmployeeRequest(BaseModel):
    key: str


# --------- ROUTES ----------
@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/chat")
def chat(req: ChatRequest):
    answer = chatbot_reply(req.message)
    return {
        "question": req.message,
        "answer": answer
    }


@app.post("/employee")
def employee(req: EmployeeRequest):
    emp = find_employee(req.key)
    if not emp:
        return {"found": False}

    return {
        "found": True,
        "data": emp
    }

