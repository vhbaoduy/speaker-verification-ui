from pymongo import MongoClient
from core_ai import get_default_config

DB_URL = "mongodb://localhost:27017"

def get_database():
    client = MongoClient(DB_URL)
    return client['speaker_verification']

def get_collection(db_connection,collection_name):
    return db_connection[collection_name]

# Get DB connection
db_instance = get_database()

