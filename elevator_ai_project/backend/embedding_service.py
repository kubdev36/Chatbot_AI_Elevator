import json
import numpy as np
from sentence_transformers import SentenceTransformer

# Load model 1 lan duy nhat
model = SentenceTransformer("all-MiniLM-L6-v2")

def embed_text(text: str) -> np.ndarray:
    return model.encode(text, normalize_embeddings=True)

def embed_to_json(text: str) -> str:
    vec = embed_text(text)
    return json.dumps(vec.tolist())

def json_to_vec(emb_json: str) -> np.ndarray:
    return np.array(json.loads(emb_json))

