import uuid
from ..db import Base


from enum import Enum
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

class Role(Enum):
    interviewer = "interviewer"
    interviewee = "interviewee" 

class People(Base):
    
    __tablename__ ="people"
    id:Mapped[int] = mapped_column(primary_key=True)
    
    fio:Mapped[str] 
    
    role:Mapped[Role]
    
    room_id:Mapped[int] = mapped_column(ForeignKey("rooms.id", ondelete="CASCADE"), nullable=True)

class Room(Base):
    __tablename__ = "rooms"
    
    id:Mapped[uuid.UUID] = mapped_column(primary_key=True)
    
    
    messages:Mapped[list["Messages"]] = relationship(uselist=True)
    
    
    
    peoples:Mapped[list["People"]] = relationship(uselist=True)
    code:Mapped[str] = mapped_column(nullable=True)
    
    task_id:Mapped[int] = mapped_column(ForeignKey("tasks.id"), nullable=True)
    
    task:Mapped["Tasks"] = relationship(uselist=False)
    
    
    
    # active_task:Mapped[int]  = 

class Messages(Base):
    
    __tablename__ = 'messages'
    
    id:Mapped[int] = mapped_column(primary_key=True)
    
    
    room_id:Mapped[int] = mapped_column(ForeignKey("rooms.id", ondelete="CASCADE"))
    user_id:Mapped[int] = mapped_column(ForeignKey("people.id", ondelete="CASCADE"))
    
    
    user:Mapped["People"] = relationship(uselist=False)
    
    
    message:Mapped[str]





class CategoryTask(Base):
    
    __tablename__ = "CategoryTask"
    category_id:Mapped[int] = mapped_column(ForeignKey("category.id"),primary_key=True)
    
    task_id:Mapped[int] = mapped_column(ForeignKey("tasks.id"), primary_key=True)







class Category(Base):
    
    __tablename__ = 'category'
    
    id:Mapped[int] = mapped_column(primary_key=True)

    name:Mapped[str]
    
    tasks:Mapped[list["Tasks"]] =relationship(uselist=True,secondary="CategoryTask")
    







class Tasks(Base):
    
    __tablename__ = "tasks"
    
    id:Mapped[int] = mapped_column(primary_key=True)
    
        
    name:Mapped[str]
    
    task:Mapped[str]
    
    exec_input:Mapped[str]
    
    exec_answer:Mapped[str]
    
    category:Mapped[list["Category"]] =relationship(uselist=True,secondary="CategoryTask")

    params:Mapped[str]
    
    tests:Mapped[str]    