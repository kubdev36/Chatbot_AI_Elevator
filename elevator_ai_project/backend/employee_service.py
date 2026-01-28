from config.db_config import get_db

def find_employee(query: str):
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT employee_code, full_name, birth_year, position,
               department, hometown, phone, email
        FROM employees
        WHERE employee_code = %s
           OR full_name LIKE %s
        LIMIT 1
    """, (query, f"%{query}%"))

    return cursor.fetchone()

