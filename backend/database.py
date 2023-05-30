from pymongo import MongoClient

DB_URL = "mongodb://localhost:27017"

def get_database():
    client = MongoClient(DB_URL)
    return client['speaker_verification']

def get_collection(db_connection,collection_name):
    return db_connection[collection_name]

db_instance = get_database()
user_db = get_collection(db_instance,"users")
config_db = get_database(db_instance,"configs")
user_testing_db = get_collection(db_instance, "users_testing")