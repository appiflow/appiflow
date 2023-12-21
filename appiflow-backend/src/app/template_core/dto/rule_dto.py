import json
from pydantic.dataclasses import dataclass
import dataclasses
from pydantic.tools import parse_obj_as

@dataclass
class Rule:
    """DTO Class to represent a Rule.  
    """
    name : str
    source_name : str
    source_location : str
    target_location : str
    target_name : str
    
    
    def from_json(self, object_json : str) -> 'Rule':
        """Convert from json to object

        Args:
            rule_json (str): Rule as json

        Returns:
            Rule: Object representation of json
        """
        json_dict = json.loads(object_json)
        return parse_obj_as(Rule, json_dict)
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(dataclasses.asdict(self))
    
    
    