from template import rule_handler as rh
from  dto import rule_dto
import shutil
from util import logger


log = logger.get_logger(__name__)

class CopyFileRuleHandler(rh.RuleHandler):
    def init():
        super()
        
    def handle(self, rule: rule_dto.Rule) -> None:
        source_path:str = "/home/hemanth/Desktop/brt.py"
        destination_path:str ="/home/hemanth/Desktop/brt1.py"
        try:
            shutil.copy(source_path, destination_path)
            print(f"File copied from {source_path} to {destination_path}")
        except FileNotFoundError:
            print(f"Source file '{source_path}' not found.")
        except PermissionError:
            print(f"Permission denied to copy file.")
        except Exception as e:
            print(f"An error occurred: {str(e)}")