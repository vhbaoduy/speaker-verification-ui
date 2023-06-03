from pymongo import MongoClient
from core_ai import get_default_config
import os

MONGO_HOST = os.environ.get("MONGO_HOST")
MONGO_PORT = os.environ.get("MONGO_PORT")
if MONGO_HOST is None:
    MONGO_HOST = "localhost"

if MONGO_PORT is None:
    MONGO_PORT = 27017

# DB_URL = f"mongodb://{MONGO_HOST}:{MONGO_PORT}"
# print(MONGO_HOST, MONGO_PORT)

def get_database():
    '''
        Get database instance
    '''
    client = MongoClient(MONGO_HOST,int(MONGO_PORT))
    return client['speaker_verification']

def get_collection(db_connection,collection_name):
    '''
        Get collection from database
        Args:
            db_connection: db client that connected to mongodb
            collection_name: the name of collection
        Return: corresponding collection
    '''
    return db_connection[collection_name]

# Get DB connection
db_instance = get_database()

