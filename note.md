

lệnh rebuild embedding:

```bash
python3 -m backend.build_embeddings
```

lệnh chạy chatbot:

lệnh khai báo thư viện:
```bash
source elevator_env38/bin/activate
```

```bash
cd ~/elevator_ai_project
```
lệnh test chatbot:
```bash
python3 -m backend.test_chatbot
```
lệnh chạy GUI chatbot:
```bash
python3 -m gui.main
```
lệnh chạy API chatbot:
```bash
python -m uvicorn backend.api:app --host 0.0.0.0 --port 8000 --reload
```
lệnh chạy java fx
cd chatbot-javafx
mvn javafx:run