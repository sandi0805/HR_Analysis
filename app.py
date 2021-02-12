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

# dept_gender_stats endpoint
@app.route("/api/dept_gender_stats")
def dept_gender_stats():

    conn = engine.connect()

    query = '''
        SELECT 
            gender,
            department,
            AVG(MonthlyIncome * 12) AS annual_income_avg,
            SUM(CASE Attrition WHEN 'YES' THEN 1 ELSE 0 END) AS attrition_sum,    
            COUNT(*) AS employee_count,
            AVG(JobSatisfaction) AS job_satisfaction_avg,
            AVG(YearsAtCompany) AS tenure_avg
        FROM 
            employee_survey
        GROUP BY
            gender,
            department
        ORDER BY
            department
    '''

    # Opening csv data file 
    data_df = pd.read_sql(query, con=conn)
    data_json = data_df.to_json(orient='records')
   
    # Close database connection
    conn.close()

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
    
# Average Job Satisfaction

@app.route("/api/job_satisfaction_avg")
def job_satisfaction_avg():

   conn = engine.connect()

   job_satisfaction_avg = pd.read_sql('SELECT AVG(JobSatisfaction) AS job_satisfaction_avg FROM employee_survey', con=conn)
   job_satisfaction_avg_json = job_satisfaction_avg.to_json(orient='records')
 

   conn.close()

   return job_satisfaction_avg_json


@app.route("/api/genderdemogrpahic")
def genderdemogrpahic():

    conn = engine.connect()
  
    query = '''
     SELECT 
	    (MonthlyIncome * 12) AS annual_income,
        CASE Attrition WHEN 'YES' then 1 ELSE 0 END AS attrition,    
        Gender AS gender,
        Department AS department,
        JobSatisfaction AS jobsatisfaction,
        YearsAtCompany AS yearsatcompany
    FROM 
	    employee_survey 
	WHERE  NOT (attrition is NULL OR
		gender IS NULL OR
        department IS NULL OR
        jobsatisfaction IS NULL OR
        yearsatcompany IS NULL);
    '''
    Gender_Demographic_df = pd.read_sql(query, con=conn)
    Gender_Demographic_json = Gender_Demographic_df.to_json(orient='records')

    conn.close()
    return Gender_Demographic_json

#close DB connection

@app.route("/api/genderIncome")
def genderIncome(): 

    conn = engine.connect()

    query = '''

    SELECT 
        Department,
        AVg(MonthlyIncome) AS Income,
        Gender
    FROM 
        employee_survey
    WHERE Attrition = "Yes"
    Group by MonthlyIncome
    ORDER BY Department

    '''


    gender_income_df = pd.read_sql(query, con=conn)
    gender_income_json = gender_income_df.to_json(orient='records')

    conn.close()
    return gender_income_json


#run the app in debug mode
if __name__ == "__main__":
    app.run(debug=True)