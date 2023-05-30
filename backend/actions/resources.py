from core_ai import utils, CORE_CONTROLLER
from fastapi import HTTPException


def get_devices_internal():
    try:
        devices = utils.get_all_devices()
        models = CORE_CONTROLLER.get_available_models()
        data_resp = {
            "devices": devices,
            "models": models
        }
        return {"success": True,
                "data": data_resp}
    except:
        return HTTPException(status_code=500)
