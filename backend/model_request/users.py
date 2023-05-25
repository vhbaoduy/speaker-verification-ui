from pydantic import BaseModel

class UserRequest(BaseModel):
    name: str
    wav_bytes: str