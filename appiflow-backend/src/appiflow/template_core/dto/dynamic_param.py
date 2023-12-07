import json
from pydantic.dataclasses import dataclass
import dataclasses
from pydantic.tools import parse_obj_as

@dataclass
class DynamicParam:
    """DTO Class to represent dynamic values of a parameter.  
    """
    param_name : str
    param_value : str

        
    def from_json(self, object_json : str) -> 'DynamicParam':
        """Convert from json to object

        Args:
            object_json (str): Object as json

        Returns:
            DynamicParam: Object representation of json
        """
        json_dict = json.loads(object_json)
        return parse_obj_as(DynamicParam, json_dict)
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(dataclasses.asdict(self))
        



    
    