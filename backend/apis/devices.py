from fastapi import APIRouter, HTTPException
from actions import device
device_router = APIRouter()


@device_router.get("/")
def read_devices():
    return device.get_devices_internal()