from typing import Optional
from pydantic import BaseModel
from .models import Role







class PeopleAdd(BaseModel):
    fio:str
    role:Role
    
class MessagesSchema(BaseModel):
    
    user:PeopleAdd
    
    message:str
    
    
    

class ResponeAfterCreate(BaseModel):
    
    userId:int
    
    
    role:Role
    
    roomMessages:list[MessagesSchema] | list
    