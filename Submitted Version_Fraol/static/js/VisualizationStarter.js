// Connect to MySQL

//pymysql.install_as_MySQLdb()
//engine = create_engine(f"mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}:{remote_db_port}/{remote_db_name}")
//conn = engine.connect()

//employee_survey_json

function PopulateDropdown() {
    
    // comment this out because you will use this later in a different endpoint
    /*
    d3.json('/EmployeeData').then(data => {

        age = data.map(d => d['Age']);

        //console.log(age);
        age.forEach(Age => {
            d3.select('#selDataset').append('option').text(Age);
        });

    });
    */

    d3.json('/api/jobrole').then(data => {
        role = data.map(d => d['JobRole']);

        role.forEach(role => {
            d3.select('#roledropdown').append('option').text(role);
        });

    });

    d3.json('/api/departments').then(data => {
        department = data.map(d => d['Department']);

        department.forEach(department => {
            d3.select('#departmentdropdown').append('option').text(department);
        });
    
    });

    d3.json('/api/educationfield').then(data => {
        educationField = data.map(d => d['EducationField']);

        educationField.forEach(educField => {
            d3.select('#educFieldDropdown').append('option').text(educField);
        });
    
    });


    d3.json('/api/Annualcostturnover').then(data => {        annualCostofAttrition = data.map(d => d['AnnualCostofAttrition']);

        annualCostofAttrition.forEach(turnoverCost => {
            d3.select('#educFieldDropdown').append('option').text(turnoverCost);
        });
    
    });


    d3.json('/api/gender_demogrpahic').then(data => {
        genderdemographic = data.map(d => d['MonthlyIncome']);

        genderdemographic.forEach(Genderdemo => {
            d3.select('#genderFieldDropdown').append('option').text(Genderdemo);
        });
    
    });


    d3.json('/api//api/dept_gender_stats').then(data => {
        genderStats = data.map(d => d['Income']);

        genderStats.forEach(income => {
            d3.select('#genderIncomeFieldDropdown').append('option').text(income);
        });
    
    });
    

    
}
PopulateDropdown();
