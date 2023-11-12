from  dto import rule_dto
from template import rule_handler as rh
from util import logger
from util import template_engine

log = logger.get_logger(__name__)

class CreateFileRuleHandler(rh.RuleHandler):
    def __init__(self) -> None:
        super()
    
    def handle(self, rule : rule_dto.Rule) -> None:
        """Handles the CREATEFILE Rule.

        Args:
            rule (Rule): Rule object dto
        """
        log.debug('in create file handle ->')
        #TODO
        map = {"name": "Order",  "score": 90}
        content : str = template_engine.apply_template("message.java","templates/",map)
        log.info("output content")
        log.info(content)