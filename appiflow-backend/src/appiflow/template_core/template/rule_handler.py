from template_core.dto import rule_dto
from abc import ABC

class RuleHandler(ABC):
    def __init__(self) -> None:
        pass
    
    def handle(self, rule : rule_dto.Rule) -> None:
        """Performs rule handling

        Args:
            rule (Rule): Rule object dto
        """
        print('handle')