import json
from json import JSONEncoder
from types import SimpleNamespace as Namespace
from template_core.dto.dynamic_param import DynamicParam

class RuleParamDetail:
    """DTO Class to represent parameters details of a Rule.  
    """
    def __init__(self, param_name, static_param_value : str, dynamic_param_value : DynamicParam) -> None:
        self.param_name = param_name
        self.static_param_value = static_param_value
        self.dynamic_param_value = dynamic_param_value
    
    
    def from_json(self, object_json : str) -> 'RuleParamDetail':
        """Convert from json to object

        Args:
            object_json (str): object as json

        Returns:
            RuleParamDetail: Object representation of json
        """
        return json.loads(object_json, object_hook = lambda d: Namespace(**d))
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(self, indent=4, cls = RuleParamDetailEncoder)
        
    
class RuleParamDetailEncoder(JSONEncoder):
        def default(self, o): return o.__dict__



    
    