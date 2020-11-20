const fs = require('fs');
const serviceChart = require('./serivce/chart/chartService');

var downloadSpeedResults = [];
var uploadSpeedResults = [];

async function readDataFromFile(logFilePath) {
    try {
        return fs.readFileSync(logFilePath, 'UTF-8');
    } catch (error) {
        console.error(error);
        return new Promise(reject => {
            reject(false);
        });
    }
}

async function readData(logFilePath) {
    console.log('Read data from file ' + logFilePath);
    const data = await readDataFromFile(logFilePath);

    return new Promise((resolve, reject) => {
        if (data != false) {
            // console.log('Split the contents by new line');
            const lines = data.split(/\r?\n/);

            // console.log('Iterate lines');
            lines.forEach((line) => {
                if (line !== null && line !== '') {
                    try {
                        line = line.substring(30);
                        jsonLine = JSON.parse(line);

                        downloadSpeed = jsonLine.downloadSpeed.toString().slice(0, -1);
                        uploadSpeed = jsonLine.uploadSpeed.toString().slice(0, -1);
                        dateTime = jsonLine.dateTime;

                        dateTimeSplit = jsonLine.dateTime.split('T');
                        day = dateTimeSplit[0];
                        time = dateTimeSplit[1].split('.')[0];

                        downloadSpeedResults.push([day + ' | ' + time, downloadSpeed]);
                        uploadSpeedResults.push([day + ' | ' + time, uploadSpeed]);
                    } catch (error) {
                        console.error(error);
                    }
                }
            });

            resolve(true);
        } else {
            reject(false);
        }
    });
}

async function main() {
    const date = new Date();
    const logFilePath = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '_speedtest.log';

    const logFolder = './log';
    fs.readdir(logFolder, async(err, files) => {

        for (let file of files) {
            if (await readData('log/' + file)) {
                if (downloadSpeedResults.length > 0 && uploadSpeedResults.length > 0) {
                    file = file.slice(0, -4);
                    serviceChart.createChart(downloadSpeedResults, uploadSpeedResults, 'chart/' + file + '.jpg');
                    downloadSpeedResults = [];
                    uploadSpeedResults = [];
                } else {
                    console.log('[ERROR] no data on array...');
                }
            } else {
                console.log('[ERROR] impossibile to read data on file...');
            }
        }

        // files.forEach(async (file) => {
        //     if (await readData('log/' + file)) {
        //         if (downloadSpeedResults.length > 0 && uploadSpeedResults.length > 0) {
        //             file = file.slice(0, -4); 
        //             serviceChart.createChart(downloadSpeedResults, uploadSpeedResults, 'chart/' + file + '.jpg');
        //         } else {
        //             console.log('[ERROR] no data on array...');
        //         }
        //     } else {
        //         console.log('[ERROR] impossibile to read data on file...');
        //     }
        // });
    });
}

main();