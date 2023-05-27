# from fastapi import APIRouter, HTTPException, Header,Form
from pydantic import BaseModel
from actions import users
from model_request.users import UserRequest
from fastapi import FastAPI, File, Form, UploadFile, HTTPException, APIRouter
from typing import List, Union
from typing_extensions import Annotated

import json


user_router = APIRouter()


@user_router.post("/")
async def create_user(user: str= Form(), 
                      data: List[UploadFile]=File()):
    # print(json.loads(user))
    # print(data)
    return await users.create_user_internal(user, data)


@user_router.post("/verify")
async def verify_user(data: UploadFile=File()):
    return users.verify_user_interal(data)
