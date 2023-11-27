import json
from json import JSONEncoder
from types import SimpleNamespace as Namespace

class DynamicParam:
    """DTO Class to represent dynamic values of a parameter.  
    """
    def __init__(self, param_name : str , param_value : str) -> None:
        self.param_name = param_name
        self.param_value = param_value
    
    
    def from_json(self, object_json : str) -> 'DynamicParam':
        """Convert from json to object

        Args:
            object_json (str): Object as json

        Returns:
            DynamicParam: Object representation of json
        """
        return json.loads(object_json, object_hook = lambda d: Namespace(**d))
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(self, indent=4, cls = DynamicParamEncoder)
        
    
class DynamicParamEncoder(JSONEncoder):
        def default(self, o): return o.__dict__



    
    