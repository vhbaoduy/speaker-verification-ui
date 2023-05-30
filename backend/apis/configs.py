from fastapi import APIRouter, HTTPException
from actions import configs as cfgs
from model.request import ConfigRequest
config_router = APIRouter()


@config_router.get("/")
def read_configs():
    return cfgs.get_configs_internal()

@config_router.post("/")
async def set_configs(req: ConfigRequest):
    return cfgs.set_configs_internal(req)




