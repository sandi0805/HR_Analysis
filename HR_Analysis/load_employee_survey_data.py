import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
import pymysql
from config import remote_db_endpoint, remote_db_port, remote_db_name, remote_db_user, remote_db_pwd

# Configure MySQL connection and connect 
pymysql.install_as_MySQLdb()
engine = create_engine(f"mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}:{remote_db_port}/{remote_db_name}")
conn = engine.connect()

employee_survey_df = pd.read_csv('Datasets/employee_attrition_train.csv')

employee_survey_df.to_sql('employee_survey', con=conn, index=False, if_exists='replace')

conn.close()
engine.dispose()