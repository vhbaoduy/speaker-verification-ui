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
        return {"status": True,
                "data": data_resp}
    except:
        return HTTPException(status_code=500)
# def set_configs_internal(req: ConfigRequest):
#     if validation.check_valid_device(device=req.device) and \
#         validation.check_channel_of_extractor(channel=req.channel) and \
#         validation.check_threshold(threshold=req.threshold):
#         CORE_CONTROLLER.update_config(req)
#         return {"status": True,
#                 "message": "Update configuration successfully!"}
#     else:
#         return {"status": False,
#                 "message": "Update configuration failed!"}