from core_ai import LOG, utils, validation
from fastapi import HTTPException
from model.request import ConfigRequest
from initlization import core_controller
from database import get_config, config_db, CONFIG_TYPE, user_db
from model.error_code import ErrorStatusCode


def get_configs_internal():
    try:
        config = get_config()
        devices = core_controller.get_available_devices()
        models = core_controller.get_available_models()
        data_resp = {
            "devices": devices,
            "models": models
        }
        return {
            "success": True,
            "data": {
                "config": config,
                "resources": data_resp
            }
        }
    except:
        return  {
            "success": False,
            "data": [],
            "message": "Error from internal server!",
            "code": ErrorStatusCode.ERROR_INTERNAL
        }
def set_configs_internal(req: ConfigRequest):
    if validation.check_valid_device(device=req.device) and \
        validation.check_channel_of_extractor(channel=req.model) and \
        validation.check_threshold(threshold=req.threshold):
        
        current_config = core_controller.get_config()
        
        # Clear all database
        if current_config["model"] != req.model:
            user_db.delete_many({})
        config = dict(req)
        core_controller.update_config(config)
        # cursor = config_db.find_one({"type": CONFIG_TYPE["user"]})
        # if cursor is None:
        #     config_db.insert_one({"type": CONFIG_TYPE["user"],"config": config})
        # else:
        config_db.update_one({"type": CONFIG_TYPE["user"]},
                             {"$set": {"configs": config}},
                             upsert=True)
        return {"success": True,
                "message": "Update configuration successfully!"}
    else:
        return {"success": False,
                "message": "Update configuration failed!"}