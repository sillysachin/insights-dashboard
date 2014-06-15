'use strict';

var chart;
var chartData = [];
var chartCursor;

AmCharts.ready(function() {


    // SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.pathToImages = "amcharts/images/";
    chart.dataProvider = chartData;
    chart.categoryField = "date";
    chart.dataDateFormat = "YYYY-MM-DD";

    // listen for "dataUpdated" event (fired when chart is rendered) and call zoomChart method when it happens
    chart.addListener("dataUpdated", zoomChart);

    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.dashLength = 1;
    categoryAxis.gridAlpha = 0.15;
    categoryAxis.minorGridEnabled = true;
    categoryAxis.axisColor = "#DADADA";

    // value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0.2;
    valueAxis.dashLength = 1;
    chart.addValueAxis(valueAxis);

    // GRAPH
    var graph = new AmCharts.AmGraph();
    graph.title = "red line";
    graph.valueField = "visits";
    graph.bullet = "round";
    graph.bulletBorderColor = "#FFFFFF";
    graph.bulletBorderThickness = 2;
    graph.bulletBorderAlpha = 1;
    graph.lineThickness = 2;
    graph.lineColor = "#b5030d";
    graph.negativeLineColor = "#0352b5";
    graph.balloonText = "[[category]]<br><b><span style='font-size:14px;'>value: [[value]]</span></b>";
    graph.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
    chart.addGraph(graph);

    // CURSOR
    chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorPosition = "mouse";
    chart.addChartCursor(chartCursor);

    // SCROLLBAR
    var chartScrollbar = new AmCharts.ChartScrollbar();
    chartScrollbar.graph = graph;
    chartScrollbar.scrollbarHeight = 40;
    chartScrollbar.color = "#FFFFFF";
    chartScrollbar.autoGridCount = true;
    chart.addChartScrollbar(chartScrollbar);

    // WRITE
    chart.write("chartdiv");


    loadCSV("service/data.txt");
});

function loadCSV(file) {
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari
        var request = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        var request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // load
    request.open('GET', file, false);
    request.send();
    parseCSV(request.responseText);
}

function parseCSV(data) {
    //replace UNIX new lines
    data = data.replace(/\r\n/g, "\n");
    //replace MAC new lines
    data = data.replace(/\r/g, "\n");
    //split into rows
    var rows = data.split("\n");

    // loop through all rows
    for (var i = 0; i < rows.length; i++) {
        // this line helps to skip empty rows
        if (rows[i]) {
            // our columns are separated by comma
            var column = rows[i].split(",");

            // column is array now
            // first item is date
            var date = column[0];
            // second item is value of the second column
            var value = column[1];

            // create object which contains all these items:
            var dataObject = {
                date: date,
                visits: value
            };
            // add object to chartData array
            chartData.push(dataObject);
        }
    }
    chart.validateData();
}

 // this method is called when chart is first inited as we listen for "dataUpdated" event
function zoomChart() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
}

 // changes cursor mode from pan to select
function setPanSelect() {
    if (document.getElementById("rb1").checked) {
        chartCursor.pan = false;
        chartCursor.zoomable = true;

    } else {
        chartCursor.pan = true;
    }
    chart.validateNow();
}