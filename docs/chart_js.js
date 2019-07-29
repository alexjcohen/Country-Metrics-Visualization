function writeCharts() {
	// total spending by category
	
	writeQuery('total_spend', 
				  'SELECT AE, C, J, Q, X', 
				  totalSpendHandler);
	
	writeQuery('total_spend', 
				  'SELECT AE, D, K, R, Y', 
				  totalSpendHandler2);

	writeQuery('total_spend', 
				  'SELECT AE, E, L, S, Z', 
				  totalSpendHandler3);

	writeQuery('total_spend', 
				  'SELECT AE, F, M, T, AA', 
				  totalSpendHandler4);
				  
	writeQuery('total_spend', 
				  'SELECT AE, G, O, U, AB', 
				  totalSpendHandler5);
				  
	// Military, Healthcare, and Education spending
	
	writeQuery('total_spend_no_US', 
				  'SELECT AE, J, Q, X', 
				  overallSpendHandler);
	
	writeQuery('total_spend_no_US', 
				  'SELECT AE, K, R, Y', 
				  overallSpendHandler2);

	writeQuery('total_spend_no_US', 
				  'SELECT AE, L, S, Z', 
				  overallSpendHandler3);

	writeQuery('total_spend_no_US', 
				  'SELECT AE, M, T, AA', 
				  overallSpendHandler4);
				  
	writeQuery('total_spend_no_US', 
				  'SELECT AE, O, U, AB', 
				  overallSpendHandler5);	
		
				  
	// education spending per GDP
	writeQuery('edu_gdp_per_capita', 
				  'SELECT C, N, M, L, B', 
				  eduGDPHandler);
	
	writeQuery('edu_gdp_per_capita', 
				  'SELECT D, O, M, L, B', 
				  eduGDPHandler2);
	
	writeQuery('edu_gdp_per_capita', 
				  'SELECT E, P, M, L, B', 
				  eduGDPHandler3);
				  
	writeQuery('edu_gdp_per_capita', 
				  'SELECT F, Q, M, L, B', 
				  eduGDPHandler4);
	
	writeQuery('edu_gdp_per_capita', 
				  'SELECT G, R, M, L, B', 
				  eduGDPHandler5);	
	
	writeQuery('edu_gdp_per_capita', 
				  'SELECT V,W', 
				  eduGDPGeoHandler);	
				  
	// healthcare spending per GDP
	
	writeQuery('health_gdp_per_capita', 
				  'SELECT C, N, M, L, B', 
				  hltGDPHandler);
	
	writeQuery('health_gdp_per_capita', 
				  'SELECT D, O, M, L, B', 
				  hltGDPHandler2);
	
	writeQuery('health_gdp_per_capita', 
				  'SELECT E, P, M, L, B', 
				  hltGDPHandler3);
				  
	writeQuery('health_gdp_per_capita', 
				  'SELECT F, Q, M, L, B', 
				  hltGDPHandler4);
	
	writeQuery('health_gdp_per_capita', 
				  'SELECT G, R, M, L, B', 
				  hltGDPHandler5);	
	
	writeQuery('health_gdp_per_capita', 
				  'SELECT U,R', 
				  hltGDPGeoHandler);	
	
	// military spending per GDP
	writeQuery('mil_gdp_per_capita', 
				  'SELECT C, N, M, L, B', 
				  milGDPHandler);
	
	writeQuery('mil_gdp_per_capita', 
				  'SELECT D, O, M, L, B', 
				  milGDPHandler2);
	
	writeQuery('mil_gdp_per_capita', 
				  'SELECT E, P, M, L, B', 
				  milGDPHandler3);
				  
	writeQuery('mil_gdp_per_capita', 
				  'SELECT F, Q, M, L, B', 
				  milGDPHandler4);
	
	writeQuery('mil_gdp_per_capita', 
				  'SELECT G, R, M, L, B', 
				  milGDPHandler5);
				  
	writeQuery('mil_gdp_per_capita', 
				  'SELECT U,R', 
				   milGDPGeoHandler);
				  
// healthcare growth
	writeQuery('health_growth_rel', 
				  'SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R', 
				  healthGrowthRelHandler);
				  
	writeQuery('health_growth_abs', 
				  'SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R', 
				  healthGrowthAbsHandler);

// education growth 
	writeQuery('education_growth_rel', 
				  'SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R', 
				  educationGrowthRelHandler);
				  
	writeQuery('education_growth_abs', 
				  'SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R', 
				  educationGrowthAbsHandler);
}

