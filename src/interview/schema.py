import json
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
class ExampleSchema(BaseModel):
    
    id:int
    enter:str
    out:str

class Exam(BaseModel):
    out:str
    enter:str
    task_id:int
class TaskSchema(BaseModel):
    
    name:str
    
    task:str
    
    # examples:list[ExampleSchema]
    
    params:str
    
    tests:list[dict] | str 
    
    dificalty:Dif