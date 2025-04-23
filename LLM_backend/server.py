from config.app import app
from routes import add_t1_route,add_test_route,mood_router
import uvicorn

# LangServe Endpoints
add_test_route(app)
add_t1_route(app)

# REST endpoints
app.include_router(mood_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)