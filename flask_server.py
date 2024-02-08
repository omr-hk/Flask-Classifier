from flask import Flask,request,jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle
import json
app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = json.loads(request.get_data().decode())
    values = {
        "AGE" : [float(data['age'])],
        "Urea" : [float(data['urea'])],
        "Cr" : [float(data['cr'])],
        "HbA1c" : [float(data['hba1c'])],
        "Chol" : [float(data['chol'])],
        "TG" : [float(data['tg'])],
        "HDL" : [float(data['hdl'])],
        "LDL" : [float(data['ldl'])],
        "VLDL" : [float(data['vldl'])],
        "BMI" : [float(data['bmi'])],
        "Gender_M" : []
    }

    if data['gender'] == 'M':
        values["Gender_M"] = [True]
    else:
        values["Gender_M"] = [False]
    
    df = pd.DataFrame(values)
    with open('model/DiabetesClassifier.pickle','rb') as f:
        model = pickle.load(f)
    
    result = {"prediction" : model.predict(df)}
    print(df)
    print(result)
    return jsonify({'result' : list(result['prediction'])})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response


@app.route('/')
def home():

    return "waiting for request"

if (__name__ == "__main__"):
    app.run(debug=True)