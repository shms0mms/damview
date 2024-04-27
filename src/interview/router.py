import asyncio
from typing import Optional
import uuid
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from fastapi_filter.contrib.sqlalchemy import Filter
import fastapi_filter
from .filters import FilterTasks


from .models import Messages, People, Room, Tasks
from .schema import PeopleAdd, ResponeAfterCreate
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from ..db  import get_session,session as ssession
from .utils import *


app = APIRouter(prefix="/interview", tags=["interview"])



# _______________________messages_________________________________



@app.get("/last_messages/{roomId}")
async def alls(roomId:uuid.UUID, session:AsyncSession = Depends(get_session)):
    messages = (await session.scalars(select(Messages).options(selectinload(Messages.user)).where(Messages.room_id == roomId)))
    return messages.all()  




# _______________________filter-tasks_________________________________
@app.get("/filter_tasks")
async def tasks_filter( city_filter:FilterTasks = fastapi_filter.FilterDepends(FilterTasks),session:AsyncSession = Depends(get_session)):
    query = city_filter.filter(select(Tasks).options(Tasks.category))
    result = await session.scalars(query)
    return result.all()
    




# _______________________tasks_________________________________


@app.get("/all_tasks")
async def alls( session:AsyncSession = Depends(get_session)):
    a = await session.scalars(select(Tasks).options(selectinload(Tasks.category)))
    return a.all()   


@app.get("/last_task/{roomId}")
async def alls(roomId:uuid.UUID, session:AsyncSession = Depends(get_session)):
    room = await session.scalar(select(Room).options(selectinload(Room.messages),selectinload(Room.peoples), selectinload(Room.task)).where(Room.id == roomId))
    
    if room.task_id:
        task = await session.scalar(select(Tasks).options(selectinload(Tasks.category)).where(Tasks.id == room.task_id))
    
        return task
    return "No execercicess"



@app

# ________________point work with room______________________________




@app.post("/create_room")
async def create_room(creater:PeopleAdd, session:AsyncSession = Depends(get_session)):
    people = People(**creater.model_dump())
    
    ids =uuid.uuid1()
    
    room = Room(id = ids)
    people.room_id = ids
    
    
    session.add_all([people, room])
    await session.flush()
    id_people = people.id

    await session.commit()
    return {"roomId":ids, "role":"interviewer", "userId":id_people,"fio":creater.fio}







# ____________________add person in room__________________________







@app.post("/create_person/{roomId}")
async def create_room(creater:PeopleAdd,roomId:uuid.UUID, session:AsyncSession = Depends(get_session)):
    people = People(**creater.model_dump())
    
    # messages = await session.scalars(select(Messages).options(selectinload(Messages.user)).where(Messages.room_id == roomId) )
    
    people.room_id = roomId
    
    session.add(people)
    await session.flush()
    id_people = people.id
    role = people.role.value
    await session.commit()
    messages = (await session.scalars(select(Messages).options(selectinload(Messages.user)).where(Messages.room_id == roomId))).all()
    
    return {"role":role, "userId":id_people, "roomMessages":messages,"fio":creater.fio}





# _______________run python code_________________________________________


@app.get("/run_python_code")
async def run_python_code(code:str):
    return exec(code)



# _________________websockets_____________________________





#___________________lif code______________________________________

@app.websocket("/room/code/{userId}/{room_id}")
async def room_work(room_id:uuid.UUID,userId:int, websocket:WebSocket, session:AsyncSession = Depends(get_session)):
    room = await session.scalar(select(Room).options(selectinload(Room.messages),selectinload(Room.peoples)).where(Room.id == room_id))
    user = await session.scalar(select(People).where(People.id == userId))

    if room and user:
    
        await add_in_webscoket(room_id=room_id, type="code",websocket=websocket,user_id=userId)

        await websocket.accept()
        await websocket.send_text(str(room.code))   
            
            
        async def handle_websocket(websocket, user,room):
            try:
                while True:
                    text = await websocket.receive_text()
                    
                    w = await get_list(room_id=room_id, type="code",websocket=websocket)
                    
                    for websocket1 in w:
                    
                        await websocket1[1].send_text(text)
                    
                    room.code = text
                    
                    await session.commit()
                    

            except WebSocketDisconnect:

                async with ssession() as sess:
                    await delete_from_list(room_id=room_id, type="code",websocket=websocket,user_id=userId, session=sess)




        await asyncio.gather(handle_websocket(websocket, user,room))
        
        
