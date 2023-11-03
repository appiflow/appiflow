from template import rule_handler as rh
from template import create_file_rule_handler as crh
from dto import rule_dto

def main():
    rule = rule_dto.Rule
    create_file_handler = crh.CreateFileRuleHandler()
    create_file_handler.handle(rule)
    
    
if __name__ == "__main__":
    main()