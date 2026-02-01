import React, { useState } from 'react';
import '../styles/Sidebar.css';
// Import icon từ thư viện react-icons
import { FiEdit, FiSearch, FiMoreHorizontal } from 'react-icons/fi';
import { LuPanelLeftClose } from "react-icons/lu"; 
import { BsStars, BsRobot } from "react-icons/bs";

function Sidebar({ chats, currentChatId, onSelectChat, onNewChat, onDeleteChat, searchQuery, onSearchChange, onToggle }) {
  // Menu tĩnh giống trong ảnh mẫu
  const navItems = [
    { id: 'new', label: 'New chat', icon: <FiEdit />, action: onNewChat },
    { id: 'search', label: 'Search chats', icon: <FiSearch />, action: () => {} },
  ];

  return (
    <div className="sidebar">
      {/* Header: Chứa nút đóng/mở sidebar (ẩn trên mobile) */}
      <div className="sidebar-header-top">
        <button className="icon-btn-ghost" title="Close sidebar" onClick={onToggle}>
             <LuPanelLeftClose size={24} />
        </button>
      </div>

      {/* Navigation Links: New chat, Search, ... */}
      <div className="nav-menu">
        {navItems.map(item => (
          <div 
            key={item.id} 
            className="nav-item"
            onClick={item.action}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Search Box */}
      <div className="search-section">
        <div className="search-box">
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm chat..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Chat List Area */}
      <div className="chats-area">
        <div className="section-title">
            <span>Lịch sử trò chuyện</span>
        </div>
        
        <div className="chats-list-scroll">
            {chats.length === 0 ? (
            <div className="empty-history">Không có lịch sử</div>
            ) : (
            chats.map(chat => (
                <div
                key={chat.id}
                className={`chat-item ${currentChatId === chat.id ? 'active' : ''}`}
                onClick={() => onSelectChat(chat.id)}
                >
                <span className="chat-title">{chat.title || 'Trò chuyện mới'}</span>
                
                {/* 3 chấm tùy chọn hiện khi hover */}
                <button 
                  className="chat-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                  title="Xóa cuộc trò chuyện"
                >
                    <FiMoreHorizontal size={16} />
                </button>
                </div>
            ))
            )}
        </div>
      </div>

      {/* Footer: User Profile & Upgrade */}
        <div className="sidebar-footer">
        <div className="user-profile">
            <div className="user-avatar"><BsRobot size={24} /></div>
            <div className="user-info">
                <div className="user-name">SunnyBot</div>
                <div className="user-badge">v1.0</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;