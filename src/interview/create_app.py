import asyncio
import json
import uuid
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from .models import Messages, People, Room, Category, Tasks
from .schema import *
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from ..db  import get_session,session as ssession


app = APIRouter(prefix="/create", tags=["create"])



@app.post("/create_category")
async def create_category(name:str,session:AsyncSession = Depends(get_session)):
    category = Category(name =name )
    session.add(category)
    
    await session.commit()
    
    categories = await session.scalars(select(Category).options(selectinload(Category.tasks)))
    
    return categories.all()




@app.post("/create_task")
async def create_task(task:TaskSchema,session:AsyncSession = Depends(get_session)):

    task.tests = json.dumps(task.tests)
    
    task = Tasks(**task.model_dump() )
    session.add(task)
    
    await session.commit()
    
    tasks = await session.scalars(select(Tasks).options(selectinload(Tasks.category)))
    
    return tasks.all()



@app.post("/add_category")
async def add_category(id_cat:int,id_task:int, session:AsyncSession = Depends(get_session)):
    task = await session.scalar(select(Tasks).options(selectinload(Tasks.category)).where(Tasks.id == id_task))
    category = await session.scalar(select(Category).options(selectinload(Category.tasks)).where(Category.id == id_cat))
    
    task.category = category
    
    await session.commit()
    
    return True