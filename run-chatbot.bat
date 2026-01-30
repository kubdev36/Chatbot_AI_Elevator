@echo off
REM Start the Python API backend first
echo Starting Python API backend...
start cmd /k "cd /d D:\ubuntu\chatAi\Chatbot_AI_elevator\elevator_ai_project && python3 -m uvicorn backend.api:app --host 0.0.0.0 --port 8000 --reload"

REM Wait a moment for the API to start
timeout /t 3 /nobreak

REM Run the JavaFX application
echo Starting JavaFX GUI...
cd /d D:\ubuntu\chatAi\Chatbot_AI_elevator\chatbot-javafx
mvn clean javafx:run

pause
