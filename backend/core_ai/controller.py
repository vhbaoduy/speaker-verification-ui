from .verification import SpeakerVerification
from .utils import *
from .configs import Configs
from .extractors import manager





class CoreAIController:
    def __init__(self, configs):
        self.configs = configs
        self.instance = None
        self.set_up()

    def set_up(self):
        '''
            Download all models and create instance for verification
        '''
        manager.download_all_models(Configs.ROOT)
        self.creat_AI_instance()

    
    def get_config(self):
        '''
            Get current configs of controller
        '''
        return self.configs

    def get_available_models(self):
        '''
            Get all available models from server
        '''
        models = []
        for channel in manager.MODEL_TYPES:
            models.append({"id": channel, "name":manager.MODEL_TYPES[channel]})
        return models
    
    def get_available_devices(self):
        '''
            Get all available devices
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
    
    
    def check_instance(self):
        '''
            Check current instance
        '''
        return self.instance is not None

    def update_config(self, new_configs:dict):
        '''
            Update configs
        '''
        self.configs = new_configs
        self.creat_AI_instance()

    def creat_AI_instance(self):
        '''
            Get instance of core
        '''
        device = self.configs['device']
        if device != 'cpu':
            available_devices = self.get_available_devices()
            run_cpu = True
            for d in available_devices:
                if device == d['id']:
                    run_cpu = False
                    break
            if run_cpu:
                self.configs['device'] = 'cpu'
        del self.instance
        self.instance = SpeakerVerification(configs=self.configs)