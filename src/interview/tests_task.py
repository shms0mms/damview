import asyncio
from typing import Optional
from sqlalchemy import select
from sqlalchemy.orm import selectinload



from .models import Messages, People, Room, Tasks
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from ..db  import get_session,session as ssession
from .utils import *
import json

"""
[
    {
    "input":"",
    "answer":"",
        
    }
]
"""

async def tests_task(task_id:int,code:str, session:AsyncSession):
    task:Tasks = await session.scalar(select(Tasks).options(selectinload(Tasks.category), selectinload(Tasks.examples)).where(Tasks.id == task_id))
    if task:
            code = f"def main({task.params}):\n" + code
            my_namespace = {}
            code =code.replace("\\n", "\n")
        
        
            try:
                exec(code, my_namespace)
                
            except BaseException as e:
                return e
            tests = json.loads(task.tests)
            results = []
            counts = 0
            work = 0
            for i in tests:
                counts +=1
                input_test = i["input"]
                answer_test =i["answer"]

                try:
                                
                    a = my_namespace["main"](**input_test)
                    
                    if a == answer_test:
                        work+=1
                        results.append({"input_test":input_test,"answer_test":answer_test, "work":True, "your_answer_test":a})
                    else:
                        results.append({"input_test":input_test,"answer_test":answer_test, "work":False, "your_answer_test":a})
                        
                except BaseException as e:
                    results.append({"input_test":input_test,"answer_test":answer_test, "work":"error", "error":e})

            pass_tests = {
                "results":results,
                "count_tests":counts,
                "work":work
            }        
            return pass_tests        
            
    return {"main":123}
# print(tests_task(task_id=2,session=2,code="        left, right = 0, len(nums) - 1\n        while left <= right:\n            mid = left + (right - left) // 2\n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                left = mid + 1\n            else:\n                right = mid - 1\n        return left"))


