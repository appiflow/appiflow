import json
from appiflow_core.template_core.dto.dynamic_param import DynamicParam
from pydantic.dataclasses import dataclass
import dataclasses
from pydantic.tools import parse_obj_as

@dataclass
class RuleParamDetail:
    """DTO Class to represent parameters details of a Rule.  
    """
    param_name : str
    static_param_value : str
    dynamic_param_value : DynamicParam
    
    def from_json(self, object_json : str) -> 'RuleParamDetail':
        """Convert from json to object

        Args:
            object_json (str): object as json

        Returns:
            RuleParamDetail: Object representation of json
        """
        json_dict = json.loads(object_json)
        return parse_obj_as(RuleParamDetail, json_dict)
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(dataclasses.asdict(self))
        



    
    