from config.db_config import get_db
from backend.employee_service import find_employee
from backend.ollama_service import ollama_answer

def get_chatbot_response(question: str):
    question_clean = question.strip().lower()

    # =============================
    # 1️1TRA CỨU NHÂN VIÊN
    # =============================
    emp = find_employee(question.strip())
    if emp:
        return (
            f"Ma NV: {emp['employee_code']}\n"
            f"Ho ten: {emp['full_name']}\n"
            f"Nam sinh: {emp['birth_year']}\n"
            f"Chuc vu: {emp['position']}\n"
            f"Phong ban: {emp['department']}\n"
            f"Que quan: {emp['hometown']}\n"
            f"So dien thoai: {emp['phone']}\n"
            f"Email: {emp['email']}"
        )

    # =============================
    # 2️2CHATBOT DỰA MYSQL
    # =============================
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT i.intent_name, a.answer_text
        FROM prompts p
        JOIN intents i ON p.intent_id = i.intent_id
        JOIN answers a ON i.intent_id = a.intent_id
        WHERE %s LIKE CONCAT('%', p.prompt_text, '%')
        LIMIT 1
    """, (question_clean,))

    row = cursor.fetchone()
    if row:
        return row["answer_text"]

    # =============================
    # 3️3FALLBACK → OLLAMA (LLM)
    # =============================
    return ollama_answer(question)

