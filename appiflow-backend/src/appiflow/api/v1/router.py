from fastapi import APIRouter

from api.v1.users import users_router

v1_router = APIRouter(prefix="/v1")
v1_router.include_router(users_router, prefix="/users") 