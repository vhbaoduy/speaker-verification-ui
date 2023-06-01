'''
This part is used to train the speaker model and evaluate the performances
'''

import torch
import torch.nn as nn
import warnings
from .ecapa_tdnn import ECAPA_TDNN
import torch.nn.functional as F
import time
import numpy as np
warnings.filterwarnings("ignore", category=DeprecationWarning)


class EmbeddingExtractor(nn.Module):
    def __init__(self, 
                 C:int, 
                 device:str):
        ''' 
            Init object fore embedding extractor
            Args:
                C: the number of channel of ECAPA-TDNN model
                device: device to computing (cpu, cuda:... )
        '''
        super(EmbeddingExtractor, self).__init__()

        # ECAPA-TDNN
        self.speaker_encoder = ECAPA_TDNN(C=C).to(device)
        self.device = device
        print(time.strftime("%m-%d %H:%M:%S") + " Model para number = %.2f" % (
            sum(param.numel() for param in self.speaker_encoder.parameters()) / 1024 / 1024))

    def extract_embedding(self,
                          audio:np.ndarray):
        ''' 
            Extract embedding features from audio
            Args:
                audio: numpy array with N x M shape, N: the number of audio, M: length of each audio
        '''
        self.eval()
        # data = self.process_audio(audio)
        data = torch.Tensor(audio)
        data = data.to(self.device)
        embeddings = self.speaker_encoder.forward(data, aug=False)
        embeddings = F.normalize(embeddings, p=2, dim=1)
        return embeddings
    
    def load_parameters(self, 
                        path:str):
        '''
            Load parameters from pretrained model
            Args:
                path: path to pretrained model
        '''
        self_state = self.state_dict()
        loaded_state = torch.load(path, map_location=self.device)
        for name, param in loaded_state.items():
            origname = name
            if name not in self_state:
                name = name.replace("module.", "")
                if name not in self_state:
                    # print("%s is not in the model." % origname)
                    continue
            if self_state[name].size() != loaded_state[origname].size():
                # print("Wrong parameter length: %s, model: %s, loaded: %s" % (
                #     origname, self_state[name].size(), loaded_state[origname].size()))
                continue
            self_state[name].copy_(param)
    

