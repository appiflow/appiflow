import json
from json import JSONEncoder
from types import SimpleNamespace as Namespace
from typing import List
from template_core.dto.rule_param_detail import RuleParamDetail

class RuleParam:
    """DTO Class to represent parameters to a Rule.  
    """
    def __init__(self, rule_name, rule_params : List[RuleParamDetail]) -> None:
        self.rule_name = rule_name
        self.rule_params = rule_params
    
    
    def from_json(self, object_json : str) -> 'RuleParam':
        """Convert from json to object

        Args:
            object_json (str): Object as json

        Returns:
            Rule: Object representation of json
        """
        return json.loads(object_json, object_hook = lambda d: Namespace(**d))
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(self, indent=4, cls = RuleParamEncoder)
        
    
class RuleParamEncoder(JSONEncoder):
        def default(self, o): return o.__dict__



    
    