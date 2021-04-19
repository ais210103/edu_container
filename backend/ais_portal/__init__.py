from flask import render_template, request, Flask, abort, make_response,jsonify, send_from_directory, redirect, url_for
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,scoped_session
from sqlalchemy.ext.declarative import declarative_base
import os

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False          # 日本語文字列が文字化けしないようにするおまじない
CORS(app) #Allow CORS


user = os.environ['POSTGRES_USER']
password = os.environ['POSTGRES_PASSWORD'] 
host = os.environ['POSTGRES_HOST']
db = os.environ['POSTGRES_DB']
port = os.environ['POSTGRES_PORT']

try:
    connection_uri = f'postgresql+psycopg2://{user}:{password}@{host}:{port}/{db}'
    engine = create_engine(connection_uri, pool_size =10)
    print("connection uri: ", connection_uri)
except(Exception) as error:
    print(error)

if(engine):
    print("DB ENGINE CREATED", engine)

session = scoped_session(sessionmaker(bind=engine))
Base=declarative_base()



