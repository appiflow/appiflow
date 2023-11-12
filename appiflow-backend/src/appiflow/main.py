from template import rule_handler as rh
from template import create_file_rule_handler as crh
from dto import rule_dto

def main():
    rule = rule_dto.Rule('a', 'b', 'c', 'd')
    create_file_handler = crh.CreateFileRuleHandler()
    create_file_handler.handle(rule)
    

def test_json_objects():
    rule = rule_dto.Rule('a', 'b', 'c', 'd')
    print("rule json: ")
    a = rule.to_json()
    print(a)
    r = rule.from_json(a)
    print(f"rule from json",{r.name}) 
    
if __name__ == "__main__":
    main()