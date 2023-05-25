from .verification import SpeakerVerification
from .utils import *
from .local_config import Configs
from .extractors import manager


class CoreAIController:
    def __init__(self):
        self.configs = read_config(Configs.PATH_TO_CONFIG)
        manager.download_all_models(self.configs['root'])
        self.instance = None

    def get_available_models(self):
        return manager.MODEL_TYPES
    
    def get_available_channels(self):
        return manager.MODEL_TYPES.keys()

    def get_config(self):
        return self.configs
    
    def check_instance(self):
        '''
            Check current instance
        '''
        return self.instance is not None

    def update_config(self, new_configs):
        '''
            Update configs
        '''
        self.configs = new_configs
        if self.check_instance():
            del self.instance
            self.instance = self.creat_AI_instance()

    def creat_AI_instance(self):
        '''
            Get instance of core
        '''
        if self.instance is not None:
            instance = SpeakerVerification(configs=self.configs)
        return instance