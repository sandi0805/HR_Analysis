
/**********
    BAR CHART
**********/

// d3.json('/api/avg_rating_by_dept').then(data => {
//   salaryhike = data.map(d => d['salaryhike']);
//   ratings = data.map(d => d['AvgPerformanceRating']);
  
//   var data = [
//     {
//       x: ratings,
//       y: departments,      
//       type: 'bar',
//       orientation: 'h'
//     }
//   ];

//   var layout = {
//     title: 'Performance Ratings by Department',
//     xaxis: {'title': 'Avg. Performance Rating'},
//     yaxis: {'title': 'Department'},
//     autosize: true
//   };
  
//   Plotly.newPlot('intro-bar-chart', data, layout);

// });
/********
 * GAUGE CHART
 */

d3.json('/api/job_satisfaction_avg').then(function(data) {
var happiness = data.map(d => d['job_satisfaction_avg']);
var data = [
	{
		domain: { x: [0,1], y: [0,1] },
		value: 2.7123,
		title: { text: "Average Job Satisfaction" },
		type: "indicator",
		mode: "gauge+number"
	}
];

var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
Plotly.newPlot('intro-gauge-chart', data, layout);

});

/*******
 * LINE GRAPH
 */

// var trace1 = {
//     x: [1, 2, 3, 4],
//     y: [10, 15, 13, 17],
//     mode: 'line',
//     marker: {
//       color: 'rgb(219, 64, 82)',
//       size: 12
//     }
//   };
  
//   var data = [trace1];
  
//   var layout = {
//     title: 'Line and Scatter Styling'
//   };
  
//   Plotly.newPlot('intro-line-graph', data, layout);

// data = d3.json('/api/salaryhikeBytenure').then(data => {
//   salaryhike = data.map(d => d['percent_salary_hike']);
//   yearsatcompany = data.map(d => d['yearsatcompany']);
//   yearsinrole = data.map(d => d['yearsinrole']);
//   jobsatisfaction = data.map(d => d['jobsatisfaction']);
//   annualincome = data.map(d => d['annualincome']);
//   age = data.map(d => d['age']);
//   performance = data.map(d => d['performance']);

//BOXPLOT doesn't work?

// var y0 = [];
// var y1 = [];
// for (var i = 0; i < 50; i ++) {
// 	y0[i] = Math.random();
// 	y1[i] = Math.random() + 1;
// };

// var trace1 = {
//   y: salaryhike,
//   type: 'box'
// };

// var trace2 = {
//   y: performance,
//   type: 'box'
// };

// var data = [trace1, trace2];

// Plotly.newPlot('intro-scatter-plot', data, layout)

/*******
* SCATTER
*/

  // d3.json('/api/salaryhikeBytenure').then(data => {
  //   salaryhike = data.map(d => d['percent_salary_hike']);
  //   yearsatcompany = data.map(d => d['yearsatcompany']);
  //   yearsinrole = data.map(d => d['yearsinrole']);
  //   jobsatisfaction = data.map(d => d['jobsatisfaction']);
  //   annualincome = data.map(d => d['annualincome']);
  //   age = data.map(d => d['age']);
  //   performance = data.map(d => d['performance']);
  //   promotionyears = data.map(d => d['yearssincelastpromotion']);
  
  // var trace1 = {
  //   x: yearsinrole,
  //   y: salaryhike,
  //   mode: 'markers',
  //   type: 'scatter',
  //   name: 'Job Satisfaction',
  //   text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
  //   marker: { size: 10 }
  // };
  
  // var trace2 = {
  //   x: yearsinrole,
  //   y: salaryhike,
  //   mode: 'markers',
  //   type: 'scatter',
  //   name: 'Years in Current Role',
  //   text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
  //   marker: { size: 8 }
  // };

  // var trace2 = {
  //   x: promotionyears,
  //   y: salaryhike,
  //   mode: 'markers',
  //   type: 'scatter',
  //   name: 'Years in Current Role',
  //   text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
  //   marker: { size: 5 }
  // };

//Attrition by Dept Pie Chart
var attdept = null;
var attrition = null;

attdept_dropdown = d3.select('#attdept-dropdown')
attdept_btn = d3.select('#attdept-btn'); 

// add event listener to the filter btn
attdept_dropdown.on('change', attdeptFunction);
attdept_btn.on('click', attdeptFunction);

// create reset var function
function resetVariables() {
  attdept = null;
  attrition = null
}

//Dept change handler function
function attdeptFunction() {
  // select dropdown and get value
  attdept = attdept_dropdown.property('value');
  buildDepts(attdept);
}

//Build Dept Pie Function
//set up to accept depts

function buildDepts(attdept=null, attrition=null) {
  d3.json('/api/dept_attrition').then(data => {
   if(attdept) {
      if(attdept != 'all') { 
        // only filter if user selects an option
        data = data.filter(d => d['department'])
      }
    }
    if(attrition) {
      if(attrition != 'all') { 
        // only filter if user selects an option
        data = data.filter(d => d['attrition'])
      }
    }

//Function to handle the change event of dept selection in the pie chart

  var data = {
    title: 'Attrition'
  };

var data = [{
  labels: ["Employees Who Left", "Employees Who Stayed"],
  values: attrition,
  type: "pie"
}];

var layout = {
  height: 600,
  width: 800,
  paper_bgcolor: 'black',
  plot_bgcolor: 'black',
  title: 'Attrition by Dept',
  font: {
    color: 'white'
  },
};

Plotly.newPlot("attrition-pie", data, layout);
});
}
resetVariables(); //reset variables before ending the function
//end of buildDepts
// make sure that you call this function
buildDepts();

//////////////////////////////////////////
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
  title: 'The Cost of Overtime',
  font: {
    color: 'white'
  },
};

Plotly.newPlot("intro-pie-chart", data, layout);
})
