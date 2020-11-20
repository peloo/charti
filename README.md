# charti
This is charti, charti is a simple (stupid?) Nodejs script that read .log files that contain information about speed test and create a chart.
This script read logs like this format: `2020-11-18 22:06:27.583 INFO  {"downloadSpeed":26.125,"uploadSpeed":46.70,"ping":{"jitter":3.503,"latency":26.734},"isp":"zzz.it","serverName":"xxx","serverLocation":"yyy","dateTime":"2020-11-18T21:06:27.000Z"}`.

## Install
The charti use two important nodejs package: `anychart` and `anychart-nodejs`.
The last package has a particular bug. To guarantee the right execution of charti is necessary to install `anychart v8.3.0`.
So for first install with `npm i anychart-nodejs` and for second install `npm i anychart@8.3.0`.

### Run
To run charti open your terminal and lounch `node index.js` command.