from core.template import rule_handler as rh
from core.template import create_file_rule_handler as crh
from core.template import copy_all_files_rule_handler as cparh
from core.dto import rule_dto

def main():
    rule = rule_dto.Rule('test_rule', 'message.java', 'core/templates', 'output/', 'result.java')
    create_file_handler = crh.CreateFileRuleHandler()
    map = {"name": "Order",  "score": 90}
    create_file_handler.handle(rule, map)
    

def test_json_objects():
    rule = rule_dto.Rule('a', 'b', 'c', 'd', 'e')
    print("rule json: ")
    a = rule.to_json()
    print(a)
    r = rule.from_json(a)
    print(f"rule from json",{r.name}) 
    
if __name__ == "__main__":
    main()