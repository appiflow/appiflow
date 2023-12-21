from pydantic import BaseModel
from template_core.dto.usecase_input import UsecaseInput

class UsecaseGenerateRequest(BaseModel):
    usecaseInput: UsecaseInput
    
    