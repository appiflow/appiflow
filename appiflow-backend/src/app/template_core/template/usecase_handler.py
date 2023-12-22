from template_core.dto.usecase_input import UsecaseInput
from template_core.dto.usecase_param_detail import UsecaseParamDetail
from template_core.dto.usecase import Usecase
from template_core.dto import rule_dto
from template_core.template import rule_factory 
from template_core.template import rule_handler 
import json
from typing import Dict, List

class UsecaseHandler:
    """Class to handle usecases and run rules within a usecase
    """
    
    fixed_rule_params : List[str] = ["name", "type", "source_name", "source_location", "target_location", "target_name"]
    
    def __init__(self) -> None:
        pass
    
    def handle(self, uc_input : UsecaseInput):
        # Load the usecase metadata
        # Loop thru the Rules
        # Run each rule, provide the param dict 
        usecase_id = uc_input.usecase_id
        usecase_json: str = self.get_usecase_json(usecase_id)
        usecase : Usecase =  Usecase.from_json_dict(usecase_json)
        
        rule: rule_dto.Rule
        for rule in usecase.rules:
            params_dict : Dict = self.prepare_params_dict(rule, usecase)
            params_dict.update({"id" : rule.id})
            rule_obj : rule_dto.Rule = rule_dto.Rule.from_dict_obj(params_dict)
            handler: rule_handler.RuleHandler = rule_factory.RuleHandlerFactory.get_rule(rule.type)
            handler.handle(rule = rule)
            
    
    def get_usecase_json(self, usecase_id:str) -> Dict:
        file = open(f'template_core/templates/{usecase_id}.json')
        return json.load(file)
    
    def prepare_params_dict(self, rule: rule_dto.Rule, usecase : Usecase) -> Dict:
        params_dict :Dict = {}
        for rule_param in self.fixed_rule_params:
            rule_id : str = rule.id
            param_name : str = f"{rule.id}_{rule_param}"
            mapped_name: str = usecase.usecase_rule_param_map.get(param_name)
            param_detail: UsecaseParamDetail = self.get_matching_param(mapped_name, usecase.usecase_params)
            params_dict.update( {rule_param : param_detail.static_param_value})
            
        return params_dict
            
    def get_matching_param(self, name: str, param_details : List[UsecaseParamDetail] ) -> UsecaseParamDetail:
        for param_detail in param_details:
                if param_detail.param_name == name:
                    return param_detail

        return None
    
    
    
    
        
            
        