'''
This part is used to train the speaker model and evaluate the performances
'''

import torch
import sys
import os
import numpy
import time
import pickle
import torch.nn as nn
import copy
import warnings
from ecapa_tdnn import ECAPA_TDNN
warnings.filterwarnings("ignore", category=DeprecationWarning)


class ECAPAModel(nn.Module):
    def __init__(self, C, device):
        super(ECAPAModel, self).__init__()

        # ECAPA-TDNN
        self.speaker_encoder = ECAPA_TDNN(C=C).to(device)
        self.device = device
        print(time.strftime("%m-%d %H:%M:%S") + " Model para number = %.2f" % (
            sum(param.numel() for param in self.speaker_encoder.parameters()) / 1024 / 1024))

    def extract_embedding(self,audio):
        data = self.process_audio(audio)
        embeddings = self.speaker_encoder.forward(data, aug=False)
        return embeddings
        
    def process_audio(self, audio):
        # Todo: convert bytes to audio
        return audio
    
    def load_parameters(self, path):
        self_state = self.state_dict()
        loaded_state = torch.load(path, map_location=self.device)
        for name, param in loaded_state.items():
            origname = name
            if name not in self_state:
                name = name.replace("module.", "")
                if name not in self_state:
                    print("%s is not in the model." % origname)
                    continue
            if self_state[name].size() != loaded_state[origname].size():
                print("Wrong parameter length: %s, model: %s, loaded: %s" % (
                    origname, self_state[name].size(), loaded_state[origname].size()))
                continue
            self_state[name].copy_(param)
    


if __name__ == '__main__':
    model = ECAPAModel(C=128,device='cpu')
    print(model)
    model.load_parameters('../checkpoints/best_model.model')
    print(model)