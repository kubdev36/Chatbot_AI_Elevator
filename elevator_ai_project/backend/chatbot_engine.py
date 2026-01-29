from backend.employee_service import find_employee
from backend.semantic_matcher import find_best_intent_semantic
from backend.ollama_service import ollama_answer


def chatbot_reply(question: str):
    q = question.strip()

    # 1. Tra nhan vien
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

    # 2. Embedding + cosine similarity
    answer, score = find_best_intent_semantic(q)
    if answer and score > 0.6:
        return answer

    # 3. LLM fallback (Ollama DeepSeek)
    return ollama_answer(q)

