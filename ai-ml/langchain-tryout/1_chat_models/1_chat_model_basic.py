# Chat Model Documents: https://python.langchain.com/v0.2/docs/integrations/chat/
# OpenAI Chat Model Documents: https://python.langchain.com/v0.2/docs/integrations/chat/openai/

from dotenv import load_dotenv
from langchain.chat_models import init_chat_model

# Load environment variables from .env
load_dotenv()

# Create a Gemini v2.5 Flash model
model = init_chat_model("gemini-2.5-flash-preview-05-20", model_provider="google_genai")

# Invoke the model with a message
result = model.invoke("What is 81 divided by 9?")
print("Full result:")
print(result)
print("Content only:")
print(result.content)
