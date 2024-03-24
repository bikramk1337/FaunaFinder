
from fastapi import APIRouter, UploadFile, File
from app.classifier.classifier import ImageClassifier

router = APIRouter()

model_path = 'app/assets/models/resnet50_imagenet.h5'
classifier = ImageClassifier(model_path)

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
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