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
    
    
    
    # active_task:Mapped[int]  = 

class Messages(Base):
    
    __tablename__ = 'messages'
    
    id:Mapped[int] = mapped_column(primary_key=True)
    
    
    room_id:Mapped[int] = mapped_column(ForeignKey("rooms.id", ondelete="CASCADE"))
    user_id:Mapped[int] = mapped_column(ForeignKey("people.id", ondelete="CASCADE"))
    
    
    user:Mapped["People"] = relationship(uselist=False)
    
    
    message:Mapped[str]
    