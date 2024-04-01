import numpy as np
import tensorflow as tf
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
from PIL import Image
import io

class ImageClassifier:
    def __init__(self, model_path):
        self.model = tf.keras.models.load_model(model_path)

    def preprocess_image(self, image):
        img = Image.open(io.BytesIO(image)).resize((224, 224))
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)
        return img_array

    def predict(self, image):
        preprocessed_image = self.preprocess_image(image)
        predictions = self.model.predict(preprocessed_image)
        decoded_predictions = decode_predictions(predictions, top=3)[0]
        return decoded_predictions