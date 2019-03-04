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

        if($email == 'admin@admin.com' && $pass == md5(123456))
        {
            
            $this->session->set_flashdata("success", "Welcome back ");
            return TRUE;
        }
        else
        {
            $this->session->set_flashdata("error_message", "Wrong Details ");
            return FALSE;
        }



        // //run the query
        // $this->db->where($where);
        // $query = $this->db->get("user_table");

        // if($query->num_rows()==1)
        // {
        //     $row = $query->row();
        //     $user = array(
        //         "user_first_name" =>$row->user_first_name,
        //         "user_last_name" =>$row->user_last_name,
        //         "user_phone" =>$row->user_phone,
        //         "user_email" =>$row->user_email,
        //         "user_id" =>$row->user_id,
        //         "user_type_id"=>$row->user_type_id,
        //         "first_login_status"=>$row->first_login_status,
        //         "user_status" =>$row->user_status,
        //         "login_status" =>TRUE,
        //     );

    }
    public function validate_login_session(){
        // $var = $this->session->userdata('logged_in_user');
        // $login_status = $var['login_status'];
        // if ($login_status == 'TRUE'){
        //     return TRUE;
        // }
        // else{
        //     return FALSE;
        // }
        if($this->session->userdata('logged_in_user')){
            return TRUE;
        }
        else{
            return FALSE;
        }
    }
}
?>