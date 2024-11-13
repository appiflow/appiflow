from pydantic.dataclasses import dataclass
import dataclasses


@dataclass
class RuleResponse:
    content: str
    