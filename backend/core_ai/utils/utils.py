import numpy as np
import soundfile as sf
import io
import torch
import librosa
import json



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
    data, sample_rate = librosa.load(io.BytesIO(wav_bytes), sr=sr)
    return data, sample_rate


def load_embeddings(path):
    '''
        Load embeddings from path
    '''
    try:
        data = np.load(path)
    except:
        raise Exception('Feature not found in path %s' %path)
    return data


def process_data(audio,
                 sr,
                 duration,
                 num_stack):
    '''
        Process data for matching from audio
        Args:
            audio: the sample data
            sr: sampling rate
            duration: duration of speech
            num_stack: the number of stack to expand space
    '''
    if num_stack ==1 :
        return np.stack([audio],axis=0)
    length = sr * duration + 240 # Compute the number of samples
    if audio.shape[0] <= length:
        shortage = length - audio.shape[0]
        audio = np.pad(audio, (0, shortage), 'wrap')
    else:
        audio = audio[0: length]

    # data1 = np.stack([audio],axis=0)
    data2 = []
    startframe = np.linspace(0, audio.shape[0]-length, num=num_stack)
    for asf in startframe:
        data2.append(audio[int(asf):int(asf)+length])
    data2 = np.stack(data2, axis = 0).astype(np.float32)
    return  data2

def read_config(path):
    return json.load(open(path, 'r'))

def write_config(configs, path):
    return json.dump(configs, open(path, 'w'))