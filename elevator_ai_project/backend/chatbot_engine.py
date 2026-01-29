from backend.employee_service import find_employee
from backend.semantic_matcher import find_best_intent_semantic
from backend.ollama_service import ollama_answer

def get_chatbot_response(question: str) -> str:
    q = question.strip()

    # 1. Truy vấn nhân viên
    emp = find_employee(q)
    if emp:
        return (
            f"Mã NV: {emp['employee_code']}\n"
            f"Họ tên: {emp['full_name']}\n"
            f"Năm sinh: {emp['birth_year']}\n"
            f"Chức vụ: {emp['position']}\n"
            f"Phòng ban: {emp['department']}\n"
            f"Quê quán: {emp['hometown']}\n"
            f"SĐT: {emp['phone']}\n"
            f"Email: {emp['email']}"
        )

    # 2. Semantic / LLM
    answer, score = find_best_intent_semantic(q)
    return answer

