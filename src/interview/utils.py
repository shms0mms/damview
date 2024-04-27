
# import types

# [
#     {
#     "data":{},
#     "result":json.string
    
#     },
#     {},{},{}
# ]




# def valid_code(params, code: str, values,func):
#     code_string = f"def func{params}\n" + code
#     my_namespace = {}
    
#     try:
#         exec(code_string, my_namespace)
#         print(my_namespace[func](values[0].get("data")))  
        
#         return True
#     except Exception as e:
#         return e

# print(valid_code("(b23):", "    print(b2)\n    a = 5\n    print(a)\n", [{"data": "some_value"}]))
from redis import Redis
import json

from ..db  import get_session,session as ssession
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from .models import *
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from fastapi import Depends



test_redis ={}


async def add_in_webscoket(room_id, type,websocket,user_id, session):
    
    name = str(room_id)
    webosckets =test_redis.get(name)
    

    
    if webosckets:
        webosckets[type].append([user_id, websocket])
        
        return True
    
    webosckets = {"code":[],"chat":[], "tasks":[]}
    webosckets[type] = [[user_id, websocket]]
    test_redis[name] = webosckets
        
    return True
    
async def get_list(room_id, type,websocket):
    name = str(room_id)
    
    a = test_redis.get(name)
    return a[type]



async def delete_from_list(room_id, type,websocket,user_id, session:AsyncSession ):
    name = str(room_id)
    
    room = await session.scalar(select(Room).options(selectinload(Room.messages),selectinload(Room.peoples)).where(Room.id == room_id))
    user = await session.scalar(select(People).where(People.id == user_id))
    try:
        room.peoples.remove(user)
    except:
        ...



    webosckets =test_redis.get(name)
    if webosckets:
        
        try:
            webosckets[type].remove([user_id, websocket])
        except:
            pass
        if len(webosckets["code"]) == 0 and len(webosckets["chat"]) == 0 and len(webosckets["tasks"]) == 0:
            test_redis.pop(name)
            # await session.delete(room)
            

        
            
    else:
        test_redis.pop(name)

    
    
    await session.commit()
    return True