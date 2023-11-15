from template import rule_handler as rh
from  dto import rule_dto
import shutil
from util import logger


log = logger.get_logger(__name__)

"""
    Class to handle multiple files copy
"""
class CopyAllFilesRuleHandler(rh.RuleHandler):
    def init():
        super()
        
    def handle(self, rule: rule_dto.Rule) -> None:
        """
        Handler to copy multiple files to destination 
        Args:
            rule (Rule): Rule object dto
        """
        
        # TODO: Replace static file paths with dynamic paths from rule
        source_directory:str = "/home/hemanth/Desktop/Temp"
        destination_directory:str ="/home/hemanth/Desktop/Temp1"
        try:
        # Use shutil.copytree to recursively copy the entire directory and its contents
            shutil.copytree(source_directory, destination_directory)
            log.info(f"Directory '{source_directory}' successfully copied to '{destination_directory}'.")
        except Exception as e:
            log.error(f"An error occurred: {e}")