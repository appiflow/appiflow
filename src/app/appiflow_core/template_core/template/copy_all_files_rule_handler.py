from appiflow_core.template_core.template import rule_handler as rh
from appiflow_core.template_core.dto import rule_dto
import shutil
from appiflow_core.template_core.util import logger
from appiflow_core.template_core.dto import rule_response

log = logger.get_logger(__name__)

"""
    Class to handle multiple files copy
"""
class CopyAllFilesRuleHandler(rh.RuleHandler):
    def init():
        super()
        
    def handle(self, rule: rule_dto.Rule) -> rule_response.RuleResponse:
        """
        Handler to copy multiple files to destination 
        Args:
            rule (Rule): Rule object dto
        """
        
        source_path:str = os.path.join(rule.source_location, rule.source_name) 
        destination_path:str = os.path.join(rule.target_location, rule.target_name) 
        try:
        # Use shutil.copytree to recursively copy the entire directory and its contents
            shutil.copytree(source_path, destination_path)
            log.info(f"Directory '{source_path}' successfully copied to '{destination_path}'.")
        except FileNotFoundError:
            log.exception(f"Source file '{source_path}' not found.")
        except PermissionError:
            log.exception(f"Permission denied to copy file.")
        except Exception as e:
            log.exception(f"An error occurred: {str(e)}")
        
        return rule_response.RuleResponse()