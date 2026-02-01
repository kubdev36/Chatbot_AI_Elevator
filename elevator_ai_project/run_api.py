#!/usr/bin/env python
"""
Run the FastAPI server for Elevator Chatbot
"""
import sys
import os
from pathlib import Path

# Add parent directory to Python path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

if __name__ == "__main__":
    import uvicorn
    
    # Run the app
    uvicorn.run(
        "elevator_ai_project.backend.api:app",
        host="0.0.0.0",
        port=8000,
        reload=False,
    )
