# Start Python API backend
Write-Host "Starting Python API backend..." -ForegroundColor Cyan
Write-Host "Please run this command in another terminal from elevator_ai_project folder:" -ForegroundColor Yellow
Write-Host "python -m uvicorn backend.api:app --host 0.0.0.0 --port 8000 --reload" -ForegroundColor Green
Write-Host ""

# Wait a moment
Start-Sleep -Seconds 2

# Start JavaFX application with Maven
Write-Host "Starting JavaFX Chatbot GUI..." -ForegroundColor Cyan
Write-Host ""

cd D:\ubuntu\chatAi\Chatbot_AI_elevator\chatbot-javafx

# Try using Maven javafx plugin first
Write-Host "Attempting to run with Maven..." -ForegroundColor Green
mvn javafx:run
