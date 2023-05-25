from pydantic import BaseModel

class ConfigRequest(BaseModel):
    device: str
    extractor_channel: int
    min_duration: int
    root: str
    threshold: float