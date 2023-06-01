# from fastapi import APIRouter, HTTPException, Header,Form
from pydantic import BaseModel
from actions import users
from fastapi import Path, File, Form, UploadFile, HTTPException, APIRouter
from typing import List

user_router = APIRouter()


@user_router.get("/")
async def get_users():
    '''
        Get all users from database
    '''
    return users.get_users_internal()

@user_router.post("/")
async def create_user(user: str= Form(), 
                      data: List[UploadFile]=File()):
    '''
        Add new user to database
    '''
    # print(json.loads(user))
    # print(data)
    return await users.create_user_internal(user, data)

@user_router.delete("/{user}")
async def delete_user(user:str = Path()):
    '''
        Delete user from database
    '''
    return users.delete_user_internal(user)
    


@user_router.post("/verify")
async def verify_user(data: UploadFile=File()):
    return await users.verify_user_interal(data)
