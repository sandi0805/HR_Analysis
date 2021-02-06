// Connect to MySQL

//pymysql.install_as_MySQLdb()
//engine = create_engine(f"mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}:{remote_db_port}/{remote_db_name}")
//conn = engine.connect()

//employee_survey_json

// from data.js
var employeeData = d3.json("/EmployeeData");

// Identify the table and tbody
var tbody = d3.select('#tbody');

//build a table to see an overview
function buildTable(employeeData){
    employeeData.forEach(record => {
        var row = tbody.append('tr');
        Object.values(record).forEach(col => {
            row.append('td').text(col);        
        });
    })
}

buildTable(employeeData);

// d3.json("/EmployeeData").then(function(response)  {
//     // Select the input element and get the raw HTML node
//     // get reference to drop down
//     var ddElement = d3.button("#dropdownMenuButton");
  
//     // get id values for dropdown options
//     var idOptions = Object.values(response)[2].map(d => d.id).flat(1);
//     idOptions.sort((a,b) => (a-b));
  
//     //loop through array of IDs and create new DOM node for each and append
//     idOptions.forEach(id => {
//       ddElement
//         .append("option")
//         .text(id)
//         .property('value', id);
//     });    
  
//     var firstId = idOptions[0];
//     buildCharts(firstId);
//     buildMetadata(firstId);
  
//   }); 

// function showOptions() {
//     d3.json('/EmployeeData').then(data => {
//         var { names } = data;
//         names.forEach(name => {
//             d3.select('button').append('option').text(name);
//         });
//     });
// };

// function showData() {
//     d3.json('/EmployeeData').then(data => {
//         var { metadata, samples } = data;
//         var selection = d3.select('select').property('value');
//         d3.select('.panel-body').html('');
//         metadata = metadata.filter(obj => obj.id == selection)[0];
//         Object.entries(metadata).forEach(([key, val]) => {
//             d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}: ${val}`);
//         });
//         employeedata = employeedata.filter(obj => obj.id == selection)[0];
//         var { otu_ids, otu_labels, sample_values } = samples;
//         var barData = [{
//             x: sample_values.slice(0,10).reverse(),
//             y: otu_ids.slice(0,10).reverse().map(id => `OTU ${id}`),
//             text: otu_labels.slice(0,10).reverse(),
//             type: 'bar',
//             orientation: 'h'
//         }];