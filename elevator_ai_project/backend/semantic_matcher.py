import numpy as np
from backend.embedding_service import embed_text, json_to_vec
from config.db_config import get_db

SIM_THRESHOLD = 0.78

def find_best_intent_semantic(question: str):
    q_vec = embed_text(question)

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT p.embedding, a.answer_text
        FROM prompts p
        JOIN answers a ON p.intent_id = a.intent_id
        WHERE p.embedding IS NOT NULL
    """)

    best_score = 0.0
    best_answer = None

    for row in cursor.fetchall():
        p_vec = json_to_vec(row["embedding"])
        score = float(np.dot(q_vec, p_vec))  # cosine

        if score > best_score:
            best_score = score
            best_answer = row["answer_text"]

    if best_score >= SIM_THRESHOLD:
        return best_answer, best_score

    return None, best_score

