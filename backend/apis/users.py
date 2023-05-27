# from fastapi import APIRouter, HTTPException, Header,Form
from pydantic import BaseModel
from actions import users
from model_request.users import UserRequest
from fastapi import FastAPI, File, Form, UploadFile, HTTPException, APIRouter
from typing import List, Union
from typing_extensions import Annotated

import json


user_router = APIRouter()


# class UserRequest(BaseModel):
#     name: str
#     wav_bytes: list

# @user_router.post("/file")
# async def get_file( file: UploadFile = File()):
#     print(file)
#     return {'status': True}

# @user_router.post("/files")
# async def get_files( files: List[UploadFile]):
#     print(files)
#     return {'status': True}

@user_router.post("/")
async def create_user(user: str= Form(), 
                      data: List[UploadFile]=File()):
    # print(json.loads(user))
    print(data)
    return users.create_user_internal(user, data)


@user_router.post("/verify")
async def verify_user(req:UserRequest):
    return users.verify_user_interal(req)
