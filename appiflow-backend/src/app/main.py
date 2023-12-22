from template_core.template import rule_handler as rh
from template_core.template import create_file_rule_handler as crh
from template_core.template.copy_file_rule_handler import CopyFileRuleHandler
from template_core.template.create_folder_rule_handler import CreateFolderRuleHandler
from template_core.dto import rule_dto
from template_core.dto.usecase_input import UsecaseInput
from template_core.dto.usecase import Usecase
from template_core.dto.usecase_param_detail import UsecaseParamDetail
from template_core.template.usecase_handler import UsecaseHandler
from template_core.dto.rule_param_detail import RuleParamDetail
from template_core.dto.rule_param import RuleParam
import json
from pydantic.dataclasses import dataclass
from pydantic.tools import parse_obj_as
import dataclasses

def main():
    #test_create_folder()
    #test_copy_single()
    #test_pydantic()
    #test_use_input()
    #test_create_rule()
    test_use()
    
    
def test_use_input():
    #rpd : RuleParamDetail = RuleParamDetail("p1", "val", None)
    #list = []
    #list.append(rpd)
    #rp : RuleParam = RuleParam("rule1", list)
    params = {"p1":"val"}
    ui : UsecaseInput = UsecaseInput(usecase_id="111", parameters= params)
    print(ui.to_json())
    
def test_use():
    usecase_id ="111"
    name = "test"
    description = "testdescr"
    ucpd = UsecaseParamDetail(param_name="p1", static_param_value="c1", dynamic_param_value=None)
    usecase_params = []
    usecase_params.append(ucpd)
    rules = []
    rule = rule_dto.Rule("1", 'test_rule', "COPY_SINGLE_FILE",'message.java', 'template_core/templates', 'output/', 'result.java')
    rules.append(rule)
    usecase_rule_param_map = {"p1":"v1"}
    
    
    params = {"p1":"val"}
    uc : Usecase = Usecase(usecase_id="111",  name= name, description=description, usecase_params=usecase_params, 
                           rules=rules, usecase_rule_param_map= usecase_rule_param_map)
    
    params = {"p1":"val"}
    uinput : UsecaseInput = UsecaseInput(usecase_id="111", parameters= params)
    
    uch: UsecaseHandler = UsecaseHandler()
    uch.handle(uinput)
    #print(uinput.to_json())    
    
    
def test_create_rule():
    rule = rule_dto.Rule('test_rule', 'message.java', 'template_core/templates', 'output/', 'result.java')
    create_file_handler = crh.CreateFileRuleHandler()
    map = {"name": "Order",  "score": 90}
    create_file_handler.handle(rule, map)
    
    rule = rule_dto.Rule('test_rule', 'controller.py', '/Users/raghuveermb/Desktop/lc/appiflow/templates/python-mvc', 'output/', 'result.java')
    create_file_handler = crh.CreateFileRuleHandler()
    map = {"entity": "Order",  "score": 90}
    create_file_handler.handle(rule, map)
    
   
def test_copy_single():   
     rule = rule_dto.Rule('test_rule', source_name="main.py", source_location="/Users/raghuveermb/Desktop/lc/appiflow/test/app",
                          target_location="/Users/raghuveermb/Desktop/lc/appiflow/test/output/app", 
                          target_name="main.py")
     ruleh = CopyFileRuleHandler() 
     ruleh.handle(rule)
     
def test_create_folder():     
     rule = rule_dto.Rule('test_rule', source_name=None, source_location=None,
                          target_location="/Users/raghuveermb/Desktop/lc/appiflow/test/output", 
                          target_name="app")
     cf = CreateFolderRuleHandler()
     cf.handle(rule)
     

def test_json_objects():
    rule = rule_dto.Rule('a', 'b', 'c', 'd', 'e')
    print("rule json: ")
    a = rule.to_json()
    print(a)
    r = rule.from_json(a)
    print(f"rule from json",{r.name}) 
    
    
def test_pydantic():
    #c = Car(name = "hy", params={})
    #c1 = Car.__pydantic_model__.parse_raw('{"id": "123", "name": "James"}')
    
    w1 = Wheel(id="1", size=1)
    w2 = Wheel(id="2", size=2)
    wh = []
    wh.append(w1)
    wh.append(w2)
    user = Car(id="123", name="James", wheels=wh)
    print(user.to_json())
    user_json = json.dumps(dataclasses.asdict(user))
    print(user_json)
    json_raw = '{"id": "123", "name": "James",  "wheels": [{"id": "1", "size": 1}, {"id": "2", "size": 2}]}'
    user_dict = json.loads(json_raw)
    user = parse_obj_as(Car, user_dict)
    print(user)
    print(user.to_json())
    
    
    
if __name__ == "__main__":
    main()