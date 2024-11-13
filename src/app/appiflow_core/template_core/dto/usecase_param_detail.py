import json
from appiflow_core.template_core.dto.dynamic_param import DynamicParam
from pydantic.dataclasses import dataclass
import dataclasses
from pydantic.tools import parse_obj_as
from typing import Optional

@dataclass
class UsecaseParamDetail:
    """DTO Class to represent parameters details of a Usecase.  
    """
    param_name : str
    static_param_value : Optional[str]
    dynamic_param_value : Optional[DynamicParam]
    
    def from_json(self, object_json : str) -> 'UsecaseParamDetail':
        """Convert from json to object

        Args:
            object_json (str): object as json

        Returns:
            RuleParamDetail: Object representation of json
        """
        json_dict = json.loads(object_json)
        return parse_obj_as(UsecaseParamDetail, json_dict)
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(dataclasses.asdict(self))
        



    
    