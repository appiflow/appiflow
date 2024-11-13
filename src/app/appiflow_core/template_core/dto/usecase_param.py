import json
from typing import List
from appiflow_core.template_core.dto.usecase_param_detail import UsecaseParamDetail
from pydantic.dataclasses import dataclass
import dataclasses
from pydantic.tools import parse_obj_as

@dataclass
class UsecaseParam:
    """DTO Class to represent parameters to a Usecase.  
    """
    
    usecase_params : List[UsecaseParamDetail]
    
    
    def from_json(self, object_json : str) -> 'UsecaseParam':
        """Convert from json to object

        Args:
            object_json (str): Object as json

        Returns:
            Rule: Object representation of json
        """
        json_dict = json.loads(object_json)
        return parse_obj_as(UsecaseParam, json_dict)
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(dataclasses.asdict(self))
        



    
    