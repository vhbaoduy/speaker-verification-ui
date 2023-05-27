from pymongo import MongoClient

db_connection = MongoClient("mongodb:://localhost:27017")
db = db_connection.database_name
collection = db["collection_name"]