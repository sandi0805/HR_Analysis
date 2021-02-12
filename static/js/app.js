/**********
    BAR CHART
**********/

d3.json('/api/avg_rating_by_dept').then(data => {

  departments = data.map(d => d['Department']);
  ratings = data.map(d => d['AvgPerformanceRating']);
  
  var data = [
    {
      x: ratings,
      y: departments,      
      type: 'bar',
      orientation: 'h'
    }
  ];

  var layout = {
    title: 'Performance Ratings by Department',
    xaxis: {'title': 'Avg. Performance Rating'},
    yaxis: {'title': 'Department'},
    autosize: true
  };
  
  Plotly.newPlot('intro-bar-chart', data, layout);

});

/********
 * GAUGE CHART
 */

d3.json('/api/job_satisfaction_avg').then(function(data) {
  var happiness = data.map(d => d['job_satisfaction_avg']);

console.log(happiness);

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

var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'line',
    marker: {
      color: 'rgb(219, 64, 82)',
      size: 12
    }
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Line and Scatter Styling'
  };
  
  Plotly.newPlot('intro-line-graph', data, layout);

  /*******
   * SCATTER
   */

  var trace1 = {
    x: [39317, 37236, 35650, 30066, 29570, 27159, 23557, 21046, 18007],
    y: [33, 20, 13, 19, 27, 19, 49, 44, 38],
    mode: 'markers',
    name: 'North America',
    text: ['United States', 'Canada'],
    marker: {
      color: 'rgb(164, 194, 244)',
      size: 12,
      line: {
        color: 'white',
        width: 0.5
      }
    },
    type: 'scatter'
  };
   
  var data = [trace1];
  
  var layout = {
    title: 'Quarter 1 Growth',
    xaxis: {
      title: 'GDP per Capita',
      showgrid: false,
      zeroline: false
    },
    yaxis: {
      title: 'Percent',
      showline: false
    }
  };
  
  Plotly.newPlot('intro-scatter-plot', data, layout);