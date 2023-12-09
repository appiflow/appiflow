import os
from template import rule_handler as rh
from  dto import rule_dto
from util import logger


log = logger.get_logger(__name__)

class CreateFolder(rh.RuleHandler):
    def init():
        super()
        
    def handle(self, rule: rule_dto.Rule):
        path:str = "/home/hemanth/Desktop/Temp/Temp1"
        try:
            # Create the folder and any necessary parent folders
            os.makedirs(path)
            log.info(f"Folder created successfully at {path}")
        except OSError as e:
            # Handle the case where the folder already exists or other errors
            log.error(f"Error creating folder at {path}: {e}")

