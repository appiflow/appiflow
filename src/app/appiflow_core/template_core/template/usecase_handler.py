from appiflow_core.template_core.dto.usecase_input import UsecaseInput
from appiflow_core.template_core.dto.usecase_param_detail import UsecaseParamDetail
from appiflow_core.template_core.dto.usecase import Usecase
from appiflow_core.template_core.dto import rule_dto
from appiflow_core.template_core.dto.rules_dto import Rules
from appiflow_core.template_core.template import rule_factory 
from appiflow_core.template_core.template import rule_handler 
from appiflow_core.template_core.dto import rule_ref_dto
from appiflow_core.config import get_template_path
import json
from typing import Dict, List
import os
from appiflow_core.template_core.dto import rule_response

class UsecaseHandler:
    """Class to handle usecases and run rules within a usecase
    """
    
    fixed_rule_params : List[str] = ["source_name", "source_location", "target_location", "target_name"]
    
    def __init__(self) -> None:
        pass
    
    def handle(self, uc_input : UsecaseInput) -> str:
        # Load the usecase metadata
        # Loop thru the Rules
        # Run each rule, provide the param dict 
        usecase_id = uc_input.usecase_id
        usecase_json: str = self.get_usecase_json(usecase_id)
        usecase : Usecase =  Usecase.from_json_dict(usecase_json)
        
        all_rules_json: Dict = self.get_rule_json()
        all_rules_obj: Rules = Rules.from_json_dict(all_rules_json)
            
        
        
        
        rule: rule_dto.Rule
        '''for rule in usecase.rules:
            
            params_dict : Dict = self.prepare_params_dict(rule, usecase)
            params_dict.update({"id" : rule.id})
            rule_obj : rule_dto.Rule = rule_dto.Rule.from_dict_obj(params_dict)
            handler: rule_handler.RuleHandler = rule_factory.RuleHandlerFactory.get_rule(rule.type)
            handler.handle(rule = rule)'''
        
        rule_ref: rule_ref_dto.RuleRef = usecase.rule_refs
        response: str = ""
        for rule_ref_id in rule_ref:
            rule_obj : rule_dto.Rule = self.get_matching_rule(all_rules_obj, rule_ref_id)
            params_dict : Dict = self.prepare_params_dict(rule_obj, usecase)
                
            params_dict.update({"id" : rule_obj.id})
            params_dict.update({"name" : rule_obj.name})
            params_dict.update({"type" : rule_obj.type})
            
            template_path = get_template_path() + os.sep + f"{usecase_id}" 
            params_dict.update({"source_location" : template_path})
          
            updated_rule_obj : rule_dto.Rule = rule_dto.Rule.from_dict_obj(params_dict)
                    
            handler: rule_handler.RuleHandler = rule_factory.RuleHandlerFactory.get_rule(updated_rule_obj.type)
            resp: rule_response.RuleResponse = handler.handle(rule = updated_rule_obj)
            if resp is not None:
                response = response + "\n" + resp.content
            return response
            
            
    def get_matching_rule(self, all_rules_obj: Rules, rule_ref_id: str) -> rule_dto.Rule:
        rule: rule_dto.Rule
        rule_obj: rule_dto.Rule = None
        for rule in all_rules_obj.all_rules:
            if rule.id == rule_ref_id:
                rule_obj = rule
        
        print('in getmatch')
        print(rule_obj)
        return rule_obj
            
            
    
    def get_usecase_json(self, usecase_id:str) -> Dict:
        data: Dict = None
        #template_path = self.get_templates_location()
        print("template_path")
        print(get_template_path())
        template_path = get_template_path() + os.sep + f"{usecase_id}" + os.sep +  f"{usecase_id}.json"
        
        with open(template_path) as file:
            data = json.load(file)
   
        return data
       
    
    def get_rule_json(self) -> Dict:
        data: Dict = None
        rule_path = get_template_path() + os.sep +  "rules.json"
        with open(rule_path) as file:
            data = json.load(file)
   
        return data
    
    def get_templates_location(self):
        ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
        print("ROOT_DIR")
        print(ROOT_DIR)
        TEMPLATE_PATH = os.path.join(ROOT_DIR, 'appiflow_resources').join("templates")
        return TEMPLATE_PATH
        
    
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
    
    
    
    
        
            
        