
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException

from app.classifier.classifier import ImageClassifier
from app.api.dependencies import get_current_user, SessionDep, CurrentUser
from app.api.aws_utils import upload_image_to_s3
from app.db.fauna import ClassificationHistory


router = APIRouter()

model_path = 'app/assets/models/resnet50_imagenet.h5'
classifier = ImageClassifier(model_path)

router = APIRouter()

@router.post("/test-upload", dependencies=[Depends(get_current_user)])
async def test_upload_image(file: UploadFile = File(...)):
    """
    Test route to image upload on S3.
    """
    try:
        file_content = await file.read()

        # Upload the image to S3 and get the URL
        file_url = await upload_image_to_s3(file.filename, file_content)

        # Return the file URL as a JSON response
        return {"message": "Image uploaded successfully", "url": file_url}

    except HTTPException as e:
        # Re-raise the HTTPException to return the error response
        raise e

    except Exception as e:
        # Handle any other exceptions and return an error response
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/predict", dependencies=[Depends(get_current_user)])
async def predict(file: UploadFile = File(...)):
    """
    Test route for image Classification.
    """
    # Read the uploaded image file
    image = await file.read()
    
    # Make predictions using the ImageClassifier
    predictions = classifier.predict(image)

    # Format the predictions
    response = []
    for pred in predictions:
        response.append({
            "class": pred[1],
            "confidence": float(pred[2])
        })

    return {"predictions": response}

@router.post("/upload-and-predict", dependencies=[Depends(get_current_user)])
async def upload_and_predict(session: SessionDep, current_user: CurrentUser, file: UploadFile = File(...)):
    """
    Upload image to s3, classify image and store in Classification History table.
    """
    try:
        # Read the uploaded image file
        image = await file.read()
        
        # Upload the image to S3 and get the URL
        file_url = await upload_image_to_s3(file.filename, image)

        # Make predictions using the ImageClassifier
        predictions = classifier.predict(image)

        # Format the predictions
        formatted_predictions = []
        for pred in predictions:
            formatted_predictions.append({
                "class": pred[1],
                "confidence": float(pred[2])
            })

        # Store the predictions and image URL in the classification history table
        classification_history = ClassificationHistory(
            user_id=current_user.id,
            image_url=file_url,
            prediction=str(formatted_predictions)
        )
        session.add(classification_history)
        session.commit()
        session.refresh(classification_history)

        return {"message": "Image uploaded and classified successfully", "predictions": formatted_predictions}

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    