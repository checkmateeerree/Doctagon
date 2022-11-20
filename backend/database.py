import pymongo
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from flask import Flask


cluster = MongoClient("mongodb+srv://neiphu:w5oD50ZoiVcnYteZ@cluster0.wj501am.mongodb.net/")
db = cluster["doctagon"]
user_info = db["UserInfo"]
session_info = db["SessionID"]
app = Flask(__name__)
bcrypt = Bcrypt(app)

def login(email, password):
    results = user_info.find_one({"email":email})
    if bcrypt.check_password_hash(results["password"], password):
        return True
    else:
        return False
    
def register(email, password, first_name, last_name):
    exist = user_info.find({"email": email})
    for e in exist:
        return "Error: email already exists, " + e["email"]
    else: 
        user = {
            "email": email,
            "password": bcrypt.generate_password_hash(password),
            "first_name": first_name,
            "last_name": last_name
        }
        user_info.insert_one(user)
        return "Success"

def set_data(SESSION_ID, index, value):
    email = session_info.find_one({"_id": SESSION_ID})["email"]
    result = user_info.find_one({"email": email})
    if result != None:
        user_info.update_one({"email": email}, {"$set": {index: value}})
        return True
    return False

def set_session_id(email, SESSION_ID):
    post = {
        "_id": SESSION_ID,
        "email": email
    }
    session_info.insert_one(post)

#run in driver code  
#m = Mongo()