import json
from appiflow_core.template_core.dto.rule_param import RuleParam
from appiflow_core.template_core.dto.usecase_param_detail import UsecaseParamDetail
from appiflow_core.template_core.dto import rule_ref_dto
from pydantic.dataclasses import dataclass
import dataclasses
from pydantic.tools import parse_obj_as
from typing import List
from typing import Dict

@dataclass
class Usecase:
    """DTO Class to represent inputs to a usecase.  
    """
    usecase_id : str
    name : str
    description : str
    usecase_params : List[UsecaseParamDetail]
    rule_refs : List[str]
    usecase_rule_param_map: Dict
    
    
    def from_json(object_json : str) -> 'Usecase':
        """Convert from json to object

        Args:
        object_json (str): Object as json

        Returns:
        UsecaseInput: Object representation of json
        """
        json_dict = json.loads(object_json)
        return parse_obj_as(Usecase, json_dict)
    
    def from_json_dict(json_dict : Dict) -> 'Usecase':
        """Convert from json dict to object

        Args:
        object_json (str): Object as json

        Returns:
        UsecaseInput: Object representation of json
        """
        return parse_obj_as(Usecase, json_dict)
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(dataclasses.asdict(self))
    



    
    