from ..extractors import manager

'''
    Validate configs from users
'''


def check_valid_device(device: str):
    '''
        Check valid device from user
        Args:
            device: input device as [cpu, cuda:n]
        Return: whether it is available or not
    '''
    if not isinstance(device, str):
        return False
    if device == "cpu":
        return True
    if not device.startswith("cuda:") or not device[5:].isnumeric():
        return False
    return True

def check_channel_of_extractor(channel:int):
    '''
        Check available models
        Args:
            channel: config of model
        Return: whether it is available or not
    '''
    if not isinstance(channel, int):
        return False
    return channel in manager.MODEL_TYPES.keys()

def check_threshold(threshold:float):
    '''
        Check threshold in range or not
        Args:
            threshold: threshold input from user
        Return: whether it is available or not
    '''
    if not isinstance(threshold, float):
        return False
    
    if not (0 <= threshold <= 1):
        return False

    return True

