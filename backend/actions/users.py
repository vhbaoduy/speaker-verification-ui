from model_request.users import UserRequest
import os
import librosa
import core_ai
import io
import soundfile as sf
from core_ai import CORE_CONTROLLER



async def create_user_internal(user:str, data):
    wav_array = []
    for element in data:
        wav_bytes = element.file.read()
        wav_array.append(wav_bytes)
    embedding = CORE_CONTROLLER.instance.extract_feature(wav_array)
    print(embedding.size())
        # break
    
    return {"status": True}

def verify_user_interal(req:UserRequest):
    pass