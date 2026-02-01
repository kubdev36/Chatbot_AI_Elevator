import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { chatAPI } from './services/chatAPI';
import { useAPIConnection } from './hooks/useAPIConnection';
import './App.css';

function App() {
  const [chats, setChats] = useState([
    {
      id: 1,
      title: 'Hỏi về thang máy',
      messages: [
        { id: 1, text: 'Xin chào! Bạn cần giúp gì về thang máy?', sender: 'bot', timestamp: new Date(Date.now() - 3600000) },
        { id: 2, text: 'Tôi muốn biết cách sử dụng thang máy an toàn', sender: 'user', timestamp: new Date(Date.now() - 3540000) },
      ]
    },
    {
      id: 2,
      title: 'Bảo trì thang máy',
      messages: [
        { id: 1, text: 'Bảo trì định kỳ rất quan trọng', sender: 'bot', timestamp: new Date(Date.now() - 86400000) },
      ]
    },
    {
      id: 3,
      title: 'Khắc phục sự cố',
      messages: [
        { id: 1, text: 'Thang máy của bạn gặp vấn đề gì?', sender: 'bot', timestamp: new Date(Date.now() - 172800000) },
      ]
    }
  ]);

  const [currentChatId, setCurrentChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const { isConnected, isChecking } = useAPIConnection();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChatId, chats]);

  const currentChat = chats.find(chat => chat.id === currentChatId);

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.messages.some(msg => msg.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    let activeChatId = currentChatId;

    // Nếu đang ở màn hình New Chat (chưa có ID), tạo ID mới
    if (!activeChatId) {
      activeChatId = chats.length > 0 ? Math.max(...chats.map(c => c.id)) + 1 : 1;
    }

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    // Cập nhật state: Nếu chat đã tồn tại thì thêm tin nhắn, nếu chưa thì tạo mới
    setChats(prevChats => {
      const chatExists = prevChats.some(c => c.id === activeChatId);
      if (chatExists) {
        return prevChats.map(chat =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, newMessage] }
            : chat
        );
      } else {
        const newChat = {
          id: activeChatId,
          title: message,
          messages: [newMessage]
        };
        return [newChat, ...prevChats];
      }
    });

    setCurrentChatId(activeChatId);

    const userQuestion = message;
    setMessage('');
    setLoading(true);

    try {
      // Gọi backend API
      const botAnswer = await chatAPI.sendMessage(userQuestion);

      const botResponse = {
        id: Date.now() + 1,
        text: botAnswer,
        sender: 'bot',
        timestamp: new Date()
      };

      setChats(prevChats => prevChats.map(chat =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, botResponse] }
          : chat
      ));
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorResponse = {
        id: Date.now() + 1,
        text: '❌ Lỗi: Không thể kết nối đến server. Vui lòng kiểm tra backend API.',
        sender: 'bot',
        timestamp: new Date()
      };

      setChats(prevChats => prevChats.map(chat =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, errorResponse] }
          : chat
      ));
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  const handleDeleteChat = (chatId) => {
    const filtered = chats.filter(chat => chat.id !== chatId);
    setChats(filtered);
    if (currentChatId === chatId && filtered.length > 0) {
      setCurrentChatId(filtered[0].id);
    }
  };

  return (
    <div className="app">
      {isSidebarOpen && (
        <Sidebar
          chats={filteredChats}
          currentChatId={currentChatId}
          onSelectChat={setCurrentChatId}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggle={() => setIsSidebarOpen(false)}
        />
      )}
      <ChatWindow
        chat={currentChat}
        onSendMessage={handleSendMessage}
        message={message}
        onMessageChange={setMessage}
        messagesEndRef={messagesEndRef}
        loading={loading}
        isConnected={isConnected}
        isChecking={isChecking}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(true)}
      />
    </div>
  );
}

export default App;
