from pydantic import BaseModel
from appiflow_core.template_core.dto.usecase_input import UsecaseInput

class UsecaseGenerateRequest(BaseModel):
    usecaseInput: UsecaseInput
    
    