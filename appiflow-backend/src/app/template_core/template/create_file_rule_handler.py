from template_core.dto import rule_dto
from template_core.template import rule_handler as rh
from template_core.util import logger
from template_core.util import template_engine

log = logger.get_logger(__name__)

class CreateFileRuleHandler(rh.RuleHandler):
    def __init__(self) -> None:
        super()
    
    def handle(self, rule : rule_dto.Rule, param_map : dict) -> None:
        """Handles the CREATEFILE Rule.

        Args:
            rule (Rule): Rule object dto
        """
        log.debug('in create file handle ->')
        content : str = template_engine.apply_template(rule.source_name, rule.source_location, param_map)
        log.info("output content")
        log.info(content)
        destination_path : str = os.path.join(rule.target_location, rule.target_name) 
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
                log.exception("Exception while writing to file", e)
        
            
