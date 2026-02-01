// API service để gọi backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const chatAPI = {
  // Gửi tin nhắn đến backend và lấy response
  async sendMessage(question) {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error('Error calling chat API:', error);
      throw error;
    }
  },

  // Kiểm tra kết nối API
  async healthCheck() {
    try {
      const response = await fetch(`${API_URL}/`);
      return response.ok;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }
};
