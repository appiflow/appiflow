import json
from json import JSONEncoder
from types import SimpleNamespace as Namespace
from template_core.dto.rule_param import RuleParam

class UsecaseInput:
    """DTO Class to represent inputs to a usecase.  
    """
    def __init__(self, usecase_id, rule_param_mapping: RuleParam) -> None:
        self.usecase_id = usecase_id
        self.rule_param_mapping = rule_param_mapping
    
    
    def from_json(self, object_json : str) -> 'UsecaseInput':
        """Convert from json to object

        Args:
        object_json (str): Object as json

        Returns:
        UsecaseInput: Object representation of json
        """
        return json.loads(object_json, object_hook = lambda d: Namespace(**d))
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(self, indent=4, cls = UsecaseInputEncoder)
        
    
class UsecaseInputEncoder(JSONEncoder):
        def default(self, o): return o.__dict__



    
    