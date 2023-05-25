from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

user_router = APIRouter()


class UserRequest(BaseModel):
    name: str
    wav_bytes: list

@user_router.post("/")
async def create_user(req:UserRequest):
    return create_user_internal(req)


@user_router.post("/verify")
async def create_user_internal(req:UserRequest):
    return verify_user_interal(req)

def verify_user_interal(req:UserRequest):
    pass