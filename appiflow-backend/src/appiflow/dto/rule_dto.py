import json
from json import JSONEncoder
from types import SimpleNamespace as Namespace

class Rule:
    """DTO Class to represent a Rule.  
    """
    def __init__(self, name, source_location, target_location, target_name) -> None:
        self.name, self.source_location, self.target_location, self.target_name = name, source_location, target_location, target_name
    
    
    def from_json(self, rule_json : str) -> 'Rule':
        """Convert from json to object

        Args:
            rule_json (str): Rule as json

        Returns:
            Rule: Object representation of json
        """
        return json.loads(rule_json, object_hook = lambda d: Namespace(**d))
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(self, indent=4, cls = RuleEncoder)
        
    
class RuleEncoder(JSONEncoder):
        def default(self, o): return o.__dict__
    
    