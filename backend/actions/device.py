from core_ai import CORE_CONTROLLER, LOG, utils, validation
from fastapi import HTTPException
from model_request import ConfigRequest


def get_devices_internal():
    try:
        return utils.get_all_devices()
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