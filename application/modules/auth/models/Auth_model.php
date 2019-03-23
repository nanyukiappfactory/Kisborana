<?php
if ( ! defined ('BASEPATH')) exit('No direct script access allowed');

class Auth_model extends CI_Model
{
    public function validate_user()
    {
        $email = $this->input->post("user_email");
        $pass  = md5($this->input->post("user_password"));
        $where = array (
            "user_email" => $email,
            "user_password" => $pass,
            "login_status" => TRUE
        );

        $this->session->set_userdata('logged_in_user',$where);

        if($email == 'admin' && $pass == md5(123456))
        {
            
            $this->session->set_flashdata("success_message", "Welcome back ");
            return TRUE;
        }
        else
        {
            $this->session->set_flashdata("error_message", "Wrong Details ");
            return FALSE;
        } 

    }
   //function that validates if a user is logged in or not. When called, if a user is not logged in they are redirected to the login page
    public function validate_login_session(){
       
        if($this->session->userdata('logged_in_user')){
            return TRUE;
        }
        else{
            return FALSE;
        }
    }
}
?>