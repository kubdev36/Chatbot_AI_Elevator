import mysql.connector

def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="elevator_bot",
        password="elevator123",
        database="elevator_ai"
    )


