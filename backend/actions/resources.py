from core_ai import utils
from fastapi import HTTPException
from initlization import core_controller


def get_devices_internal():
    '''
        Get available devices from server:
            - devices: cpu or gpu ...
            - models: model configuartion
    '''
    try:
        devices = core_controller.get_available_devices()
        models = core_controller.get_available_models()
        data_resp = {
            "devices": devices,
            "models": models
        }
        return {"success": True,
                "data": data_resp}
    except:
        return HTTPException(status_code=500)
