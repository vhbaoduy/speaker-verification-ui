import numpy as np
import soundfile as sf
import io
import torch
import librosa
import json
import os
from pydub import AudioSegment


TEMP_PATH = "./temp_files"

def get_all_devices():
    '''
        Get all available device
    '''
    devices = [{
        'id': 'cpu', 'name': 'CPU'
    }]
    
    if torch.cuda.is_available():
        device_count = torch.cuda.device_count()
        if device_count == 1:
            devices.append({
                'id': 'cuda:0',
                'name': torch.cuda.get_device_name(0)
            })
        else:
            for i in range(device_count):
                 devices.append({
                'id': 'cuda:%s'%i,
                'name': torch.cuda.get_device_name(i)
            })
    return devices


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
        # os.remove(path_wav)
        # os.remove(path_webm)
    
    return data, sample_rate

def read_config(path):
    return json.load(open(path, 'r'))

def write_config(configs, path):
    return json.dump(configs, open(path, 'w'))