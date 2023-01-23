$(function () {

    const chartMonths = document.getElementById('chartMonths');
    const chartWeeks = document.getElementById('chartWeeks');
    const chartDays = document.getElementById('chartDays');

    function createData(labelDates, avg, text, color) {
        return {
            labels: labelDates,
            datasets: [
                {
                    label: 'average of ' + text,
                    data: avg,
                    lineTension: 0.3,
                    borderWidth: 1,
                    pointRadius: 1,
                    borderColor: color,
                    borderDash: [1, 1],
                    backgroundColor: color,
                    pointBackgroundColor: color,
                    pointBorderColor: color,
                    pointHoverBackgroundColor: color,
                    pointHoverBorderColor: color,
                }
            ],
        }
    }

    function createChart(labelDates, avg, color, chartEl, text) {

        let data = createData(labelDates, avg, text, color);

        return new Chart(chartEl, {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Average temperature in Moscow by ' + text + ' for 2021'
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                fill: false,
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'temperature'
                        }
                    }
                }
            }
        })
    }

    $.ajax({
        method: "GET",
        url: 'average.php',
        dataType: "json"
    }).done(function (response) {

        var labelM = Object.keys(response['months']);
        var labelW = Object.keys(response['weeks']);
        var labelD = Object.keys(response['days']);
        var avgM = Object.values(response['months']);
        var avgW = Object.values(response['weeks']);
        var avgD = Object.values(response['days']);

        createChart(labelM, avgM, "#e755ba", chartMonths, 'months');
        createChart(labelW, avgW, "#1b97ea", chartWeeks, 'weeks');
        createChart(labelD, avgD, "#24f80d", chartDays, 'days');

    });
});
