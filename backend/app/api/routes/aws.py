import os
import uuid

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from botocore.exceptions import ClientError

from app.core.config import settings
from app.api.dependencies import get_current_user

router = APIRouter()

@router.post("/upload", dependencies=[Depends(get_current_user)])
async def upload_image(file: UploadFile = File(...)):
    try:
        # Generate a filename using UUID
        file_extension = os.path.splitext(file.filename)[1]
        filename = str(uuid.uuid4()) + file_extension

        # Generate the file path within the "user-uploads" folder
        file_path = f"user-uploads/{filename}"

        # Upload the file to S3
        settings.s3_client.upload_fileobj(file.file, settings.S3_BUCKET_NAME, file_path)

        # Generate the URL of the uploaded file
        file_url = f"https://{settings.S3_BUCKET_NAME}.s3.{settings.AWS_DEFAULT_REGION}.amazonaws.com/{file_path}"

        return {"message": "Image uploaded successfully", "url": file_url}

    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))