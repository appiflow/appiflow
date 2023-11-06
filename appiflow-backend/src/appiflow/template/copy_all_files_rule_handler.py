from template import rule_handler as rh
from  dto import rule_dto
import shutil
from util import logger


log = logger.get_logger(__name__)

class CopyAllFilesRuleHandler(rh.RuleHandler):
    def init():
        super()
        
    def handle(self, rule: rule_dto.Rule) -> None:
        source_directory:str = "/home/hemanth/Desktop/Temp"
        destination_directory:str ="/home/hemanth/Desktop/Temp1"
        try:
        # Use shutil.copytree to recursively copy the entire directory and its contents
            shutil.copytree(source_directory, destination_directory)
            print(f"Directory '{source_directory}' successfully copied to '{destination_directory}'.")
        except Exception as e:
            print(f"An error occurred: {e}")