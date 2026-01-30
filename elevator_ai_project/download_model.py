from sentence_transformers import SentenceTransformer
import time

print("Dang ket noi den Hugging Face de tai model (all-MiniLM-L6-v2)...")
model = SentenceTransformer("all-MiniLM-L6-v2")
print("Tai model thanh cong! Ban co the chay build_embeddings ngay bay gio.")