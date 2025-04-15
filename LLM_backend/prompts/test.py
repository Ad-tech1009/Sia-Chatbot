from langchain.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", 
     "You are a chatbot that helps users with their questions. "),
    ("human", "{user_input}")
])