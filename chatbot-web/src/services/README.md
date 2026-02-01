# Chat Services & API Integration

## Cấu trúc dịch vụ

```
src/
├── services/
│   └── chatAPI.js          # API client để gọi backend
├── hooks/
│   └── useAPIConnection.js # Hook để quản lý kết nối API
└── components/
    ├── ChatWindow.js       # Component chính hiển thị chat
    └── Sidebar.js         # Component sidebar với lịch sử
```

## chatAPI.js

Cung cấp các hàm để gọi backend API:

### `sendMessage(question: string): Promise<string>`

Gửi câu hỏi đến backend và nhận câu trả lời từ SQL database/LLM

```javascript
import { chatAPI } from "./services/chatAPI";

const answer = await chatAPI.sendMessage("Thang máy hoạt động như thế nào?");
```

### `healthCheck(): Promise<boolean>`

Kiểm tra xem backend API có hoạt động không

```javascript
const isAlive = await chatAPI.healthCheck();
```

## useAPIConnection Hook

Quản lý trạng thái kết nối với backend:

```javascript
import { useAPIConnection } from "./hooks/useAPIConnection";

const { isConnected, isChecking } = useAPIConnection();
// isConnected: true/false (có kết nối hay không)
// isChecking: true/false (đang kiểm tra hay không)
```

## Luồng dữ liệu

```
User Input
    ↓
ChatWindow.js (handleSendMessage)
    ↓
chatAPI.sendMessage(question)
    ↓
HTTP POST /chat → Backend API
    ↓
Backend (elevator_ai_project/backend/api.py)
    ↓
get_chatbot_response() → Query SQL/LLM
    ↓
Response trở về JSON
    ↓
React UI cập nhật hiển thị
```

## Cơ sở dữ liệu

Backend lấy dữ liệu từ:

1. **MySQL Database**: Thông tin nhân viên, hướng dẫn sử dụng
2. **Embeddings**: Semantic search qua sentence-transformers
3. **LLM (Ollama)**: Xử lý câu hỏi tự nhiên

Xem `elevator_ai_project/backend/chatbot_engine.py` để chi tiết

## Error Handling

Nếu kết nối bị mất:

- UI hiển thị "Mất kết nối" ở header
- Tin nhắn lỗi được hiển thị: "❌ Lỗi: Không thể kết nối đến server"
- Tự động reconnect mỗi 30 giây

## Debugging

Mở DevTools (F12) để xem:

1. **Network tab**: Xem request/response đến API
2. **Console tab**: Xem error messages
3. **Application tab**: Xem .env config

## Development vs Production

Trước deployment, thay đổi `.env`:

```env
# Development
REACT_APP_API_URL=http://localhost:8000

# Production
REACT_APP_API_URL=https://your-production-api.com
```
