/**
 * Author: Matteo Pellanda
 * Version: 0.0.1
 */

// For jsdom version 10 or higher.
const fs = require('fs');
const JSDOM = require('jsdom').JSDOM;
const jsdom = new JSDOM('<body><div id="container"></div></body>', { runScripts: 'dangerously' });
const window = jsdom.window;

// For jsdom version 9 or lower
// var jsdom = require('jsdom').jsdom;
// var document = jsdom('<body><div id="container"></div></body>');
// var window = document.defaultView;

// Require anychart and anychart export modules
const anychart = require('anychart')(window);
const anychartExport = require('anychart-nodejs')(anychart);
// var downloadSpeedResults = [];
// var uploadSpeedResults = [];

class Chartervice {

    static async createChart(downloadSpeedResults, uploadSpeedResults, chartName) {
        try {
            // console.log('Create and set the type chart');
            var chart = anychart.area();

            // console.log('Create a line series and set the data');
            // create the first series
            var series1 = chart.area(downloadSpeedResults);
            series1.name("download speed");
            // configure the visual settings of the first series
            series1.normal().fill("#00cc99", 0.3);
            series1.hovered().fill("#00cc99", 0.1);
            series1.selected().fill("#00cc99", 0.5);
            series1.normal().stroke("#00cc99", 1, "10 5", "round");
            series1.hovered().stroke("#00cc99", 2, "10 5", "round");
            series1.selected().stroke("#00cc99", 4, "10 5", "round");

            // create the second series
            var series2 = chart.area(uploadSpeedResults);
            series2.name("upload speed");
            // configure the visual settings of the second series
            series2.normal().fill("#0066cc", 0.3);
            series2.hovered().fill("#0066cc", 0.1);
            series2.selected().fill("#0066cc", 0.5);
            // series2.normal().hatchFill("forward-diagonal", "#0066cc", 1, 15);
            // series2.hovered().hatchFill("forward-diagonal", "#0066cc", 1, 15);
            // series2.selected().hatchFill("forward-diagonal", "#0066cc", 1, 15);
            series2.normal().stroke("#0066cc");
            series2.hovered().stroke("#0066cc", 2);
            series2.selected().stroke("#0066cc", 4);

            // console.log('Set the chart title');
            chart.title("Line Chart: Grafico speedtest downlaod");

            // console.log('Set the titles of the axes');
            var xAxis = chart.xAxis();
            xAxis.title("Speedtest cron");
            var yAxis = chart.yAxis();
            yAxis.title("Speed");

            // console.log('Enable and configure labels on the series');
            series1.labels(true);
            series1.labels().fontColor("green");
            series1.labels().fontWeight(900);
            series1.labels().format("{%value}");

            series2.labels(true);
            series2.labels().fontColor("red");
            series2.labels().fontWeight(900);
            series2.labels().format("{%value}");

            // configure the font of legend items
            var legend = chart.legend();
            legend.enabled(true);
            legend.fontColor("#455a64");
            legend.fontSize(16);
            legend.fontWeight(600);

            // console.log('Set position to print chart and dimeson image');
            chart.bounds(0, 0, 6000, 1920);

            // Set the container id
            // console.log('Initiate drawing the chart');
            chart.container("container").draw();

            // generate JPG image and save it to a file
            anychartExport.exportTo(chart, 'jpg').then(function(image) {
                fs.writeFile(chartName, image, function(fsWriteError) {
                    if (fsWriteError) {
                        console.log(fsWriteError);
                    } else {
                        console.log('Chart ' + chartName + ' complete');
                    }
                });
            }, function(generationError) {
                console.log(generationError);
            });
        } catch (error) {
            console.log(error);
        }

    }

}

module.exports = Chartervice;