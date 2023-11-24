from template_core.template import rule_handler as rh
from template_core.dto import rule_dto
import shutil
from template_core.util import logger


log = logger.get_logger(__name__)

"""
Class to handle single file copy
"""
class CopyFileRuleHandler(rh.RuleHandler):
    def init():
        super()
        
    def handle(self, rule: rule_dto.Rule) -> None:
        """
        Handler to copy single file to destination 
        Args: 
            rule (Rule): Rule object dto
        """
        
        # TODO: Replace static file paths with dynamic paths from rule
        source_path:str = "/home/hemanth/Desktop/brt.py"
        destination_path:str ="/home/hemanth/Desktop/brt1.py"
        try:
            shutil.copy(source_path, destination_path)
            log.info(f"File copied from {source_path} to {destination_path}")
        except FileNotFoundError:
            log.error(f"Source file '{source_path}' not found.")
        except PermissionError:
            log.error(f"Permission denied to copy file.")
        except Exception as e:
            log.error(f"An error occurred: {str(e)}")