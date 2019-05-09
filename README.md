# Digit Recognition
This is a simple web app that show cases hand written digit recognition by allowing you to either select a picture of a hand written digit then it predicts what digit is it or draw a digit on the canvas and it'll predict it.

The AI is a CNN trained on the MNIST dataset with 60,000 record on the training set 10,000 on the test set with a final accuracy of over 98%

## Prerequisites
you're going to need python3, flask, flask_bootstrap ,numpy, pillow, keras and tensorflow
```
pip install pillow
pip install numpy
pip install flask
pip install flask_bootstrap
pip install keras
pip install tensorflow
```
## Use
After installing all the prerequisites just clone the repo
```
git clone https://github.com/nimotli/DigitRecognition.git
```
cd to the directory
```
python app.py
```
then on a web browser go to localhost:5000

## Screencaps

![alt text](https://github.com/nimotli/DigitRecognition/blob/master/static/images/1.png)

![alt text](https://github.com/nimotli/DigitRecognition/blob/master/static/images/1p.png)

![alt text](https://github.com/nimotli/DigitRecognition/blob/master/static/images/2.png)

![alt text](https://github.com/nimotli/DigitRecognition/blob/master/static/images/2p.png)
