
# Dynamic configuration
DEFAULT_CONFIGS = {
    "model": 256,
    "device": "cpu",
    "threshold": 0.5
}

def get_default_config():
    return DEFAULT_CONFIGS


# Hard configuration
class Configs:
    ROOT = '../' # for docker 
    SAMPLING_RATE = 16000   # sampling rate 
    DURATION = 4    # audio length
    NUM_STACK = 3 # for process data
    TOP_DB = 50 # for silence removing
    NUM_ENROLLMENTS = 3    