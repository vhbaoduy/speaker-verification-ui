from ..extractors import manager


def check_valid_device(device):
    if not isinstance(device, str):
        return False
    if device == "cpu":
        return True
    if not device.startswith("cuda:") or not device[5:].isnumeric():
        return False
    return True

def check_channel_of_extractor(channel):
    if not isinstance(channel, int):
        return False
    return channel in manager.MODEL_TYPES.keys()

def check_threshold(threshold):
    if not isinstance(threshold, float):
        return False
    
    if not (0 <= threshold <= 1):
        return False

    return True

