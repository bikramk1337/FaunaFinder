import httpx

from typing import List, Any
from fastapi import APIRouter, Query, Depends

from app.api.dependencies import get_current_user


router = APIRouter()

OLLAMA_API_URL = "http://ollama:11434/api/generate"

@router.post("/chat", dependencies=[Depends(get_current_user)])
async def chat(prompt: str = Query(..., min_length=1)):
    payload = {
        "model": "phi3:mini",
        "prompt": prompt,
        "stream": False
    }

    async with httpx.AsyncClient(timeout=180.0) as client:
        try:
            response = await client.post(OLLAMA_API_URL, json=payload)
            response.raise_for_status()
            result = response.json()
            return {"response": result["response"]}
        except httpx.HTTPError as ex:
            return {"error": f"HTTP error: {ex}"}
        except httpx.TimeoutException as ex:
            return {"error": f"Request timed out: {ex}"}
        except Exception as ex:
            return {"error": f"Unexpected error: {ex}"}
