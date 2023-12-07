from template_core.dto.usecase_input import UsecaseInput

class UsecaseHandler:
    """Class to handle usecases and run rules within a usecase
    """
    
    def __init__(self) -> None:
        pass
    
    def handle(uc_input : UsecaseInput):
        # Load the usecase metadata
        # Loop thru the Rules
        # Run each rule, provide the param dict 