from appiflow_core.template_core.template import rule_handler as rh
from appiflow_core.template_core.dto import rule_dto
import os
from appiflow_core.template_core.util import logger
from appiflow_core.template_core.dto import rule_response

log = logger.get_logger(__name__)

"""
Class to handle folder creation
"""
class CreateFolderRuleHandler(rh.RuleHandler):
    def init():
        super()
        
    def handle(self, rule: rule_dto.Rule) -> rule_response.RuleResponse:
        """
        Handler to create folder
        Args: 
            rule (Rule): Rule object dto
        """
        
        path:str = os.path.join(rule.target_location, rule.target_name) 
        try:
            os.mkdir(path)
            log.info(f"Directory {rule.target_name} created at {rule.target_location}")
        except FileNotFoundError:
            log.exception(f"Target directory '{rule.target_location}' not found.")
        except PermissionError:
            log.exception(f"Permission denied to create directory.")
        except Exception as e:
            log.exception(f"An error occurred: {str(e)}")
        
        return rule_response.RuleResponse()