function writeQuery(sheetName, query, responseHandler) {
	var queryString = encodeURIComponent(query);
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1tvEVd21-D0GoTtNfIJMretG7ta_lurB1rIm-VWaTU3E/gviz/tq?sheet=' + sheetName + '&headers=1&tq=' + queryString);
	query.send(responseHandler);		
} //writeQuery


// function to format numbers 
function applyformat(data, column, n,  pre, suf) {
	
	var numFormat = new google.visualization.NumberFormat({
		fractionDigits: n, prefix: pre, suffix: suf});
	
	return(numFormat.format(data, column));
}

function applyPercentageFormat(data, column) {
	
	var numFormat = new google.visualization.NumberFormat({
		fractionDigits: 2, pattern: '#.##%'});
	
	return(numFormat.format(data, column));
}

/* 
	Total Spending Breakdown
*/

function totalSpendHandler(response) {
	
	var data = response.getDataTable();
	
	applyformat(data, 1, 1, '$', 'B');
	applyformat(data, 2, 1, '$', 'B');
	applyformat(data, 3, 1, '$', 'B');
	applyformat(data, 4, 1, '$', 'B');

	var options = {
		height: 500,
		width: 800,
		vAxis: {title: 'Spending ($B)', format: 'currency'},
		legend: {position: 'right'},
		title: 'Annual Spending by Category ($B) - 2010',
		isStacked: true
	};
	
	var chart = new google.visualization.ColumnChart(
		document.getElementById('totalSpend1'));
	
	chart.draw(data, options);
	
} //totalSpendHandler

function totalSpendHandler2(response) {
	
	var data = response.getDataTable();
	
	applyformat(data, 1, 1, '$', 'B');
	applyformat(data, 2, 1, '$', 'B');
	applyformat(data, 3, 1, '$', 'B');
	applyformat(data, 4, 1, '$', 'B');


	
	var options = {
		height: 500,
		width: 800,
		vAxis: {title: 'Spending ($B)', format: 'currency'},
		legend: {position: 'right'},
		title: 'Annual Spending by Category ($B) - 2011',
		isStacked: true
	};
	
	var chart = new google.visualization.ColumnChart(
		document.getElementById('totalSpend2'));
	
	chart.draw(data, options);
	
} //totalSpendHandler2

function totalSpendHandler3(response) {
	
	var data = response.getDataTable();
	
	applyformat(data, 1, 1, '$', 'B');
	applyformat(data, 2, 1, '$', 'B');
	applyformat(data, 3, 1, '$', 'B');
	applyformat(data, 4, 1, '$', 'B');


	
	var options = {
		height: 500,
		width: 800,
		vAxis: {title: 'Spending ($B)', format: 'currency'},
		legend: {position: 'right'},
		title: 'Annual Spending by Category ($B) - 2012',
		isStacked: true
	};
	
	var chart = new google.visualization.ColumnChart(
		document.getElementById('totalSpend3'));
	
	chart.draw(data, options);
	
} //totalSpendHandler3

function totalSpendHandler4(response) {
	
	var data = response.getDataTable();
	
	applyformat(data, 1, 1, '$', 'B');
	applyformat(data, 2, 1, '$', 'B');
	applyformat(data, 3, 1, '$', 'B');
	applyformat(data, 4, 1, '$', 'B');


	
	var options = {
		height: 500,
		width: 800,
		vAxis: {title: 'Spending ($B)', format: 'currency'},
		legend: {position: 'right'},
		title: 'Annual Spending by Category ($B) - 2013',
		isStacked: true
	};
	
	var chart = new google.visualization.ColumnChart(
		document.getElementById('totalSpend4'));
	
	chart.draw(data, options);
	
} //totalSpendHandler4

