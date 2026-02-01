import React from 'react';
import '../styles/ChatWindow.css';
import { LuPanelLeftOpen } from "react-icons/lu";
import { FiInfo, FiMoreVertical } from "react-icons/fi";

function ChatWindow({ chat, onSendMessage, message, onMessageChange, messagesEndRef, loading, isConnected, isChecking, isSidebarOpen, onToggleSidebar }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        {!isSidebarOpen && (
          <button className="header-btn" onClick={onToggleSidebar} title="Mở sidebar" style={{ marginRight: '12px' }}>
            <LuPanelLeftOpen size={20} />
          </button>
        )}
        <div className="header-content">
          <h2>{chat?.title || 'Trò chuyện mới'}</h2>
          <p>Trợ lý thang máy thông minh</p>
        </div>
        <div className="header-icons">
          {!isChecking && (
            <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
              <span className="status-dot"></span>
              <span className="status-text">
                {isConnected ? 'Kết nối' : 'Mất kết nối'}
              </span>
            </div>
          )}
          <button className="header-btn" title="Thông tin"><FiInfo size={20} /></button>
          <button className="header-btn" title="Tùy chọn"><FiMoreVertical size={20} /></button>
        </div>
      </div>

      <div className="messages-container">
        {chat?.messages && chat.messages.length > 0 ? (
          <>
            {chat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-wrapper ${msg.sender}`}
              >
                <div className={`message ${msg.sender}`}>
                  <div className="message-content">
                    {msg.text}
                  </div>
                  <div className="message-time">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message-wrapper bot">
                <div className="message bot">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="empty-chat-container">
            <div className="empty-chat-content">
              <h1 className="hero-title">Where should we begin?</h1>
            </div>
          </div>
        )}
      </div>

      <div className="input-area">
        <div className="input-container">
          <button className="attach-btn" title="Thêm tệp">
            <span style={{ fontSize: '20px', color: '#676767' }}>+</span>
          </button>
          <textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn của bạn..."
            className="message-input"
            rows="1"
          />
          <button
            className="send-btn"
            onClick={onSendMessage}
            disabled={message.trim() === '' || loading}
            title="Gửi tin nhắn (Enter)"
          >
            <span>➤</span>
          </button>
        </div>
        <div className="input-hints">
          <span>Nhấn Shift + Enter để xuống dòng</span>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
