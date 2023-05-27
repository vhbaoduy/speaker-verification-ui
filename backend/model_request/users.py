from pydantic import BaseModel
from typing import List
from fastapi import UploadFile, File, Form

class UserRequest(BaseModel):
    username: str  = Form()
    # data: List[UploadFile] = File()