function totalSpendHandler5(response) {
	
	var data = response.getDataTable();
	
	applyformat(data, 1, 1, '$', 'B');
	applyformat(data, 2, 1, '$', 'B');
	applyformat(data, 3, 1, '$', 'B');
	applyformat(data, 4, 1, '$', 'B');


	
	var options = {
		height: 500,
		width: 800,
		vAxis: {title: 'Spending ($B)', format: 'currency'},
		legend: {position: 'right'},
		title: 'Annual Spending by Category ($B) - 2014',
		isStacked: true
	};
	
	var chart = new google.visualization.ColumnChart(
		document.getElementById('totalSpend5'));
	
	chart.draw(data, options);
	
} //totalSpendHandler5


function overallSpendHandler(response) {
	
	var data = response.getDataTable();
	
	applyformat(data, 1, 1, '$', 'B');
	applyformat(data, 2, 1, '$', 'B');
	applyformat(data, 3, 1, '$', 'B');
	
	var options = {
		height: 500,
		width: 800,
		hAxis: {title: 'Spending ($B)', format: 'currency'},
		legend: {position: 'right'},
		title: 'Annual Spending by Category ($B) - 2010',
		isStacked: true
	};
	
	var chart = new google.visualization.BarChart(
		document.getElementById('overallSpend1'));
	
	chart.draw(data, options);
	
} //overallSpendHandler

function overallSpendHandler2(response) {
	
	var data = response.getDataTable();
	
	applyformat(data, 1, 1, '$', 'B');
	applyformat(data, 2, 1, '$', 'B');
	applyformat(data, 3, 1, '$', 'B');
	
	var options = {
		height: 500,
		width: 800,
		hAxis: {title: 'Spending ($B)', format: 'currency'},
		legend: {position: 'right'},
		title: 'Annual Spending by Category ($B) - 2011',
		isStacked: true
	};
	
	var chart = new google.visualization.BarChart(
		document.getElementById('overallSpend2'));
	
	chart.draw(data, options);
	
} //overallSpendHandler2


function overallSpendHandler3(response) {
	
	var data = response.getDataTable();
	
	applyformat(data, 1, 1, '$', 'B');
	applyformat(data, 2, 1, '$', 'B');
	applyformat(data, 3, 1, '$', 'B');
	
	var options = {
		height: 500,
		width: 800,
		hAxis: {title: 'Spending ($B)', format: 'currency'},
		legend: {position: 'right'},
		title: 'Annual Spending by Category ($B) - 2012',
		isStacked: true
	};
	
	var chart = new google.visualization.BarChart(
		document.getElementById('overallSpend3'));
	
	chart.draw(data, options);
	
} //overallSpendHandler3


function overallSpendHandler4(response) {
	
	var data = response.getDataTable();
	
	applyformat(data, 1, 1, '$', 'B');
	applyformat(data, 2, 1, '$', 'B');
	applyformat(data, 3, 1, '$', 'B');
	
	var options = {
		height: 500,
		width: 800,
		hAxis: {title: 'Spending ($B)', format: 'currency'},
		legend: {position: 'right'},
		title: 'Annual Spending by Category ($B) - 2013',
		isStacked: true
	};
	
	var chart = new google.visualization.BarChart(
		document.getElementById('overallSpend4'));
	
	chart.draw(data, options);
	
} //overallSpendHandler4


function overallSpendHandler5(response) {
	
	var data = response.getDataTable();
	
	applyformat(data, 1, 1, '$', 'B');
	applyformat(data, 2, 1, '$', 'B');
	applyformat(data, 3, 1, '$', 'B');
	
	var options = {
		height: 500,
		width: 800,
		hAxis: {title: 'Spending ($B)', format: 'currency'},
		legend: {position: 'right'},
		title: 'Annual Spending by Category ($B) - 2014',
		isStacked: true
	};
	
	var chart = new google.visualization.BarChart(
		document.getElementById('overallSpend5'));
	
	chart.draw(data, options);
	
} //overallSpendHandler5



