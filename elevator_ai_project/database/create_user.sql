-- 1. Tạo user (nếu chưa có)
CREATE USER IF NOT EXISTS 'elevator_bot'@'localhost' IDENTIFIED BY 'elevator123';

-- 2. Cấp quyền
CREATE DATABASE IF NOT EXISTS elevator_ai;
GRANT ALL PRIVILEGES ON elevator_ai.* TO 'elevator_bot'@'localhost';
FLUSH PRIVILEGES;
