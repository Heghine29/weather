<?php

$flag = true;
$weeks = [];
$months = [];
$days = [];

if (($handle = fopen("files/weather_statistics.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 0, ";")) !== FALSE) {
        if ($flag) {
            $flag = false;
            continue;
        }
        $time = new DateTime($data[0]);

        $date = $time->format('j-n-Y');
        $monthNumber = $time->format('n');
        $weekNumber = intval($time->format('W'));

        $days[$date][] = $data[1];
        $months[$monthNumber][] = $data[1];
        $weeks[$weekNumber][] = $data[1];
    }
    fclose($handle);
    function average($period)
    {
        return array_sum($period) / count($period);
    }

    $avg_days = array_map('average', $days);
    $avg_weeks = array_map('average', $weeks);
    $avg_months = array_map('average', $months);

    header('Content-type: application/json');
    echo json_encode(['days' => $avg_days, 'weeks' => $avg_weeks, 'months' => $avg_months]);
}

