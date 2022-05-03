//Dynamic Chart
$(function() {
    if ($('#dynamic-chart')[0]) {
        var data = [],
            totalPoints = 300;
        function getRandomData() {
            let high = 24;
            let low = 24;
            if (data.length > 0)
                data = data.slice(1);

            while (data.length < totalPoints) {
                var prev = data.length > 0 ? data[data.length - 1] : 50,
                    y = Math.floor(Math.random()*(high-low+1) +low)
                if (y < 0) {
                    y = 0;
                } else if (y > 90) {
                    y = 90;
                }

                data.push(y);
            }

            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }

            return res;
        }


        var updateInterval = 300;
        var plot = $.plot("#dynamic-chart", [ getRandomData() ], {
            series: {
                label: "Data",
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: 0.25,
                    fillColor: {
                        colors: [{
                            opacity: 0.1
                        }, {
                            opacity: 1
                        }]
                    }
                },

                color: 'rgba(173,255,47,0.4)',
                shadowSize: 1,
            },
            yaxis: {
                min: 0,
                max: 100,
                tickColor: 'rgba(255,255,255,0.15)',
                font :{
                    lineHeight: 13,
                    style: "normal",
                    color: "rgba(255,255,255,0.8)",
                },
                shadowSize: 0,

            },
            xaxis: {
                tickColor: 'rgba(255,255,255,0.15)',
                show: true,
                font :{
                    lineHeight: 13,
                    style: "normal",
                    color: "rgba(255,255,255,0.8)",
                },
                shadowSize: 0,
                min: 0,
                max: 250
            },
            grid: {
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.25)',
                labelMargin:10,
                hoverable: true,
                clickable: true,
                mouseActiveRadius:6,
            },
            legend: {
                show: false
            }
        });

        function update() {
            plot.setData([getRandomData()]);
            // Since the axes don't change, we don't need to call plot.setupGrid()

            plot.draw();
            setTimeout(update, updateInterval);
        }

        update();

        $("#dynamic-chart").bind("plothover", function (event, pos, item) {
            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);
                $("#dynamic-chart-tooltip").html(item.series.label + " of " + x + " = " + y).css({top: item.pageY+5, left: item.pageX+5}).fadeIn(200);
            }
            else {
                $("#dynamic-chart-tooltip").hide();
            }
        });

        $("<div id='dynamic-chart-tooltip' class='chart-tooltip'></div>").appendTo("body");
    }
});


//Line Chart
$(function () {
    var data = [];

    data.push({

        "label": "昨天",

        //温度
        "data": [[1, 23], [3, 25], [5, 24], [7, 22], [9, 25], [11, 24], [13, 24],[15, 26],[17, 25],[19, 24],[21, 25],[23, 24]]
        //湿度
        // "data": [[1, 23], [3, 25], [5, 24], [7, 22], [9, 25], [11, 24], [13, 24],[15, 26],[17, 25],[19, 24],[21, 25],[23, 24]]

    },{

        "label": "今天",
        //温度
        "data": [[1, 24], [3, 25], [5, 23], [7, 21], [9, 25], [11, 25], [13, 24],[15, 26],[17, 22.5],[19, 23],[21, 21],[23, 22]]

    });
    if ($('#line-chart')[0]) {

        $.plot('#line-chart', data,

            {
                series: {
                    lines: {
                        show: true,
                        lineWidth: 1,
                        fill: 0.25,
                    },

                    //color: 'rgba(255,255,255,0.7)',
                    shadowSize: 0,
                    points: {
                        show: true,
                    }
                },

                yaxis: {
                    min: 0,
                    //温度
                    max: 40,
                    tickColor: 'rgba(255,255,255,0.15)',
                    tickDecimals: 0,
                    font :{
                        lineHeight: 13,
                        style: "normal",
                        color: "rgba(255,255,255,0.8)",
                    },
                    shadowSize: 0,
                },
                xaxis: {
                    tickColor: 'rgba(255,255,255,0)',
                    tickDecimals: 0,
                    ticks: [[1, "1"], [3, "3"], [5, "5"], [7, "7"], [9, "9"], [11, "11"],[13,"13"],[15,"15"],[17,"17"],[19,"19"],[21,"21"],[23,"23"]],
                    font :{
                        lineHeight: 13,
                        style: "normal",
                        color: "rgba(255,255,255,0.8)",
                    }
                },
                grid: {
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.25)',
                    labelMargin:10,
                    hoverable: true,
                    clickable: true,
                    mouseActiveRadius:6,
                },
                legend: {
                    show: true,
                    position:"ne",
                    backgroundColor:'rgba(255,255,255,1)',
                    noColumns:2
                }
            });

        $("#line-chart").bind("plothover", function (event, pos, item) {
            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);
                // $("#linechart-tooltip").html(item.series.label + " of " + x + " = " + y).css({top: item.pageY+5, left: item.pageX+5}).fadeIn(200);
            }
            else {
                $("#linechart-tooltip").hide();
            }
        });

        // $("<div id='linechart-tooltip' class='chart-tooltip'></div>").appendTo("body");
    }
});

