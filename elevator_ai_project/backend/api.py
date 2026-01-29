from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# ===== Schema =====
class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str

# ===== Test root =====
@app.get("/")
def root():
    return {"status": "API is running"}

# ===== Chat API =====
@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    print("Question received:", req.question)

    # test đơn giản trước
    return {"answer": f"Bạn vừa hỏi: {req.question}"}


