<?php
if ( ! defined ('BASEPATH')) exit('No direct script access allowed');

class Auth_model extends CI_Model
{
    public function validate_user()
    {
        $where = array (
            "user_email" => $this->input->post("user_email"),
            "user_password" => md5($this->input->post("user_password"))
        );

        //run the query
        $this->db->where($where);
        $query = $this->db->get("user_table");

        if($query->num_rows()==1)
        {
            $row = $query->row();
            $user = array(
                "user_first_name" =>$row->user_first_name,
                "user_last_name" =>$row->user_last_name,
                "user_phone" =>$row->user_phone,
                "user_email" =>$row->user_email,
                "user_id" =>$row->user_id,
                "user_type_id"=>$row->user_type_id,
                "first_login_status"=>$row->first_login_status,
                "user_status" =>$row->user_status,
                "login_status" =>TRUE,
            );

            $this->session->set_userdata($user);
            $this->session->set_flashdata("success", "Welcome back " .$user["user_first_name"]);
            return TRUE;
        }
        else {
            $this->session->set_flashdata("error","Email or password is incorrect");
            return FALSE;
        }
    }
}
?>