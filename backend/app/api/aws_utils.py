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
from PIL import Image

from app.core.config import settings


# Mimetype image format mapping
MIME_TYPE_TO_FORMAT = {
    "image/jpeg": "JPEG",
    "image/png": "PNG",
    "image/gif": "GIF",
    "image/bmp": "BMP",
    "image/webp": "WEBP",
    "image/tiff": "TIFF",
    "image/heif": "HEIF",
    "image/heic": "HEIF",
}

async def upload_image_to_s3(filename: str, file_content: bytes):
    try:
        # Get the MIME type of the file content
        mime_type = magic.from_buffer(file_content, mime=True)

        # Check if the MIME type is an image
        if not mime_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Invalid file type. Only image files are allowed.")

        # Open the image
        image = Image.open(BytesIO(file_content))

        # Calculate the aspect ratio
        width, height = image.size
        aspect_ratio = width / height

        max_size = 256
        if width > height:
            new_width = max_size
            new_height = int(max_size / aspect_ratio)
        else:
            new_width = int(max_size * aspect_ratio)
            new_height = max_size

        # Resize the image
        image = image.resize((new_width, new_height), Image.LANCZOS)

        # Get the format of the image
        image_format = image.format

        if image_format is None:
            image_format = MIME_TYPE_TO_FORMAT.get(mime_type)
            if image_format is None:
                raise Exception("Unsupported image format")
        else:
            image_format = image_format.upper()

        # Convert the resized image back to bytes
        resized_file_content = BytesIO()
        image.save(resized_file_content, format=image_format)
        resized_file_content.seek(0)

        # Generate the file path within the "user-uploads" folder
        file_extension = os.path.splitext(filename)[1]
        if not file_extension:
            file_extension = f".{image_format.lower()}"
        file_path = f"user-uploads/{str(uuid.uuid4())}{file_extension}"

        # Upload the resized file content to S3
        settings.s3_client.put_object(Body=resized_file_content.read(), Bucket=settings.S3_BUCKET_NAME, Key=file_path)

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