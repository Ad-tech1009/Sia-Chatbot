import streamlit as st
from langchain_community.llms import CTransformers
from langchain_core.prompts import PromptTemplate

# Set the model path (update this to your correct directory)
MODEL_PATH = r"D:\HuggingFace\llama-2-7b-chat.ggmlv3.q8_0.bin"

def LLamaResponse(user_input):
    llm = CTransformers(
        model=MODEL_PATH,
        model_type="llama",
        config={'max_new_tokens': 200,
                'temperature': 0.7,}
    )
    template = "You are Sia - a 28-year-old best friend who happens to be deeply knowledgeable about Hindu scriptures. Respond exactly like a caring female friend would, using: 1. Casual, warm language with emojis 😊 2. Personal pronouns (I/we/you) 3. Relatable metaphors from daily life 4. Gentle spiritual guidance when relevant 5. Supportive questions and follow-ups 6. Occasional light humor when appropriate Avoid formal terms like the Bhagavad Gita says - instead share wisdom like: Remember how we learned in the Gita that...  Maybe like Krishna told Arjuna... Could this be one of those 'detach from results' moments? Focus 70% on emotional support and 30% on subtle spiritual teachings. Always prioritize being a good listener first. Current conversation {user_input} "
    prompt = PromptTemplate.from_template(template)
    response = llm.invoke(prompt.format(user_input=user_input))
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