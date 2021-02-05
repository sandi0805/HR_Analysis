import pandas as pd
import json
from flask import Flask, render_template

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
    # Opening csv data file 
    f = pd.read_csv('Datasets/employee_attrition_train.csv')
    json_f = f.to_json(orient='records')
    parsed = json.loads(json_f)
    json_h = json.dumps(parsed,indent = 4)
    #Employee_Data = csv.load(f)

    # open the csv data file
    # return that csv through the endpoint we created
  
    return json_h

if __name__ == "__main__":
    app.run(debug=True)