# ___________________chat ___________________________


@app.websocket("/room/chat/{userId}/{room_id}")
async def room_work(room_id:uuid.UUID,userId:int, websocket:WebSocket, session:AsyncSession = Depends(get_session)):

        
    room = await session.scalar(select(Room).options(selectinload(Room.messages),selectinload(Room.peoples)).where(Room.id == room_id))
    user = await session.scalar(select(People).where(People.id == userId))
    
    if room:
        if user:
            await websocket.accept()
        
            
            
            await add_in_webscoket(room_id=room_id, type="chat",websocket=websocket,user_id=userId)

            people = []
            for i in room.peoples:
                people.append({"fio":i.fio, "role":i.role.value})
                
            await websocket.send_json(str(people))        
            
            async def handle_websocket(websocket, user):
            
                try:
            
                    while True:
                        
                        text = await websocket.receive_text()
                        w = await get_list(room_id=room_id, type="chat",websocket=websocket)
                        async with ssession() as sess:
                            message = Messages(room_id = room_id, user_id = userId, message = text)
                            sess.add(message)
                            await sess.flush()
                            
                            message_id = message.id
                            await sess.commit()

                        for websocket2 in w:
                            await websocket2[1].send_json({"message":text, "fio":user.fio,"id":message_id})

            
                except WebSocketDisconnect:
            
                    async with ssession() as sess:
                        await delete_from_list(room_id=room_id, type="chat",websocket=websocket,user_id=userId, session=sess)



            await asyncio.gather(handle_websocket(websocket, user))
            
         
         
            
# ________________tasks______________________________
@app.websocket("/room/tasks/{userId}/{room_id}")
async def room_task(room_id:uuid.UUID,userId:int, websocket:WebSocket, session:AsyncSession = Depends(get_session)):
    
    room = await session.scalar(select(Room).options(selectinload(Room.messages),selectinload(Room.peoples), selectinload(Room.task)).where(Room.id == room_id))
    user = await session.scalar(select(People).where(People.id == userId))
    
    if room:
        if user:
            await websocket.accept()
        
            await add_in_webscoket(room_id=room_id, type="tasks",websocket=websocket,user_id=userId)
            
            try:
                while True:
                    num = await websocket.receive_json()
                    
                    id_task = num.get("num")
                    if id_task and type(id_task) == int:
                        task = await session.scalar(select(Tasks).options(selectinload(Tasks.category)).where(Tasks.id == room.task_id))
                        if task:
                            w = await get_list(room_id=room_id, type="chat",websocket=websocket)
                            for  i in w:

                                await i[1].send_json(task)
                            async with ssession() as sess:
                                    room = await sess.scalar(select(Room).options(selectinload(Room.messages),selectinload(Room.peoples), selectinload(Room.task)).where(Room.id == room_id))
                                    room.task = task
                                    sess.commit()
                        else:
                            await websocket.send_json({"status":False})
                        
            
            except WebSocketDisconnect:
            
                    async with ssession() as sess:
                        await delete_from_list(room_id=room_id, type="tasks",websocket=websocket,user_id=userId, session=sess)
            
            # task = {
            #     "name":room.task.name,
            #     "task":room.task.task,
            #     "exec_input":room.task.exec_input,
            #     "exec_answer":room.task.exec_answer,
            #     "params":room.task.params,
            #     "category":room.task.category
            #         }
            
