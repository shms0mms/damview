from fastapi import FastAPI
from .db import engine, Base
from .interview.router import app as interview_app
from .interview.create_app import app as create_app
from fastapi.middleware.cors import CORSMiddleware

app  = FastAPI()

app.include_router(interview_app)
app.include_router(create_app)



origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"],
)


async def create_db():
    
    async with engine.begin()as conn:
        try:
            await  conn.run_sync(Base.metadata.drop_all)
        except:
            pass
        await  conn.run_sync(Base.metadata.create_all)
@app.get("/db")
async def create():
    await create_db()
    return True

