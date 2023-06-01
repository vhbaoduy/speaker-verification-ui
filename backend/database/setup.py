from database import get_collection, db_instance
from core_ai import get_default_config

CONFIG_TYPE = {
    "default": "default",
    "user": "user"
}

# Get user collection
user_db = get_collection(db_instance,"users")

user_testing_db = get_collection(db_instance, "users_testing")


# Get config collection
config_db = get_collection(db_instance,"configs")

def init_default_config():
    '''
        Init default config of system
    '''
    cursor = config_db.find_one({"type": CONFIG_TYPE["default"]})
    if cursor is None:
        config_db.insert_one({"type": CONFIG_TYPE["default"],
                            "configs": get_default_config()})

def get_config():
    '''
        Get configs to response the client. Return the config of user if it is existed or return the default config
    '''
    configs = config_db.find_one({"type":CONFIG_TYPE["user"]})
    if configs is not None:
        return configs["configs"]
    default_config = config_db.find_one({"type":CONFIG_TYPE["default"]})
    if default_config is not None:
        return default_config["configs"]
    return get_default_config()