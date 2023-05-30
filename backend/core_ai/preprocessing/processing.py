from typing import Any
import librosa
import noisereduce as nr
import soundfile as sf
import torchaudio
import numpy as np
from pydub import AudioSegment
from pydub.silence import split_on_silence



class DataPreprocessing(object):
    '''
        Build pipeline to preprocess audio data
    '''
    def __init__(self, 
                 sampling_rate:int,
                 duration:int,
                 context_num_stack:int,
                 top_db: int):
        '''
        Process data for matching from audio
        Args:
            sampling_rate: sampling rate of data
            duration: duration of speech
            context_num_stack: the number of stack to expand space
            top_db: db to remove silence
        '''
        self.sr = sampling_rate
        self.length = sampling_rate * duration + 240 # Calculate time of audio
        self.num_stack = context_num_stack


    def __call__(self,data):
        '''
            Pipeline to process data
        '''
        data = self.reduce_noise(data)
        data = self.remove_silence(data)
        return self.process_data(data)


    def reduce_noise(self, data):
        '''
            Reduce noise of audio data
        '''
        reduced_noise =  nr.reduce_noise(y=data, 
                                sr=self.sr,
                                stationary=False)
        return reduced_noise
    
    def remove_silence(self, audio, top_db=10):
        '''
            Remove silence in data
        '''
        audio_trim,_ = librosa.effects.trim(audio, top_db=top_db)
        # wav_data = []
        # for c in clips:
        #     # print(c)
        #     data = audio[c[0]: c[1]]
        #     wav_data.extend(data)
        return np.array(audio_trim)
    
    def process_data(self,audio):
        '''
            Process data as input of extractor
        '''
        # Append original data
        data1  = np.stack([audio], axis=0).astype(np.float32)
        
        if audio.shape[0] <= self.length:
            # Add padding by wrap
            shortage = self.length - audio.shape[0]
            audio = np.pad(audio, (0, shortage), 'wrap')
        

        # Generate more context with fixed length
        data2 = []
        startframe = np.linspace(0, audio.shape[0]- self.length, num=self.num_stack)
        for asf in startframe:
            data2.append(audio[int(asf):int(asf)+self.length])
        data2 = np.stack(data2, axis = 0).astype(np.float32)
        return data1,data2
        
