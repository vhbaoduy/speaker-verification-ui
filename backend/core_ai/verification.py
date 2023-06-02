from .extractors import get_extractor, get_model_path
# from .matching import compute_score
from .utils import convert_bytes_to_array
from .configs import Configs
from .preprocessing import DataPreprocessing
import numpy as np
from typing import List
import soundfile as sf

class SpeakerVerification:
    def __init__ (self, 
                  configs: dict):
        self.configs = configs
        path = get_model_path(Configs.ROOT,
                              configs["model"])
        
        self.extractor = get_extractor(channel=configs["model"],
                                        path=path,
                                        device=configs["device"])
        self.threshold = configs["threshold"]
        self.preprocessor = DataPreprocessing(sampling_rate=Configs.SAMPLING_RATE,
                                              duration=Configs.DURATION,
                                              context_num_stack=Configs.NUM_STACK,
                                              top_db=Configs.TOP_DB)

    def extract_features(self, wave_bytes:List[bytes]):
        feats = []
        # Process each file from client
        for wav in wave_bytes:
            # Convert bytes from file to wav
            audio, _ = convert_bytes_to_array(wav, 
                                                Configs.SAMPLING_RATE)
            
            # Process audio
            data1, data2 = self.preprocessor(audio)
            # sf.write('temp.wav',data1[0],16000)
            feat1 = self.extractor.extract_embedding(data1)
            feat2 = self.extractor.extract_embedding(data2)
            # Convert from tensor to numpy
            # print(feat1.size())
            feats.extend(feat1.detach().cpu().numpy())
            feats.extend(feat2.detach().cpu().numpy())
        # data = np.array(data)
        feats = np.stack(feats,axis=0)
        return feats
    
    def compute_score(self,
                    embedding1: np.ndarray,
                    embedding2: np.ndarray):
        '''
            Compute similarity score between two embeddings
            Args:
                embeddings1: npdarray with N x 192
                embedings2: npdarray with M x 192
            
            Return: Cosine score between two embeddings
        '''
        score = np.max(np.dot(
                    embedding1, embedding2.T))
        return score
    
    def verify(self, 
               wav_data: bytes, 
               database: List[np.ndarray]):
        '''
            Verify the user with all users in database
            Args:
                wav_data: bytes from user
                database: list of feature of enrolled users
            Return:
                decision: accept/reject user
                max_score: similarity score between attemp user and users in database
                id: id of user in list
                threshold: current threshold to consider
        '''
        feat = self.extract_features([wav_data])
        results = []
        max_score = 0
        decision = False
        id = -1
        for (i,feat_db) in enumerate(database):
            # embeddings = database[i]
            score = self.compute_score(feat, feat_db)
            if score >= max_score:
                max_score = score
                id = i
            results.append({
                "score": score,
                "id": i,
            })
        if max_score > self.threshold:
            decision = True
        print(results)
        return (decision, float(max_score), id, self.threshold)
        