from core_ai import get_default_config, CoreAIController
import database

database.init_default_config()
config = database.get_config()
core_controller = CoreAIController(configs=config)