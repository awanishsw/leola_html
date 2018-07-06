/*Top 10 Projects Deviation From Schedule*/

var MONTHS = ['Ray Rocha', 'Rob Gerhard', 'Chris Albauh', 'Scott Carpentter', 'Tony Kail', 'Jamar Reaves', 'Wes Bell', 'Jim Piercy', 'Aleksandar', 'Sam Cruz'];
var color = Chart.helpers.color;
var horizontalBarChartData = {
    labels: ['Ray Rocha', 'Rob Gerhard', 'Chris Albauh', 'Scott Carpentter', 'Tony Kail', 'Jamar Reaves', 'Wes Bell', 'Jim Piercy', 'Aleksandar', 'Sam Cruz'],
    datasets: [{
        label: 'Count',
        backgroundColor: color(window.chartColors.blue).alpha(0.9).rgbString(),
        //borderColor: window.chartColors.red,
        borderWidth: 0,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }]

};

window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myHorizontalBar = new Chart(ctx, {
        type: 'horizontalBar',
        data: horizontalBarChartData,
        options: {
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                rectangle: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Top 10 Overdue Task Count by Super'
            }
        }
    });

};

document.getElementById('randomizeData').addEventListener('click', function() {
    var zero = Math.random() < 0.2 ? true : false;
    horizontalBarChartData.datasets.forEach(function(dataset) {
        dataset.data = dataset.data.map(function() {
            return zero ? 0.0 : randomScalingFactor();
        });

    });
    window.myHorizontalBar.update();
});

var colorNames = Object.keys(window.chartColors);

document.getElementById('addDataset').addEventListener('click', function() {
    var colorName = colorNames[horizontalBarChartData.datasets.length % colorNames.length];
    var dsColor = window.chartColors[colorName];
    var newDataset = {
        label: 'Dataset ' + horizontalBarChartData.datasets.length,
        backgroundColor: color(dsColor).alpha(0.5).rgbString(),
        borderColor: dsColor,
        data: []
    };

    for (var index = 0; index < horizontalBarChartData.labels.length; ++index) {
        newDataset.data.push(randomScalingFactor());
    }

    horizontalBarChartData.datasets.push(newDataset);
    window.myHorizontalBar.update();
});

document.getElementById('addData').addEventListener('click', function() {
    if (horizontalBarChartData.datasets.length > 0) {
        var month = MONTHS[horizontalBarChartData.labels.length % MONTHS.length];
        horizontalBarChartData.labels.push(month);

        for (var index = 0; index < horizontalBarChartData.datasets.length; ++index) {
            horizontalBarChartData.datasets[index].data.push(randomScalingFactor());
        }

        window.myHorizontalBar.update();
    }
});

document.getElementById('removeDataset').addEventListener('click', function() {
    horizontalBarChartData.datasets.splice(0, 1);
    window.myHorizontalBar.update();
});

document.getElementById('removeData').addEventListener('click', function() {
    horizontalBarChartData.labels.splice(-1, 1); // remove the label first

    horizontalBarChartData.datasets.forEach(function(dataset) {
        dataset.data.pop();
    });

    window.myHorizontalBar.update();
});

/*Top 10 Projects Deviation From Schedule*/

/*Top 10 Projects Deviation From Schedule*/


/*Top 10 Projects Deviation From Schedule*/