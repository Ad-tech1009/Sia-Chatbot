from langserve import add_routes
from config.models import llm
from prompts.test import prompt
"""
http://localhost:8000/test/invoke
{
  "input": {
    "user_input": "..."
  }
}
"""
def add_test_route(app):
    add_routes(
        app,
        prompt | llm,
        path="/test",
    )