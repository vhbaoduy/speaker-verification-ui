from apis.configs import config_router
from apis.users import user_router
from apis.devices import device_router
from fastapi import APIRouter


api_router = APIRouter()
api_router.include_router(config_router, prefix='/configs', tags=['config'])
api_router.include_router(user_router, prefix='/users', tags=['users'])
api_router.include_router(device_router, prefix='/devices', tags=['devices'])