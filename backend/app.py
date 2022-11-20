from flask import Flask, request, jsonify, make_response
import uuid
import database
import numpy as np
import pandas as pd
from scipy.stats import mode
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
import joblib
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def main():
    return jsonify({"message": "this is our api :D"})

#gives you session id you can use for getting data about the person
@app.route('/login', methods=["POST"])
@cross_origin()
def login():
    
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    
    input_json = request.get_json(force=True)
    SESSION_ID = str(uuid.uuid4())
    if database.login(input_json["email"], input_json["password"]):
        dictToReturn = {"SESSION_ID": SESSION_ID}
    else:
        dictToReturn = {"SESSION_ID": "false"}
    database.set_session_id(input_json["email"], SESSION_ID)
    return _corsify_actual_response(jsonify(dictToReturn))

#registers and returns whether it was a success or not, possible messages can be seen in database.py
@app.route('/register', methods=["POST"])
@cross_origin()
def register():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    input_json = request.get_json(force=True)
    result = database.register(input_json["email"], input_json["password"], input_json["first_name"], input_json["last_name"])
    message = {"message": result}
    return _corsify_actual_response(jsonify(message))

#put in a json with SESSION_ID, index and value
@app.route('/set_data', methods=["POST"])
@cross_origin()
def set_data():
    input_json = request.get_json(force=True)
    result = database.set_data(input_json["SESSION_ID"], input_json["index"], input_json["value"])
    return jsonify({"message": result})

@app.route('/diagnose', methods=["POST"])
@cross_origin()
def diagnose():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    input_json = request.get_json(force=True)
    symptom_inputs = input_json["symptoms"]
    
    DATA_PATH = "dataset/Training.csv"
    data = pd.read_csv(DATA_PATH).dropna(axis = 1)

    # Encoding the target value into numerical
    # value using LabelEncoder
    encoder = LabelEncoder()
    data["prognosis"] = encoder.fit_transform(data["prognosis"])

    X = data.iloc[:,:-1]
    y = data.iloc[:, -1]
    

    # Training the models on whole data
    final_svm_model = joblib.load("svm.cls")
    final_nb_model = joblib.load("guassiannb.cls")
    final_rf_model = joblib.load("randomforestclassifier.cls")

    symptoms = X.columns.values
    
    # Creating a symptom index dictionary to encode the
    # input symptoms into numerical form
    symptom_index = {}
    for index, value in enumerate(symptoms):
        symptom = " ".join([i.capitalize() for i in value.split("_")])
        symptom_index[symptom] = index
    # print(symptom_index)

    data_dict = {
        "symptom_index":symptom_index,
        "predictions_classes":encoder.classes_
    }
    
    # Defining the Function
    # Input: string containing symptoms separated by commmas
    # Output: Generated predictions by models
    def predictDisease(symptoms):
        symptoms = symptoms.split(",")
        
        # creating input data for the models
        input_data = [0] * len(data_dict["symptom_index"])
        for symptom in symptoms:
            index = data_dict["symptom_index"][symptom]
            input_data[index] = 1
            
        # reshaping the input data and converting it
        # into suitable format for model predictions
        input_data = np.array(input_data).reshape(1,-1)
        
        # generating individual outputs
        rf_prediction = data_dict["predictions_classes"][final_rf_model.predict(input_data)[0]]
        nb_prediction = data_dict["predictions_classes"][final_nb_model.predict(input_data)[0]]
        svm_prediction = data_dict["predictions_classes"][final_svm_model.predict(input_data)[0]]
        
        # making final prediction by taking mode of all predictions
        final_prediction = mode([rf_prediction, nb_prediction, svm_prediction])[0][0]
        predictions = {
            "rf_model_prediction": rf_prediction,
            "naive_bayes_prediction": nb_prediction,
            "svm_model_prediction": nb_prediction,
            "final_prediction":final_prediction
        }
        return predictions
        
    return _corsify_actual_response(predictDisease(",".join(symptom_inputs)))

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == "__main__":
	app.run()