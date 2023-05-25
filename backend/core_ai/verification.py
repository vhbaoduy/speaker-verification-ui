from .extractors import get_extractor, get_model_path
from .matching import compute_score
from .utils import convert_bytes_to_array, process_data
from .local_config import Configs

class SpeakerVerification:
    def __init__ (self, 
                  configs):
        self.configs = configs
        self.extractor = get_extractor(channel=configs["extractor"]["channel"],
                                                  path=get_model_path(configs["root"],configs["extractor"]["channel"]),
                                                  device=configs["device"])
        self.threshold = configs["threshold"]
        

    def extract_feature(self, wave_bytes):
        audio = convert_bytes_to_array(wave_bytes, 
                                             Configs.SAMPLING_RATE)
        data = process_data(audio, 
                                  Configs.SAMPLING_RATE,
                                  Configs.DURATION,
                                  Configs.NUM_STACK)
        feats = self.extractor.extract_embedding(data)
        return feats
    
    def verify(self, wave_bytes, database):
        feat = self.extract_feature(wave_bytes)
        results = []
        max_score = 0
        decision = False
        id = -1
        for i in database:
            embeddings = database[i]
            accept, score = compute_score(feat, embeddings)
            if accept:
                if score >= max_score:
                    max_score = score
                    id = i
                decision = True
            results.append({
                "accept": accept,
                "score": score,
                "id": i,
            })
        return (decision, max_score, id)
        