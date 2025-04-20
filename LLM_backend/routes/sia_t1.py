from langserve import add_routes
from config.models import llm
from prompts.sia_test1 import prompt
"""
http://localhost:8000/siat1/invoke
{
  "input": {
    "user_input": "..."
  }
}
"""
def add_t1_route(app):
    add_routes(
        app,
        prompt | llm,
        path="/siat1",
    )