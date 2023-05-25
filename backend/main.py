from typing import Union
from fastapi import FastAPI, HTTPException
from apis.base import api_router
server_api = FastAPI()


server_api.include_router(api_router)