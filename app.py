import pandas as pd
import json
from flask import Flask, render_template, jsonify
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

@app.route("/api/employee_data")
def employee_data():

    conn = engine.connect()

    # Opening csv data file 
    employee_survey_df = pd.read_sql('SELECT * FROM employee_survey', con=conn)
    employee_survey_json = employee_survey_df.to_json(orient='records')

    conn.close()
  #Return json to client

    return employee_survey_json

@app.route("/api/avg_rating_by_dept")
def avg_rating_by_dept():

    conn = engine.connect()

    query = '''
        SELECT
            Department,
            AVG(PerformanceRating) AS AvgPerformanceRating
        FROM
            employee_survey
        GROUP BY
            Department
        ORDER BY
            Department
    '''

    # Opening csv data file 
    data_df = pd.read_sql(query, con=conn)
    data_json = data_df.to_json(orient='records')
   
    conn.close()
  #Return json to client
    return data_json




@app.route("/api/rating_count_by_dept")
def rating_count_by_dept():

    conn = engine.connect()

    query = '''
        SELECT
            Department,
            PerformanceRating,
            COUNT(*) AS RatingCount
        FROM
            employee_survey
        GROUP BY
            Department,
            PerformanceRating
        ORDER BY
            Department,
            PerformanceRating
    '''

    # Opening csv data file 
    data_df = pd.read_sql(query, con=conn)
    data_json = data_df.to_json(orient='records')
   
    conn.close()
  #Return json to client
    return data_json


@app.route("/api/departments")
def departments():

    conn = engine.connect()

    # Opening csv data file 
    data_df = pd.read_sql('SELECT DISTINCT Department FROM employee_survey ORDER BY Department', con=conn)
    data_json = data_df.to_json(orient='records')
   
    conn.close()
  #Return json to client
    return data_json


@app.route("/api/jobrole")
def jobrole():

    conn = engine.connect()

    # Opening csv data file 
    jobrole_df = pd.read_sql('SELECT DISTINCT JobRole FROM employee_survey ORDER BY JobRole', con=conn)
    jobrole_df_json = jobrole_df.to_json(orient='records')
   
    conn.close()
  #Return json to client
    return jobrole_df_json


@app.route("/api/educationfield")
def educ():

    conn = engine.connect()

    # Opening csv data file 
    data_df = pd.read_sql('SELECT DISTINCT EducationField FROM employee_survey ORDER BY EducationField', con=conn)
    data_json = data_df.to_json(orient='records')
   
  #Return json to client
    return data_json

@app.route("/api/Annualcostturnover")
def employeecount():

    conn = engine.connect()

    # Opening csv data file 

    query = '''
    SELECT
        (Sum(MonthlyIncome) * 12) AS AnnualCostofAttrition,
        count(PerformanceRating) AS performanceRate
    FROM
        employee_survey
    WHERE 
        attrition = "YES"
       
    '''
    annual_cost_turnover_df = pd.read_sql(query, con=conn)
    annual_cost_turnover_Json = annual_cost_turnover_df.to_json(orient='records')
    
    conn.close()
  #Return json to client
    return annual_cost_turnover_Json



#close db connection
    conn.close()

#run the app in debug mode
if __name__ == "__main__":
    app.run(debug=True)