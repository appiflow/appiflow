from appiflow_core.template_core.dto import rule_dto
from appiflow_core.template_core.template import rule_handler as rh
from appiflow_core.template_core.util import logger
from appiflow_core.template_core.util import template_engine
from appiflow_core.config import get_template_path
from appiflow_core.template_core.dto import rule_response
import os

log = logger.get_logger(__name__)

class CreateContentRuleHandler(rh.RuleHandler):
    def __init__(self) -> None:
        super()
    
    def handle(self, rule : rule_dto.Rule) -> rule_response.RuleResponse:
        """Handles the CREATEFILE Rule.

        Args:
            rule (Rule): Rule object dto
        """
        print('in create content handle ->')
        param_map = {} #TODO
        content : str = template_engine.apply_template(rule.source_name, rule.source_location, param_map)
        log.info("output content")
        log.info(content)
       
        '''destination_path : str = os.path.join(rule.target_location, rule.target_name) 
        try:
            with open(destination_path, 'w+') as file:
                file.write(content)
        except IOError as e:
                log.exception("IO Exception while writing to file", e)
        except FileNotFoundError as e:
                log.exception("File not found Exception while writing to file", e)
        except PermissionError as e:
                log.exception("PermissionError while writing to file", e)
        except OSError as e:
                log.exception("OSError while writing to file", e)
        except Exception as e:
                log.exception("Exception while writing to file", e)'''
        resp =  rule_response.RuleResponse(content)
        
        return resp
                
        
            
