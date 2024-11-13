import json
from typing import List
from appiflow_core.template_core.dto.rule_param_detail import RuleParamDetail
from pydantic.dataclasses import dataclass
import dataclasses
from pydantic.tools import parse_obj_as

@dataclass
class RuleParam:
    """DTO Class to represent parameters to a Rule.  
    """
    rule_name : str
    rule_params : List[RuleParamDetail]
    
    
    def from_json(self, object_json : str) -> 'RuleParam':
        """Convert from json to object

        Args:
            object_json (str): Object as json

        Returns:
            Rule: Object representation of json
        """
        json_dict = json.loads(object_json)
        return parse_obj_as(RuleParam, json_dict)
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(dataclasses.asdict(self))
        



    
    