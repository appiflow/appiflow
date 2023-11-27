from template_core.template import rule_handler as rh
from template_core.dto import rule_dto
import shutil
import os
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
            
        source_path:str = os.path.join(rule.source_location, rule.source_name) 
        destination_path:str = os.path.join(rule.target_location, rule.target_name) 
        try:
            shutil.copy(source_path, destination_path)
            log.info(f"File copied from {source_path} to {destination_path}")
        except FileNotFoundError:
            log.exception(f"Source file '{source_path}' not found.")
        except PermissionError:
            log.exception(f"Permission denied to copy file.")
        except Exception as e:
            log.exception(f"An error occurred: {str(e)}")