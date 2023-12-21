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