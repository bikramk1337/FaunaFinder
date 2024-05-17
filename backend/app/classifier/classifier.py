import json
import numpy as np
import keras
from PIL import Image
from io import BytesIO
from tensorflow.keras.preprocessing import image

class ImageClassifier:
    def __init__(self, model_path):
        self.model = keras.models.load_model(model_path)
        with open('app/classifier/class_data.json', 'r') as f:
            self.class_list = json.load(f)
    
    def predict(self, image_data):
        img = Image.open(BytesIO(image_data))
        img = img.resize((256, 256))
        img = image.img_to_array(img)
        img = np.expand_dims(img, axis=0)  # Add batch dimension
        pred = self.model.predict(img)
        output_class = self.class_list[np.argmax(pred)]
        return output_class