/* 
	Education spending per Capita vs GDP per Capita
*/

function eduGDPHandler(response) {
	var data = response.getDataTable();
	
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');
	
	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Education Expense per Capita ($)", format: 'currency'}, 
		legend: {position: 'none'},
		title: '2010 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('eduGDP'));
	
	chart.draw(data, options);
	
} //eduGDPHandler

function eduGDPHandler2(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');


	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Education Expense per Capita ($)", format: 'currency'}, 
		legend: {position: 'none'},
		title: '2011 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('eduGDP2'));
	
	chart.draw(data, options);
	
} //eduGDPHandler2

function eduGDPHandler3(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');


	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Education Expense per Capita ($)", format: 'currency'}, 
		legend: {position: 'none'},
		title: '2012 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('eduGDP3'));
	
	chart.draw(data, options);
	
} //eduGDPHandler3

function eduGDPHandler4(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');


	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Education Expense per Capita ($)", format: 'currency'}, 
		legend: {position: 'none'},
		title: '2013 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('eduGDP4'));
	
	chart.draw(data, options);
	
} //eduGDPHandler4


function eduGDPHandler5(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');


	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Education Expense per Capita ($)", format: 'currency'},
		legend: {position: 'none'},		
		title: '2014 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('eduGDP5'));
	
	chart.draw(data, options);
	
} //eduGDPHandler5

function eduGDPGeoHandler(response) {
	var data = response.getDataTable();
	applyformat(data, 1, 0, '$', '');

	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Education Expense per Capita ($)", format: 'currency'},
		title: '2014 Data'
	};
	
	var chart = new google.visualization.GeoChart(
		document.getElementById('eduGDPGeo'));
	
	chart.draw(data, options);
	
} //eduGDPGeoHandler


/* 
	Military spending per Capita vs GDP per Capita
*/

function milGDPHandler(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');

	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Military Expense per Capita ($)", format: 'currency'}, 
		legend: {position: 'none'},
		title: '2010 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('milGDP'));
	
	chart.draw(data, options);
	
} //milGDPHandler

function milGDPHandler2(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');

	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Military Expense per Capita ($)", format: 'currency'}, 
		legend: {position: 'none'},
		title: '2011 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('milGDP2'));
	
	chart.draw(data, options);
	
} //milGDPHandler2

function milGDPHandler3(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');

	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Military Expense per Capita ($)", format: 'currency'}, 
		legend: {position: 'none'},
		title: '2012 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('milGDP3'));
	
	chart.draw(data, options);
	
} //milGDPHandler3

function milGDPHandler4(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');

	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Military Expense per Capita ($)", format: 'currency'}, 
		legend: {position: 'none'},
		title: '2013 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('milGDP4'));
	
	chart.draw(data, options);
	
} //milGDPHandler4


function milGDPHandler5(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');

	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Military Expense per Capita ($)", format: 'currency'},
		legend: {position: 'none'},		
		title: '2014 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('milGDP5'));
	
	chart.draw(data, options);
	
} //milGDPHandler5

function milGDPGeoHandler(response) {
	var data = response.getDataTable();
	applyformat(data, 1, 0, '$','');
	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Military Expense per Capita ($)", format: 'currency'},
		title: '2014 Data'
	};
	
	var chart = new google.visualization.GeoChart(
		document.getElementById('milGDPGeo'));
	
	chart.draw(data, options);
	
} //milGDPGeoHandler


/* 
	Healthcare per Capita vs GDP per Capita
*/ 

function hltGDPHandler(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');
	
	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Healthcare Expense per Capita ($)", format: 'currency'}, 
		legend: {position: 'none'},
		title: '2010 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('hltGDP'));
	
	chart.draw(data, options);
	
} //hltGDPHandler

function hltGDPHandler2(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');

	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Healthcare Expense per Capita ($)", format: 'currency'}, 
		legend: {position: 'none'},
		title: '2011 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('hltGDP2'));
	
	chart.draw(data, options);
	
} //hltGDPHandler2

