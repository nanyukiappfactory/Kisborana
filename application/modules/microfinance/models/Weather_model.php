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