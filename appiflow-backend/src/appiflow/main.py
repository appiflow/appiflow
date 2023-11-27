from template_core.template import rule_handler as rh
from template_core.template import create_file_rule_handler as crh
from template_core.template.copy_file_rule_handler import CopyFileRuleHandler
from template_core.template.create_folder_rule_handler import CreateFolderRuleHandler
from template_core.dto import rule_dto
from template_core.dto.usecase_input import UsecaseInput
from template_core.dto.rule_param_detail import RuleParamDetail
from template_core.dto.rule_param import RuleParam

def main():
    test_create_folder()
    test_copy_single()
    
def test_use_input():
    rpd : RuleParamDetail = RuleParamDetail("p1", "val", None)
    list = []
    list.append(rpd)
    rp : RuleParam = RuleParam("rule1", list)
    ui : UsecaseInput = UsecaseInput(usecase_id="111", rule_param_mapping=rp)
    print(ui.to_json)
    
    
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
    
if __name__ == "__main__":
    main()