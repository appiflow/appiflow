from  dto import rule_dto
from template import rule_handler as rh

class CreateFileRuleHandler(rh.RuleHandler):
    def __init__(self) -> None:
        super()
    
    def handle(self, rule : rule_dto.Rule) -> None:
        """Handles the CREATEFILE Rule.

        Args:
            rule (Rule): Rule object dto
        """
        print('in create')