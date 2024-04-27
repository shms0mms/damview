import asyncio
import uuid
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from .models import Messages, People, Room
from .schema import PeopleAdd, ResponeAfterCreate
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from ..db  import get_session,session as ssession


app = APIRouter(prefix="/interview", tags=["interview"])

@app.get("/all")
async def alls( session:AsyncSession = Depends(get_session)):
    a = await session.scalars(select(Room))
    return a.all()   

@app.get("/all2")
async def alls( session:AsyncSession = Depends(get_session)):
    a = await session.scalars(select(People))
    return a.all()   
@app.get("/all3/{roomId}")
async def alls(roomId:uuid.UUID, session:AsyncSession = Depends(get_session)):
    messages = (await session.scalars(select(Messages).options(selectinload(Messages.user)).where(Messages.room_id == roomId))).all()
    return messages  








# ______________________________________________




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
    return {"roomId":ids, "role":"interviewer", "userId":id_people}







# ______________________________________________







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
    
    return {"role":role, "userId":id_people, "roomMessages":messages}



@app.get("run_python_code")
async def run_python_code(code:str):
    
    return exec(code)
    


# ______________________________________________



webosckets_chat = []
webosckets_code = []

@app.websocket("/room/code/{userId}/{room_id}")
async def room_work(room_id:uuid.UUID,userId:int, websocket:WebSocket, session:AsyncSession = Depends(get_session)):
    room = await session.scalar(select(Room).options(selectinload(Room.messages),selectinload(Room.peoples)).where(Room.id == room_id))
    user = await session.scalar(select(People).where(People.id == userId))

    if room and user:
    
        webosckets_code.append([userId,websocket])
        
        await websocket.accept()
        await websocket.send_text(str(room.code))   
            
            
        async def handle_websocket(websocket, user,room):
            try:
                while True:
                    text = await websocket.receive_text()
                    for websocket1 in webosckets_code:
                        await websocket1[1].send_text(text)
                    room.code = text
                    await session.commit()
                    

            except WebSocketDisconnect:
                async with ssession() as sess:
                    room2 = await sess.scalar(select(Room).options(selectinload(Room.messages),selectinload(Room.peoples)).where(Room.id == room_id))
                    user = await session.scalar(select(People).where(People.id == userId))
                
                    webosckets_code.remove([userId,websocket])
                    room2.peoples.remove(user)
                    if len(webosckets_chat) == 0 and len(webosckets_code) == 0:
                        await sess.delete(room2)
                    await sess.commit()



        await asyncio.gather(handle_websocket(websocket, user,room))
        
        
# ______________________________________________



@app.get("/")
async def a():
    return [len(webosckets_chat), len(webosckets_code) ,webosckets_chat, webosckets_code] 



@app.websocket("/room/chat/{userId}/{room_id}")
async def room_work(room_id:uuid.UUID,userId:int, websocket:WebSocket, session:AsyncSession = Depends(get_session)):

        
    room = await session.scalar(select(Room).options(selectinload(Room.messages),selectinload(Room.peoples)).where(Room.id == room_id))
    user = await session.scalar(select(People).where(People.id == userId))
    
    if room:
        if user:
            await websocket.accept()
        
            
            
            webosckets_chat.append([userId,websocket])
            people = []
            for i in room.peoples:
                people.append({"fio":i.fio, "role":i.role.value})
                
            await websocket.send_text(str(people))        
            
            async def handle_websocket(websocket, user):
            
                try:
            
                    while True:
                        
                        text = await websocket.receive_text()

                        for websocket2 in webosckets_chat:
                            await websocket2[1].send_json({"message":text, "fio":user.fio})
                        async with ssession() as sess:
                            message = Messages(room_id = room_id, user_id = userId, message = text)
                            sess.add(message)
                            await sess.commit()

            
                except WebSocketDisconnect:
            
                    webosckets_chat.remove([userId,websocket])
                    room.peoples.remove(user)
                    if len(webosckets_chat) == 0 and len(webosckets_code) == 0:
                        await session.delete(room)
                    await session.commit()

            await asyncio.gather(handle_websocket(websocket, user))