function hltGDPHandler3(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');

	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Healthcare Expense per Capita ($)", format: 'currency'}, 
		legend: {position: 'none'},
		title: '2012 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('hltGDP3'));
	
	chart.draw(data, options);
	
} //hltGDPHandler3

function hltGDPHandler4(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');

	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Healthcare Expense per Capita ($)", format: 'currency'}, 
		legend: {position: 'none'},
		title: '2013 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('hltGDP4'));
	
	chart.draw(data, options);
	
} //hltGDPHandler4


function hltGDPHandler5(response) {
	var data = response.getDataTable();
	data.setColumnProperty(2, 'role', 'tooltip');
	data.setColumnProperty(3, 'role', 'style');
	data.setColumnProperty(4, 'role', 'annotation');

	var options = {
		height: 500,
		width: 800,
		hAxis: {title:"GDP Per Capita ($)", format: 'currency'},
		vAxis: {title:"Healthcare Expense per Capita ($)", format: 'currency'},
		legend: {position: 'none'},		
		title: '2014 Data'
	};
	
	var chart = new google.visualization.ScatterChart(
		document.getElementById('hltGDP5'));
	
	chart.draw(data, options);
	
} //hltGDPHandler5

function hltGDPGeoHandler(response) {
	var data = response.getDataTable();
	applyformat(data, 1, 0, '$', '');
	var options = {
		height: 500,
		width: 800,
	};
	
	var chart = new google.visualization.GeoChart(
		document.getElementById('hltGDPGeo'));
	
	chart.draw(data, options);
	
} //hltGDPHandler5

/* 
	Healthcare growth over time
*/


function healthGrowthRelHandler(response) {
	var data = response.getDataTable();
	
	for (var i = 1; i < 18; i++){
		applyPercentageFormat(data, i);
	};
	var options = {
		height: 500,
		width: 800,
		vAxis: {title: 'Change as a Percentage of GDP (%)', format: 'percent'},
		hAxis: {title: "Year", format: '####'},
		legend: {position: 'right'},
		title: 'Annual Change in Healthcare Spending as a Percentage of GDP'
	};
	
	var chart = new google.visualization.LineChart(
		document.getElementById('health_rel'));
	
	chart.draw(data, options);
	
} //healthGrowthRelHandler


function healthGrowthAbsHandler(response) {
	var data = response.getDataTable();
	for (var i = 1; i < 18; i++){
		applyformat(data, i, 0, '$', 'B');
	};
	var options = {
		height: 500,
		width: 800,
		vAxis: {title: 'Change in Billions ($B)', format: 'currency'},
		hAxis: {title: "Year", format: '####'},
		legend: {position: 'right'},
		title: 'Annual Change in Healthcare Spending ($B)'
	};
	
	var chart = new google.visualization.LineChart(
		document.getElementById('health_abs'));
	
	chart.draw(data, options);
	
} //healthGrowthAbsHandler

/* 
	Education growth over time
*/

function educationGrowthRelHandler(response) {
	var data = response.getDataTable();
		
	for (var i = 1; i < 18; i++){
		applyPercentageFormat(data, i);
	};

	var options = {
		height: 500,
		width: 800,
		vAxis: {title: 'Change as a Percentage of GDP (%)', format: 'percent'},
		hAxis: {title: "Year", format: '####'},
		legend: {position: 'right'},
		title: 'Annual Change in Education Spending as a Percentage of GDP'
	};
	
	var chart = new google.visualization.LineChart(
		document.getElementById('education_rel'));
	
	chart.draw(data, options);
	
} //educationGrowthRelHandler


function educationGrowthAbsHandler(response) {
	var data = response.getDataTable();
	for (var i = 1; i < 18; i++){
		applyformat(data, i, 0, '$', 'B');
	};
	var options = {
		height: 500,
		width: 800,
		vAxis: {title: 'Change in Billions ($B)', format: 'currency'},
		hAxis: {title: "Year", format: '####'},
		legend: {position: 'right'},
		title: 'Annual Change in Education Spending ($B)'
	};
	
	var chart = new google.visualization.LineChart(
		document.getElementById('education_abs'));
	
	chart.draw(data, options);
	
} //educationGrowthAbsHandler
