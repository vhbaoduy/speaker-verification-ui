from pymongo import MongoClient
from core_ai import get_default_config

DB_URL = "mongodb://localhost:27017"

def get_database():
    '''
        Get database instance
    '''
    client = MongoClient(DB_URL)
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

