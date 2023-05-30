from model.request.users import UserRequest
from fastapi import UploadFile
from core_ai import CORE_CONTROLLER
from database import user_db, user_testing_db
from bson.binary import Binary
import pickle
from model.error_code import ErrorStatusCode
import traceback


# Store 2 fields



def get_users_internal():
    '''
        Get all registered users in database
        Return: List of users in database
    '''
    users = []
    cursors = user_db.find({})
    if cursors is not None:
        for item in cursors:
            users.append(item["username"])
    return {
        "success": True,
        "data": users,
    }


async def create_user_internal(user:str, data):
    '''
        Add user and feature in to database
        Args:
            user: username for registration
            data: list of voice to extract feature
        Return: action status of user enrollment
    '''
    # print(sf.available_formats())
    if len(data) > 0:
        # Check exist user
        cursor = user_db.find_one(filter={
            "username": user
        })
        if cursor is not None:
            return {
                    "success": False,
                    "message": "Username is existed !",
                    "code": ErrorStatusCode.USER_NOT_FOUND
                }
        wav_array = []
        for element in data:
            wav_bytes = element.file.read()
            wav_array.append(wav_bytes)

        embedding = CORE_CONTROLLER.instance.extract_features(wav_array)
        # print(embedding.size())
        id = user_db.insert_one({
            "username": user,
            "features": Binary(pickle.dumps(embedding,protocol=2))
        })
        if id is not None:
            return {
                "success": True,
                "message": "Enroll successfully !"
            }

        return {
                "success": False,
                "message": "Enroll failed !",
                "code":  ErrorStatusCode.ERROR_INTERNAL
            }
            
    else:
        return {"success": False,
                "message": "Not found voice data",
                "code": ErrorStatusCode.VOICE_NOT_FOUND}
    
async def verify_user_interal(data: UploadFile):
    '''
        Verify current voice where is in database or not
        Args:
            data: voice of user attemp to join system
        Return: Accept/Reject
    '''
    # Query all user in database
    user_cursors = user_db.find({})
    if user_cursors is None:
        return {
            "success": False,
            "message": "Not found user in database",
            "code": ErrorStatusCode.USER_NOT_FOUND
        }

    # try:
    wav_bytes = data.file.read()
    # print(wav_bytes)
    # embedding = CORE_CONTROLLER.instance.extract_feature([wav_bytes])
    feat_db = []
    for user in user_cursors:
        enrolled_embedding = pickle.loads(user["features"])
        feat_db.append(enrolled_embedding)
    # print(feat_db)
    result = CORE_CONTROLLER.instance.verify(wav_bytes,feat_db)
    
    # return {
    #     "status": True,
    #     "message": "OK",
    #     "data": result
    #     # "code": ErrorStatusCode.ERROR_INTERNAL
    # }

    # except Exception as e:
    #     print(e)
    #     print(traceback.format_exc())
    return {
        "success": False,
        "message": "Error internal",
        "code": ErrorStatusCode.ERROR_INTERNAL
    }


def delete_user_internal(user:str):
    '''
        Delete enrolled user in database

        Args:
            user: username in database
        Return: status for delete for action
    '''
    pattern = {"username": user}
    cursor = user_db.find_one(pattern)
    if cursor is None:
        return {"success": False,
                "message": "User is not found !",
                "code": ErrorStatusCode.USER_NOT_FOUND}
    
    st = user_db.delete_one(pattern)
    if st is not None:
        return {
            "success": True,
            "message": "Deleted successfully !"
        }
    return {
        "success": False,
        "message": "Error from internal.",
        "code": ErrorStatusCode.USER_NOT_FOUND
    }