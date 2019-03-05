<?php
if ( ! defined ('BASEPATH')) exit('No direct script access allowed');

class Admin extends MX_Controller

{
    public function __construct()
    {
        parent:: __construct();

        //load required model
        $this->load->model("auth/auth_model");
        $this->load->model("site/site_model");

        if(!$this->auth_model->validate_login_session()){
            redirect("auth/login_admin");
        }
        
    }

    //a function tht displays a default when logged in 
    public function index()
    {
        redirect("loan-types");
    }

}

 ?>