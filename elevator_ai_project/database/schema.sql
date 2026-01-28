CREATE DATABASE IF NOT EXISTS elevator_ai
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE elevator_ai;


-- INTENT
CREATE TABLE intents (
    intent_id INT AUTO_INCREMENT PRIMARY KEY,
    intent_name VARCHAR(100),
    domain VARCHAR(50),
    description TEXT
);

-- PROMPT
CREATE TABLE prompts (
    prompt_id INT AUTO_INCREMENT PRIMARY KEY,
    intent_id INT,
    prompt_text TEXT,
    FOREIGN KEY (intent_id) REFERENCES intents(intent_id)
);

-- ANSWER
CREATE TABLE answers (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    intent_id INT,
    answer_text TEXT,
    FOREIGN KEY (intent_id) REFERENCES intents(intent_id)
);

-- CHAT LOG
CREATE TABLE chat_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT,
    intent_name VARCHAR(100),
    confidence FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- EMPLOYEE
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_code VARCHAR(20),
    full_name VARCHAR(100),
    birth_year INT,
    position VARCHAR(50),
    department VARCHAR(50),
    hometown VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    photo_path VARCHAR(255)
);

