/*
  1. remove event listener from dropdown
  2. create button for filter
  3. add event listner (click) to btn
  4. grab vayues for gender and dept
  5. pass those to the build charts function
*/
var gender = null;
var dept = null;
/*******************
 * Drop downs and buttons
 */
dept_dropdown = d3.select('#dept-dropdown');
gender_dropdown = d3.select('#gender-dropdown');
filter_btn = d3.select('#filter-btn'); 
// add event listener to the filter btn
dept_dropdown.on('change', filterFunction);
gender_dropdown.on('change', filterFunction);
filter_btn.on('click', filterFunction);
// create reset var function
function resetVariables() {
  gender = null;
  dept = null  
}
/****************
 * Gauge Chart
 */
var data = [
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: 2.7123,
		type: "indicator",
		mode: "gauge+number"
	}
];
var layout = { width: 600, height: 500, margin: { t: 0, b: 0 },
font: {
  color: 'white'
},
paper_bgcolor: 'black',
plot_bgcolor: 'black'
};
Plotly.newPlot('intro-gauge-chart', data, layout);
/****************
 * Dept change handler function
 */
 function filterFunction() {
   // select gender dropdown and get value
   dept = dept_dropdown.property('value');
   gender = gender_dropdown.property('value');
   console.log(gender);
   console.log(dept);
   buildCharts(gender, dept);
 }
/*******************
 * Build charts function
 */
//set up to accept gender
function buildCharts(gender=null, dept=null) {
  // attrition chart
  d3.json('/api/gender_demographic').then(data => {
   if(gender) {
      if(gender != 'all') { // only filter if user selects an option
        data = data.filter(d => d['gender'].trim().toUpperCase() == gender.trim().toUpperCase())
      }
    }
    // apply filter to department if there is a selected value for it
    if(dept) {
      if(dept != 'all') {
        data = data.filter(d => d['department'].trim().toUpperCase() == dept.trim().toUpperCase())
      }
    }
    sortedData = data.sort((d1, d2) => {(d2['annual_income'].toString() - d1['annual_income'].toString())});
    employee_number = sortedData.map(d => `EMP ${d['employee_number'].toString()}`);
    attrition = sortedData.map(d => d['attrition']);
    annual_income = sortedData.map(d => d['annual_income']);
    var trace1 = {
      x: employee_number,
      y: annual_income,
      marker:{
        color: attrition
      },
      type: 'bar'
    };
    var data = [trace1];
    var layout = {
      
      xaxis: {title: 'Employee'},
      yaxis: {title: 'Salary'},
      paper_bgcolor: 'rgba(0,0,0,0)', // transparent - this could be replaced with an actual color if you want
      plot_bgcolor: 'rgba(0,0,0,0)', // transparent - this could be replaced with an actual color if you want
      font: {color: 'white'},
      fillcolor: 'blue'
    };
    Plotly.newPlot('attrition-salary', data, layout);
  }); // end of d3.json (gender-demo)
    // reset config variables
    resetVariables();
} // end of buildCharts function
// make sure that you call this function
buildCharts();


// 
////////////////////////////////////////
/////////////////////////////////////////
//Overtime Pie Chart 
d3.json('/api/total_overtime_paid').then(data => {
  total_overtime_paid = data.map(d => d['total_overtime_paid']);
var data = {
  title: 'Overtime Cost'
};
var data = [{
labels: ["Employees Who Left", "Employees Who Stayed"],
values: total_overtime_paid,
type: "pie"
}];
var layout = {
height: 600,
width: 800,
paper_bgcolor: 'black',
plot_bgcolor: 'black',
font: {
  color: 'white'
},
};
Plotly.newPlot("intro-pie-chart", data, layout);
})