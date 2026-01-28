from backend.chatbot_engine import get_chatbot_response

while True:
    q = input("Ban: ")
    print("Bot:", get_chatbot_response(q))

