from appiflow_core.template_core.dto import rule_dto
from appiflow_core.template_core.dto import rule_response
from abc import ABC

class RuleHandler(ABC):
    def __init__(self) -> None:
        pass
    
    def handle(self, rule : rule_dto.Rule) -> rule_response.RuleResponse:
        """Performs rule handling

        Args:
            rule (Rule): Rule object dto
        """
        print('handle')