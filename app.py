from flask import Flask,render_template,request
from flask_bootstrap import Bootstrap
from keras.models import load_model
from keras.models import Sequential
from keras.layers import Dense, Conv2D, Flatten
import keras.backend as k
from PIL import Image
import numpy as np
import json
import os
app = Flask(__name__)
Bootstrap(app)
@app.route('/')
def hello_world():
    imagesName=[]
    for filename in os.listdir('static/digits'):
        imagesName.append(filename)
    return render_template('hello.html',images=imagesName)



@app.route('/predict', methods=['POST'])
def _get_data():
    matrixDic=json.loads(request.form.get("imageMatrixJs"))

    if(len(matrixDic) > 800):
        img=Image.fromarray(np.array(matrixDic).reshape(280,280))
        img.thumbnail((28,28), Image.ANTIALIAS)
        imgArray=np.array(img).reshape(1,28,28,1)/255
    else:
        imgArray=np.array(matrixDic).reshape(1,28,28,1)/255
        img=Image.fromarray(np.array(matrixDic).reshape(28,28))

    APP_ROOT = os.path.dirname(os.path.abspath(__file__))  
    modelPath = os.path.join(APP_ROOT, 'static/models/modelCnn.h5')
    model=createModel(modelPath)
    prediction = model.predict(imgArray)

    #img.show()
    return str(prediction.argmax())

def createModel(modelPath):
    k.clear_session()
    model=Sequential()
    model.add(Conv2D(64, kernel_size=3, activation='relu', input_shape=(28,28,1)))
    model.add(Conv2D(32, kernel_size=3, activation='relu'))
    model.add(Flatten())
    model.add(Dense(10, activation='softmax'))
    model=load_model(modelPath)
    
    return model

if __name__ == "__main__":
    app.debug = True
    app.run()