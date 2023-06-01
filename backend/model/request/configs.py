from pydantic import BaseModel

class ConfigRequest(BaseModel):
    device: str
    model: int
    threshold: float