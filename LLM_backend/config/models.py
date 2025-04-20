from langchain_community.llms import Ollama

llm = Ollama(model="mistral",num_predict=60)