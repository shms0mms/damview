from typing import Optional
from pydantic import BaseModel
from .models import Dif, Role







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


class TaskSchema(BaseModel):
    
    name:str
    
    task:str
    
    exec_input:str
    
    exec_answer:str
    
    params:str
    
    tests:str  
    
    dificalty:Dif