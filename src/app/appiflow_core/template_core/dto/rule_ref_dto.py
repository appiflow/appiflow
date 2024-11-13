import json
from pydantic.dataclasses import dataclass
import dataclasses
from pydantic.tools import parse_obj_as
from typing import Dict, List
from appiflow_core.template_core.dto import rule_dto

@dataclass
class RuleRef:
    """DTO Class to represent a List of Rules.  
    """
    rule_refs: List[str]
    
    def from_json(object_json : str) -> List[str]:
        """Convert from json to object

        Args:
            rule_json (str): Rule as json

        Returns:
            Rule: Object representation of json
        """
        json_dict = json.loads(object_json)
        return parse_obj_as(RuleRef, json_dict)
    
    
    