import mysql.connector
import os

def run_setup():
    print("--- AUTOMATIC DATABASE SETUP ---")
    print("Please enter your MySQL ROOT password.")
    print("If you have no password (empty), just press Enter.")
    
    root_pass = input("MySQL Root Password: ").strip()

    # 1. Connect as root to create user and database
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password=root_pass
        )
        cursor = conn.cursor()
        
        # Create User
        print("Creating user 'elevator_bot'...")
        cursor.execute("CREATE USER IF NOT EXISTS 'elevator_bot'@'localhost' IDENTIFIED BY 'elevator123';")
        
        # Create DB
        print("Creating database 'elevator_ai'...")
        cursor.execute("CREATE DATABASE IF NOT EXISTS elevator_ai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
        
        # Grant Privileges
        print("Granting permissions...")
        cursor.execute("GRANT ALL PRIVILEGES ON elevator_ai.* TO 'elevator_bot'@'localhost';")
        cursor.execute("FLUSH PRIVILEGES;")
        
        conn.close()
        print("User and Database created successfully!")
        
    except mysql.connector.Error as err:
        print(f"Error connecting/creating user: {err}")
        print("Please check your root password and try again.")
        return

    # 2. Connect as elevator_bot to run Schema and Seed
    try:
        print("\nConnecting as 'elevator_bot' to initialize tables...")
        conn = mysql.connector.connect(
            host="localhost",
            user="elevator_bot",
            password="elevator123",
            database="elevator_ai"
        )
        cursor = conn.cursor()
        
        # Read Schema
        with open("database/schema.sql", "r", encoding="utf-8") as f:
            schema_sql = f.read()
            
        # Execute Schema (split by ;)
        for statement in schema_sql.split(';'):
            if statement.strip():
                cursor.execute(statement)
                
        print("Schema applied.")

        # Read Seed
        with open("database/seed.sql", "r", encoding="utf-8") as f:
            seed_sql = f.read()
            
        # Execute Seed
        for statement in seed_sql.split(';'):
            if statement.strip():
                cursor.execute(statement)
                
        print("Seed data applied.")
        conn.commit()
        conn.close()
        
        print("\n--- SETUP COMPLETED SUCCESSFULLY! ---")
        print("You can now run: python -m backend.build_embeddings")
        
    except mysql.connector.Error as err:
        print(f"Error initializing database: {err}")

if __name__ == "__main__":
    run_setup()
