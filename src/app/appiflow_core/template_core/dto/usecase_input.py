import json
from appiflow_core.template_core.dto.rule_param import RuleParam
from pydantic.dataclasses import dataclass
import dataclasses
from pydantic.tools import parse_obj_as

@dataclass
class UsecaseInput:
    """DTO Class to represent inputs to a usecase.  
    """
    usecase_id : str
    parameters : dict
    
    
    def from_json(self, object_json : str) -> 'UsecaseInput':
        """Convert from json to object

        Args:
        object_json (str): Object as json

        Returns:
        UsecaseInput: Object representation of json
        """
        json_dict = json.loads(object_json)
        return parse_obj_as(UsecaseInput, json_dict)
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(dataclasses.asdict(self))
    



    
    