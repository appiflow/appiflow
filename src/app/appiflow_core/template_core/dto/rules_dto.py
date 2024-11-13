import json
from pydantic.dataclasses import dataclass
import dataclasses
from pydantic.tools import parse_obj_as
from typing import Dict, List
from appiflow_core.template_core.dto import rule_dto

@dataclass
class Rules:
    """DTO Class to represent a List of Rules.  
    """
    all_rules: List[rule_dto.Rule]
    
    def from_json(object_json : str) -> List[rule_dto.Rule]:
        """Convert from json to object

        Args:
            rule_json (str): Rule as json

        Returns:
            Rule: Object representation of json
        """
        json_dict = json.loads(object_json)
        return parse_obj_as(Rules, json_dict)
    
    def from_json_dict(json_dict : Dict) -> 'Rules':
        """Convert from json dict to object

        Args:
        object_json (str): Object as json

        Returns:
        UsecaseInput: Object representation of json
        """
        return parse_obj_as(Rules, json_dict)
    
    
    