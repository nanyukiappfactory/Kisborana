<?php
if (!defined('BASEPATH')) {exit('No direct script access allowed');}
class Kaizala_urls extends MX_Controller
{
    public function __construct()
    {
        parent::__construct();
        // Allow from any origin
        if(isset($_SERVER['HTTP_ORIGIN'])) 
        {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400'); // cache for 1 day
        }
        // Access-Control headers are received during OPTIONS requests
        if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') 
        {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) 
            {
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
            }
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) 
            {
                header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            }
            exit(0);
        }
        //load required model
        $this->load->model("member_model");        
    }
    
    //kaizala end points
    public function check_member_existence($nationalid,$payroll_number)
    {       
        $all_members = $this->member_model->check_member_existence($nationalid,$payroll_number);
        if($all_members->num_rows() > 0)
        {
            $members = $all_members->result();                
            $members_encoded = json_encode($members);
            echo $members_encoded;         
        } 
        else 
        {
            $error = 'No members found';
            $message = json_encode($error);
            echo $message;
        }

    }
    //updating member password 
    public function save_member_password($nationalid, $password, $member_phone_number)
    {
        $update_password = $this->member_model->save_member_password($nationalid, $password, $member_phone_number);
        if($update_password == true) 
        {
            echo (json_encode("Password and phone number saved successfully"));
        } 
        else 
        {
            echo (json_encode("Error: Password not saved"));
        }
    }
    // 
    // downloading csv template
    public function retrieve_phone($phone_number)
    {
        $retrieved =$this->member_model->retrieve_phone($phone_number);
        if ($retrieved->num_rows() > 0) {
            echo (json_encode("Phone exists"));
        } else {
            echo (json_encode("Phone doesnt exist"));
        }
    }
}
