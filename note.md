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

lệnh chạy API chatbot (từ thư mục gốc):

```bash
cd d:\ubuntu\chatAi\Chatbot_AI_elevator
python elevator_ai_project/run_api.py
```

hoặc direct:

```bash
python -m uvicorn elevator_ai_project.backend.api:app --host 0.0.0.0 --port 8000
```

lệnh chạy Web React:

```bash
cd d:\ubuntu\chatAi\Chatbot_AI_elevator\chatbot-web
npm install
npm start
```

hoặc chạy batch file:

```bash
d:\ubuntu\chatAi\Chatbot_AI_elevator\run-web.bat
```

Mở browser tại http://localhost:3000

⚠️ **QUAN TRỌNG**: Web sẽ lấy dữ liệu từ backend API (port 8000) qua hàm chatAPI.sendMessage()

- Dữ liệu được lưu trữ trong MySQL database
- Backend xử lý qua embedding semantic search + LLM
- Web tự động kiểm tra kết nối API (hiển thị status ở header)

lệnh chạy java fx:

```bash
cd chatbot-javafx
mvn javafx:run
```
