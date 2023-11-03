from  dto import rule_dto
from template import rule_handler as rh
from util import logger

log = logger.get_logger(__name__)

class CreateFileRuleHandler(rh.RuleHandler):
    def __init__(self) -> None:
        super()
    
    def handle(self, rule : rule_dto.Rule) -> None:
        """Handles the CREATEFILE Rule.

        Args:
            rule (Rule): Rule object dto
        """
        log.debug('in create file handle')