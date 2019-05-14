<?php

class Weather_model extends CI_Model
{
    public function save_weather_details($city_name,$main_weather,$temparature,$humidity)
    {
        $data = array(
            'city_name' => $city_name,
            'main_forecast' => $main_weather,
            'temparature' => $temparature,
            'humidity' => $humidity,
        );
        if($this->db->insert("weather_detail", $data)) 
        {
            return true;
        } 
        else 
        {
            return false;
        }
    }
    public function save_city_forecast()
    {
        $str = file_get_contents('php://input');
        // echo $str;return;
        $obj = json_decode($str, true);
        $city_name = $obj['town'];
        $main_forecast = $obj['mainweather'];
        $humidity = $obj['humidity'];
        $temparature = $obj['temparature'];
        $time = $obj['time'];
        
        $time = urldecode($time);
        $time = date("Y-m-d H:i:s",strtotime($time));
        $data = array(
            'city_name' => $city_name,
            'main_forecast' => $main_forecast,
            'temparature' => $temparature,
            'humidity' => $humidity,
            'forecast_time' => $time,
        ); 
        if($this->db->insert("city_forecast", $data)) 
        {
            return true;
        } 
        else 
        {
            return false;
        }
    }
    public function get_weather_details($city_name)
    {
        $data = array(
            'city_name' => $city_name,
        );
        $this->db->select('*');
        $this->db->where($data);
        $weather_details = $this->db->get("weather_detail");
        return $weather_details;
    }
}