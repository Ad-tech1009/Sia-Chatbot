from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import streamlit as st
import os
from langchain_community.llms import Ollama
from dotenv import load_dotenv

load_dotenv()
# for langsmith tracking
os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGSMITH_API_KEY")
os.environ["LANGCHAIN_PROJECT"] = os.getenv("LANGSMITH_PROJECT")
os.environ["LANGCHAIN_TRACING_V2"] = os.getenv("LANGSMITH_TRACING")

def LLamaResponse(user_input):
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "You are a helpful assistant."),
            ("user", "Question : {input}"),
        ]
    )
    llm = Ollama(model="mistral")
    output_parser = StrOutputParser()
    llm_chain = prompt | llm | output_parser
    response = llm_chain.invoke({"input": user_input})
    print (response)
    return response

# Streamlit UI
st.set_page_config(
    page_title="Sia",
    page_icon="🌼",
    layout="centered",
    initial_sidebar_state="collapsed"
)


# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Header Section
st.markdown("""
    <div class="header">
        <div style="text-align: center;">
            <h1 style="margin: 0; font-size: 2.5em; color: #2D3748;">Sia</h1>
            <p style="margin: 5px 0 0 0; font-size: 1.2em; color: #718096;">Your Light of Wisdom</p>
        </div>
    </div>
""", unsafe_allow_html=True)

# Chat container
chat_container = st.container()
with chat_container:
    st.markdown('<div class="chat-container">', unsafe_allow_html=True)
    
    # Display chat messages
    for message in st.session_state.messages:
        if message["role"] == "user":
            st.markdown(f'<div class="user-message">👤 {message["content"]}</div>', unsafe_allow_html=True)
        else:
            st.markdown(f'<div class="bot-message">🌼 {message["content"]}</div>', unsafe_allow_html=True)
    
    st.markdown('</div>', unsafe_allow_html=True)

# User input at bottom
with st.form(key="chat_form", clear_on_submit=True):
    user_input = st.text_input(
        "Type your message...", 
        key="input",
        label_visibility="collapsed",
        placeholder="Ask Sia anything..."
    )
    submit_button = st.form_submit_button(label="Send →")

if submit_button and user_input.strip():
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": user_input})
    
    # Generate response
    with st.spinner(''):
        try:
            response = LLamaResponse(user_input)
            # Simulate typing animation
            with chat_container:
                typing_placeholder = st.empty()
                typing_placeholder.markdown(
                    '<div class="bot-message typing-animation">'
                    '<div class="typing-dot"></div>'
                    '<div class="typing-dot" style="animation-delay: 0.2s"></div>'
                    '<div class="typing-dot" style="animation-delay: 0.4s"></div>'
                    '</div>',
                    unsafe_allow_html=True
                )
                
            # Add bot response to chat history
            st.session_state.messages.append({"role": "assistant", "content": response})
            
            # Update chat display
            chat_container.empty()
            with chat_container:
                st.markdown('<div class="chat-container">', unsafe_allow_html=True)
                for message in st.session_state.messages:
                    if message["role"] == "user":
                        st.markdown(f'<div class="user-message">👤 {message["content"]}</div>', unsafe_allow_html=True)
                    else:
                        st.markdown(f'<div class="bot-message">🌼 {message["content"]}</div>', unsafe_allow_html=True)
                st.markdown('</div>', unsafe_allow_html=True)
            
        except Exception as e:
            st.error(f"An error occurred: {str(e)}")
    st.rerun()

# Empty state for first-time users
if len(st.session_state.messages) == 0:
    chat_container.markdown("""
        <div style="text-align: center; margin-top: 50px;">
            <h3 style="color: #718096;">How can I enlighten you today?</h3>
            <div style="display: grid; gap: 12px; max-width: 500px; margin: 30px auto;">
                <div class="sample-question" onclick="this.innerHTML='How to find inner peace?';">
                    "How to find inner peace?"
                </div>
                <div class="sample-question" onclick="this.innerHTML='What is the essence of Dharma?';">
                    "What is the essence of Dharma?"
                </div>
                <div class="sample-question" onclick="this.innerHTML='Teach me about mindfulness';"> 
                    "Teach me about mindfulness"
                </div>
            </div>
        </div>
    """, unsafe_allow_html=True)

# Footer
st.markdown("""
    <div style="text-align: center; margin-top: 40px; color: #A0AEC0; font-size: 0.9em;">
        Sia • Guided by Ancient Wisdom • 
        <span style="color: #FF6B6B;">🌼</span>
    </div>
""", unsafe_allow_html=True)