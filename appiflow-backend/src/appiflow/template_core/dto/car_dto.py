from pydantic.dataclasses import dataclass
from typing import List
import json
import dataclasses

@dataclass    
class Wheel:
    id: str
    size: int

@dataclass
class Car:
    name: str
    id: str
    wheels: List[Wheel]
    
    def to_json(self) -> str:
        """Convert from object to json

        Returns:
            str: Json representation of object
        """
        return json.dumps(dataclasses.asdict(self))
    
