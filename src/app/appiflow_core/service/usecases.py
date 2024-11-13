from appiflow_core.models.usecases import UsecaseGenerateRequest
from appiflow_core.template_core.template.usecase_handler import UsecaseHandler

class UsecaseService:
    """Service class for Usecases
    """
    
    
    def generate(self, usecase_id: str,
        request: UsecaseGenerateRequest) -> UsecaseGenerateRequest:
        print("In service")
        usecase_handler : UsecaseHandler = UsecaseHandler()
        return usecase_handler.handle(request.usecaseInput)