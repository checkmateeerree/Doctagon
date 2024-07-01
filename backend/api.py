from flask import Flask, request, jsonify
import uuid
import database
import numpy as np
#import pandas as pd
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
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

app = Flask(__name__)

#gives you session id you can use for getting data about the person
@app.route('/login', methods=["POST"])
def login():
    input_json = request.get_json(force=True)
    SESSION_ID = str(uuid.uuid4())
    if database.login(input_json["email"], input_json["password"]):
        dictToReturn = {"SESSION_ID": SESSION_ID}
    else:
        dictToReturn = {"SESSION_ID": "false"}
    database.set_session_id(input_json["email"], SESSION_ID)
    return jsonify(dictToReturn)

#registers and returns whether it was a success or not, possible messages can be seen in database.py
@app.route('/register', methods=["POST"])
def register():
    input_json = request.get_json(force=True)
    result = database.register(input_json["email"], input_json["password"], input_json["first_name"], input_json["last_name"])
    message = {"message": result}
    return jsonify(message)

#put in a json with SESSION_ID, index and value
@app.route('/set_data', methods=["POST"])
def set_data():
    input_json = request.get_json(force=True)
    result = database.set_data(input_json["SESSION_ID"], input_json["index"], input_json["value"])
    return jsonify({"message": result})

@app.route('/diagnose', methods=["POST"])
def diagnose():
    input_json = request.get_json(force=True)
    symptom_inputs = input_json["symptoms"]
    
    DATA_PATH = "dataset/Training.csv"
    data = pd.read_csv(DATA_PATH).dropna(axis = 1)
    
    # Checking whether the dataset is balanced or not
    disease_counts = data["prognosis"].value_counts()
    # print(disease_counts)
    temp_df = pd.DataFrame({
        "Disease": disease_counts.index,
        "Counts": disease_counts.values
    })

    # Encoding the target value into numerical
    encoder = LabelEncoder()
    data["prognosis"] = encoder.fit_transform(data["prognosis"])

    X = data.iloc[:,:-1]
    y = data.iloc[:, -1]
    

    # Training the models
    final_svm_model = joblib.load("svm.cls")
    final_nb_model = joblib.load("guassiannb.cls")
    final_rf_model = joblib.load("randomforestclassifier.cls")

    symptoms = X.columns.values
    
    # Creating a symptom index dictionary to encode the
    symptom_index = {}
    for index, value in enumerate(symptoms):
        symptom = " ".join([i.capitalize() for i in value.split("_")])
        symptom_index[symptom] = index
    print(symptom_index)

    data_dict = {
        "symptom_index":symptom_index,
        "predictions_classes":encoder.classes_
    }
    
    # Defining Function
    def predictDisease(symptoms):
        symptoms = symptoms.split(",")
        
        # creating input data for the models
        input_data = [0] * len(data_dict["symptom_index"])
        for symptom in symptoms:
            index = data_dict["symptom_index"][symptom]
            input_data[index] = 1
            
        # reshaping the input data and converting it
        input_data = np.array(input_data).reshape(1,-1)
        
        # generating individual outputs
        rf_prediction = data_dict["predictions_classes"][final_rf_model.predict(input_data)[0]]
        nb_prediction = data_dict["predictions_classes"][final_nb_model.predict(input_data)[0]]
        svm_prediction = data_dict["predictions_classes"][final_svm_model.predict(input_data)[0]]
        
        final_prediction = mode([rf_prediction, nb_prediction, svm_prediction])[0][0]
        predictions = {
            "rf_model_prediction": rf_prediction,
            "naive_bayes_prediction": nb_prediction,
            "svm_model_prediction": nb_prediction,
            "final_prediction":final_prediction
        }
        return predictions
        
    return predictDisease(",".join(symptom_inputs))



if __name__ == "__main__":
	app.run(debug=True)
