from typing import Optional
from fastapi_filter.contrib.sqlalchemy import Filter

from .models import Dif, Tasks


class FilterTasks(Filter):
    name__like:Optional[str]
        
    dificalty:Optional[Dif]
    
        
    class Constants(Filter.Constants):
        model = Tasks