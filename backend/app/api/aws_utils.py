import os
import uuid
import magic
import asyncio
from aiobotocore.session import get_session

from fastapi import UploadFile, HTTPException
from botocore.exceptions import ClientError
from botocore.response import StreamingBody
from urllib.parse import urlparse
from io import BytesIO

from app.core.config import settings

async def upload_image_to_s3(filename: str, file_content: bytes):
    try:
        # Get the MIME type of the file content
        mime_type = magic.from_buffer(file_content, mime=True)

        # Check if the MIME type is an image
        if not mime_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Invalid file type. Only image files are allowed.")

        # Generate the file path within the "user-uploads" folder
        file_extension = os.path.splitext(filename)[1]
        file_path = f"user-uploads/{str(uuid.uuid4())}{file_extension}"

        # Upload the file content to S3
        settings.s3_client.put_object(Body=file_content, Bucket=settings.S3_BUCKET_NAME, Key=file_path)

        # Generate the URL of the uploaded file
        file_url = f"https://{settings.S3_BUCKET_NAME}.s3.{settings.AWS_DEFAULT_REGION}.amazonaws.com/{file_path}"

        return file_url

    except ClientError as e:
        raise Exception(str(e))
    

async def get_image_from_s3_url(image_url: str):
    try:
        # Parse the S3 bucket URL
        parsed_url = urlparse(image_url)
        bucket_name = parsed_url.netloc.split('.')[0]
        key = parsed_url.path.lstrip('/')

        # Create an async S3 client
        session = get_session()
        async with session.create_client('s3') as s3_client:
            # Retrieve the image file from S3
            response = await s3_client.get_object(Bucket=bucket_name, Key=key)
            async with response['Body'] as stream:
                image_data = await stream.read()

        return image_data

    except Exception as e:
        raise Exception(str(e))