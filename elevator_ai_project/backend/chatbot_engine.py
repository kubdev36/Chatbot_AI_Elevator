from backend.employee_service import find_employee
from backend.semantic_matcher import find_best_intent_semantic
from backend.ollama_service import ollama_answer


def get_chatbot_response(question: str):
    q = question.strip()

    # 1️⃣ TRA CỨU NHÂN VIÊN
    emp = find_employee(q)
    if emp:
        return (
            f"Ma NV: {emp['employee_code']}\n"
            f"Ho ten: {emp['full_name']}\n"
            f"Nam sinh: {emp['birth_year']}\n"
            f"Chuc vu: {emp['position']}\n"
            f"Phong ban: {emp['department']}\n"
            f"Que quan: {emp['hometown']}\n"
            f"SDT: {emp['phone']}\n"
            f"Email: {emp['email']}"
        )

    # 2️⃣ EMBEDDING
    answer, score = find_best_intent_semantic(q)
    if answer and score > 0.6:
        return answer

    # 3️⃣ FALLBACK LLM
    return ollama_answer(q)


