<?php
 
Class Site extends MX_Controller {

    function __construct()
    {
        parent:: __construct();
        $this->load->model("saving_type/saving_type_model");
        $this->load->model("member/member_model");
    }

 
?>

