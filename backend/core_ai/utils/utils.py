import numpy as np
import soundfile as sf
import io
import torch
import librosa
import json
import os
from pydub import AudioSegment


TEMP_PATH = "./temp_files"


def convert_bytes_to_array(wav_bytes,sr):
    '''
        Convert wav bytes to numpy array
        Args:
            wav_bytes: bytes of data
            sr: sampling rate
        Return:
            Array data 
    '''
    try:
        # Case upload file
        data, sample_rate = librosa.load(io.BytesIO(wav_bytes), sr=sr)
        # data = sf.read()
    except:
        # Case convert webm to wav
        if not os.path.exists(TEMP_PATH):
            os.mkdir(TEMP_PATH)
        path_webm = os.path.join(TEMP_PATH,'temp.webm')
        with open(path_webm,'wb') as fout:
            fout.write(wav_bytes)
        given_audio = AudioSegment.from_file(path_webm, format='webm')
        path_wav = os.path.join(TEMP_PATH,'temp.wav')
        given_audio.export(path_wav, format="wav")
        data, sample_rate = librosa.load(path_wav, sr=sr)
        os.remove(path_wav)
        os.remove(path_webm)
    
    return data, sample_rate

# def read_config(path):
#     configs = json.load(open(path, 'r'))
#     for type_conf in configs:
#         if type_conf != "default":
#             return configs[type_conf]
#     return configs["default"]

# def write_config(configs, path):
#     return json.dump(configs, open(path, 'w'))