from config.app import app
from routes.test import add_test_route
import uvicorn


# Add all routes
add_test_route(app)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)