# Example Source: https://python.langchain.com/v0.2/docs/integrations/memory/google_firestore/
import os
from dotenv import load_dotenv
from datetime import datetime
from langchain_community.chat_message_histories import TiDBChatMessageHistory
from langchain.chat_models import init_chat_model

"""
Steps to replicate this example:
1. Create a Firebase account
2. Create a new Firebase project
    - Copy the project ID
3. Create a Firestore database in the Firebase project
4. Install the Google Cloud CLI on your computer
    - https://cloud.google.com/sdk/docs/install
    - Authenticate the Google Cloud CLI with your Google account
        - https://cloud.google.com/docs/authentication/provide-credentials-adc#local-dev
    - Set your default project to the new Firebase project you created
5. Enable the Firestore API in the Google Cloud Console:
    - https://console.cloud.google.com/apis/enableflow?apiid=firestore.googleapis.com&project=crewai-automation
"""

# Load environment variables from .env
load_dotenv()

# Setup TiDB database
# mysql://2CbWSFbDLsSAxv1.root:RR8FPnWt9sdSrllX@gateway01.ap-northeast-1.prod.aws.tidbcloud.com:4000/test
tidb_connection_string_template = "mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}?ssl_ca=/etc/ssl/cert.pem&ssl_verify_cert=true&ssl_verify_identity=true"
tidb_connection_string = tidb_connection_string_template.format(
    USER=os.environ["TIDB_USERNAME"],
    PASSWORD=os.environ["TIDB_PASSWORD"],
    HOST=os.environ["TIDB_HOST"],
    PORT=os.environ["TIDB_PORT"],
    DATABASE=os.environ["TIDB_DATABASE"],
)


# Setup Firebase Firestore
#PROJECT_ID = "langchain-tryout-c6d94"
SESSION_ID = "sessiontimmy-20250521-1727"  # This could be a username or a unique ID. Change this session ID to start from blank conversation. Use existing session ID to continue a conversation. Below are existing session in the TiDB
# sessiontimmy-20250521-1323
# sessiontimmy-20250521-1727

#COLLECTION_NAME = "timmy_berlin_chat_history"

# Initialize Firestore Client
#print("Initializing Firestore Client...")
#client = firestore.Client(project=PROJECT_ID)

# Initialize Firestore Chat Message History
#print("Initializing Firestore Chat Message History...")
#chat_history = FirestoreChatMessageHistory(
#    session_id=SESSION_ID,
#    collection=COLLECTION_NAME,
#    client=client,
#)

# Initialize TiDB Message History
print("Initializing TiDB Chat Message History...")

chat_history = TiDBChatMessageHistory(
    connection_string=tidb_connection_string,
    session_id = SESSION_ID,
    earliest_time = datetime(2025, 5, 21),  # Optional to set earliest_time to load messages after this time point.
)

print("Chat History Initialized.")
print("Current Chat History:", chat_history.messages)

# Create a Gemini v2.5 Flash model
model = init_chat_model("gemini-2.5-flash-preview-05-20", model_provider="google_genai")

print("Start chatting with the AI. Type 'exit' to quit.")

while True:
    human_input = input("User: ")
    if human_input.lower() == "exit":
        break

    chat_history.add_user_message(human_input)

    ai_response = model.invoke(chat_history.messages)
    chat_history.add_ai_message(ai_response.content)

    print(f"AI: {ai_response.content}")
