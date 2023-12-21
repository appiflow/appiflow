import uvicorn
from fastapi import FastAPI, status
from api import api_v1_router

app = FastAPI(title="lowcode app")

app.include_router(api_v1_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)