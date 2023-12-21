from fastapi import APIRouter
from models.usecases import UsecaseGenerateRequest
from service.usecases import UsecaseService

usecases_router = APIRouter(prefix = "/usecases")

usecase_service = UsecaseService()

@usecases_router.put(
    "/{usecase_id}/actions/generate", response_model = UsecaseGenerateRequest
    )
def generate(
    usecase_id: str,
    request: UsecaseGenerateRequest) -> UsecaseGenerateRequest:
    usecase_service.generate(usecase_id, request)
    return request
    
    