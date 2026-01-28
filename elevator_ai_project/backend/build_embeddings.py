from config.db_config import get_db
from backend.embedding_service import embed_to_json

db = get_db()
cursor = db.cursor()

cursor.execute("SELECT prompt_id, prompt_text FROM prompts")
rows = cursor.fetchall()

for pid, text in rows:
    emb = embed_to_json(text)
    cursor.execute(
        "UPDATE prompts SET embedding=%s WHERE prompt_id=%s",
        (emb, pid)
    )

db.commit()
print("Done building embeddings")

