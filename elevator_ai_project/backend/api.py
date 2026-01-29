from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from backend.schemas import ChatRequest, ChatResponse
from backend.chatbot_engine import get_chatbot_response

app = FastAPI(title="Elevator AI Chatbot")

# ===============================
# CORS (cho Web UI gọi API)
# ===============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# PATH ABSOLUTE (RẤT QUAN TRỌNG)
# ===============================
BASE_DIR = Path(__file__).resolve().parent.parent
WEB_DIR = BASE_DIR / "gui" / "web"

# ===============================
# STATIC FILES
# ===============================
app.mount(
    "/static",
    StaticFiles(directory=WEB_DIR / "static"),
    name="static"
)

# ===============================
# HOME PAGE (CHAT UI)
# ===============================
@app.get("/", response_class=HTMLResponse)
def home():
    html_path = WEB_DIR / "templates" / "chat.html"
    return html_path.read_text(encoding="utf-8")

# ===============================
# CHAT API
# ===============================
@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    answer = get_chatbot_response(req.question)
    return ChatResponse(answer=answer)

