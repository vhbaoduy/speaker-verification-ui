from fastapi import APIRouter, HTTPException
from actions import configs as cfgs
from model.request import ConfigRequest
config_router = APIRouter()


@config_router.get("/")
def read_configs():
    '''
        Read default config or user config
    '''
    return cfgs.get_configs_internal()

@config_router.post("/")
async def set_configs(req: ConfigRequest):
    '''
        Change config
    '''
    return cfgs.set_configs_internal(req)




