-- ÉP UTF-8 CHO MYSQL
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

USE elevator_ai;

-- ===== INTENTS =====
INSERT INTO intents (intent_name, domain, description)
VALUES (
    'elevator_speed',
    'elevator',
    'Tốc độ thang máy'
);

-- ===== PROMPTS =====
INSERT INTO prompts (intent_id, prompt_text)
VALUES
    (1, 'Tốc độ thang máy là bao nhiêu'),
    (1, 'Thang máy chạy nhanh hay chậm');

-- ===== ANSWERS =====
INSERT INTO answers (intent_id, answer_text)
VALUES
    (1, 'Tốc độ thang máy hiện tại là 1.2 m/s');

-- ===== EMPLOYEES =====
INSERT INTO employees (
    employee_code,
    full_name,
    birth_year,
    position,
    department,
    hometown,
    phone,
    email
)
VALUES (
    'NV001',
    'Nguyễn Văn A',
    1995,
    'Kỹ sư vận hành',
    'Kỹ thuật',
    'Hà Nội',
    '0901234567',
    'a.nguyen@company.com'
);

