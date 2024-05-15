from tensorflow.keras.preprocessing import image
import keras
import json
import numpy as np
import os

# array_data simply contains the list of classes
with open('array_data.json', 'r') as f:
    arr_list_reconstructed = json.load(f)

reconstructed_model = keras.models.load_model("my_model.keras")

def predict(test_img_file):
  img = image.load_img(test_img_file, target_size=(256, 256))
  img = image.img_to_array(img)
  img = np.expand_dims(img, axis=0)  # Add batch dimension
  pred = reconstructed_model.predict(img)
  output_class = arr_list_reconstructed[np.argmax(pred)]
  return output_class

# result = predict('/content/ImageDS/Ibis/Image_106.jpg')
# print(result)
