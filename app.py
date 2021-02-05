<<<<<<< HEAD
import pandas as pd
import json
from flask import Flask, render_template
from sqlalchemy import create_engine
import pymysql
from config import remote_db_endpoint, remote_db_port, remote_db_name, remote_db_user, remote_db_pwd

# set up MySQL and connect
pymysql.install_as_MySQLdb()
engine = create_engine(f"mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}:{remote_db_port}/{remote_db_name}")

app = Flask(__name__)

# Function to convert a CSV to JSON
# Takes the file paths as arguments
# def make_json('Datasets/employee_attrition_train.csv', jsonFilePath):

@app.route("/")
def index():

    # use render_template to serve up the index.html

    return render_template("index.html")

@app.route("/EmployeeData")
def Employee_Data():

    conn = engine.connect()

    # Opening csv data file 
    employee_survey_df = pd.read_sql('SELECT * FROM employee_survey', con=conn)
    employee_survey_json = employee_survey_df.to_json(orient='records')
    #parsed = json.loads(json_f)
    #json_h = json.dumps(parsed,indent = 4)
    #Employee_Data = csv.load(f)

    # open the csv data file
    # return that csv through the endpoint we created
  
    return employee_survey_json

    conn.close()

if __name__ == "__main__":
=======
import json
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():

    # use render_template to serve up the index.html

    return render_template("index.html")

@app.route("/samples")
def samples():
    # Opening JSON file 
    f = open('static/data/samples.json',)
    samples_dat = json.load(f)

    # open the json file, located at static/data/samples.json
    # use json.load() to read in the file as json
    # return that json through the Flask endpoini
    
    return samples_dat

if __name__ == "__main__":
>>>>>>> 40e69bebccbdf4622eedae45bad750ad6d58dc2d
    app.run(debug=True)