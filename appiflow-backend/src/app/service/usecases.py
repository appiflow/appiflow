from models.usecases import UsecaseGenerateRequest


class UsecaseService:
    """Service class for Usecases
    """
    
    def generate(self, usecase_id: str,
        request: UsecaseGenerateRequest) -> UsecaseGenerateRequest:
        print("In service")