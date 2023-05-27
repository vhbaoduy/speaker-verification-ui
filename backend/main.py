from typing import Union
from fastapi import FastAPI, HTTPException
from apis.base import api_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import asyncio

server_api = FastAPI()

server_api.include_router(api_router, prefix='/api')


configs = {
    'host': 'localhost',
    'port': 8000,
}
origins = [
    "http://localhost:3000",
    "localhost:3000"
]
server_api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)




if __name__ == '__main__':
    uvicorn.run('main:server_api',
                host=configs['host'],
                port=configs['port'])