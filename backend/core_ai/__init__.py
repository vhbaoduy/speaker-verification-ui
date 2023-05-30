from .extractors import *
from .utils import *
from .verification import *
from .controller import CoreAIController
from .validation import *

CORE_CONTROLLER = CoreAIController()
# asyncio.run(CORE_CONTROLLER.set_up())