from dotenv import load_dotenv
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from langchain.chat_models import init_chat_model

# Load environment variables from .env
load_dotenv()

# Create a Gemini v2.5 Flash model
model = init_chat_model("gemini-2.5-flash-preview-05-20", model_provider="google_genai")

chat_history = []  # Use a list to store messages

# Set an initial system message (optional)
system_message = SystemMessage(content="You are a helpful AI assistant.")
chat_history.append(system_message)  # Add system message to chat history

# Chat loop
while True:
    query = input("You: ")
    if query.lower() == "exit":
        break
    chat_history.append(HumanMessage(content=query))  # Add user message

    # Get AI response using history
    result = model.invoke(chat_history)
    response = result.content
    chat_history.append(AIMessage(content=response))  # Add AI message

    print(f"AI: {response}")


print("---- Message History ----")
print(chat_history)
