from fastapi import APIRouter, HTTPException
from actions import resources
resource_router = APIRouter()


@resource_router.get("/")
def read_devices():
    return resources.get_devices_internal()