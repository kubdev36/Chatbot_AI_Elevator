@echo off
REM Start the Python API backend first
echo Starting Python API backend...
echo You need to run this in elevator_ai_project folder:
echo python -m uvicorn backend.api:app --host 0.0.0.0 --port 8000 --reload
echo.
echo.
echo Starting JavaFX Chatbot GUI...
cd /d D:\ubuntu\chatAi\Chatbot_AI_elevator\chatbot-javafx

REM Run with Maven (recommended)
call mvn javafx:run

REM Or if Maven javafx plugin doesn't work, use the JAR with explicit JavaFX modules
REM java --module-path "C:\Users\Admin\.m2\repository\org\openjfx" ^
REM      --add-modules javafx.controls,javafx.fxml ^
REM      -jar target/chatbot-javafx-all.jar

pause

