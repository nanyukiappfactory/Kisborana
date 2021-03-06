<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Member_model extends CI_Model
{
    public function add_member()
    {
        $phone_number = $this->input->post("phone_number");
        $member_password = $this->input->post("member_password");
        $newstring = substr($phone_number, -9);
        $length = strlen($newstring);
        if($newstring[0] == 7 && $length == 9) 
        {
            $data = array(
                "bank_id" => $this->input->post("bank_name"),
                "member_national_id" => $this->input->post("member_national_id"),
                "member_first_name" => $this->input->post("firstname"),
                "member_other_names" => $this->input->post("othernames"),
                "member_last_name" => $this->input->post("lastname"),
                "employer_id" => $this->input->post("employer_name"),
                "member_phone_number" => $newstring,
                "member_account_number" => $this->input->post("account_number"),
                "member_email" => $this->input->post("email"),
                "member_postal_address" => $this->input->post("postal_address"),
                "member_postal_code" => $this->input->post("postal_code"),
                "member_location" => $this->input->post("location"),
                "member_number" => "MN",
                "member_payroll_number" => $this->input->post("member_payroll_number"),
                "member_password" => $member_password,
                "created_by" => 1,
                "created_on" => date('Y-m-d H:i:s'),
            );
            if($this->db->insert("member", $data)) 
            {
                $member_id = $this->db->insert_id();
                $member_number = "MN00" . $member_id;
                $member_number_data = array(
                    "member_number" => $member_number,
                );
                $this->db->set($member_number_data);
                $this->db->where("member_id", $member_id);
                $this->db->update("member");
                return $member_id;
            } 
            else 
            {
                return false;
            }

        } 
        else 
        {
            return false;
        }

    }
    public function get_bank_details()
    {
        $query = $this->db->get('bank');
        return $query;
    }
    public function get_employer_details()
    {
        $query = $this->db->get('employer');
        return $query;
    }
    public function edit_member($member_id)
    {
        $data = array(
            "bank_id" => $this->input->post("bank_name"),
            "member_national_id" => $this->input->post("member_national_id"),
            "member_first_name" => $this->input->post("firstname"),
            "member_last_name" => $this->input->post("lastname"),
            "member_other_names" => $this->input->post("othernames"),
            "employer_id" => $this->input->post("employer_name"),
            "member_phone_number" => $this->input->post("phone_number"),
            "member_account_number" => $this->input->post("account_number"),
            "member_email" => $this->input->post("email"),
            "member_postal_address" => $this->input->post("postal_address"),
            "member_postal_code" => $this->input->post("postal_code"),
            "member_location" => $this->input->post("location"),
            "member_number" => $this->input->post("member_number"),
            "member_payroll_number" => $this->input->post("member_payroll_number"),
            "modified_by" => 1,
            "modified_on" => date('Y-m-d H:i:s'),
        );
        $this->db->where("member_id", $member_id);
        $this->db->set($data);
        $this->db->update("member");
        return $this->db->get("member");
    }
    public function activate_member($member_id)
    {
        $this->db->where("member_id", $member_id);
        $this->db->set("member_status", 1);
        $this->db->update("member");
        return $this->db->get("member");

    }
    public function deactivate_member($member_id)
    {
        $this->db->where("member_id", $member_id);
        $this->db->set("member_status", 0);
        $this->db->update("member");
        return $this->db->get("member");

    }
    public function delete_member($member_id)
    {
        $this->db->where("member_id", $member_id);
        $data = array(
            "deleted" => 1,
            "deleted_by" => 1,
            "deleted_on" => date('Y-m-d H:i:s'),
        );
        $this->db->set($data);
        $this->db->update("member");
        return $this->db->get("member");
    }
    
    public function get_single_member($member_id)
    {
        $this->db->select('*');
        $this->db->from('member');
        $this->db->where('member_id', $member_id);
        $query = $this->db->get();
        return $query;
    }
    public function db_upload_cv()
    {
        $file_csv = $this->input->post('userfile');
        $config['upload_path'] = './assets/uploads/';
        $config['allowed_types'] = 'csv|CSV';
        $config['file_name'] = $_FILES["userfile"]['name'];
        $this->load->library('upload', $config);
        $parse = $this->upload->initialize($config);
        $this->upload->do_upload('userfile');
        $data = $this->upload->data();
        $count = 0;
        $fp = fopen($_FILES['userfile']['tmp_name'], 'r') or die("can't open file");
        while($csv_line = fgetcsv($fp, 1024)) 
        {
            $count++;
            if($count == 1) 
            {
                continue;
            } //keep this if condition if you want to remove the first row
            for($i = 0, $j = count($csv_line); $i < $j; $i++) 
            {
                $insert_csv = array();
                $insert_csv['member national id'] = $csv_line[0];
                $insert_csv['member last name'] = $csv_line[1];
                $insert_csv['member first name'] = $csv_line[2];
                $insert_csv['member other names'] = $csv_line[3];
                $insert_csv['employer id'] = $csv_line[4];
                $insert_csv['member email'] = $csv_line[5];
                $insert_csv['member phone number'] = $csv_line[6];
                $insert_csv['member account number'] = $csv_line[7];
                $insert_csv['member postal address'] = $csv_line[8];
                $insert_csv['member postal code'] = $csv_line[9];
                $insert_csv['member location'] = $csv_line[10];
                $insert_csv['member number'] = $csv_line[11];
                $insert_csv['member payroll number'] = $csv_line[12];
                $insert_csv['member share balance'] = $csv_line[13];
                $insert_csv['advance loan'] = $csv_line[14];
                $insert_csv['development loan'] = $csv_line[15];
                $insert_csv['emergency loan'] = $csv_line[16];
                $insert_csv['school loan'] = $csv_line[17];
            }
            $i++;
            $data = array(
                'member_national_id' => $insert_csv['member national id'],
                'member_last_name' => $insert_csv['member last name'],
                'member_first_name' => $insert_csv['member first name'],
                'member_other_names' => $insert_csv['member other names'],
                'employer_id' => $insert_csv['employer id'],
                'member_email' => $insert_csv['member email'],
                'member_phone_number' => $insert_csv['member phone number'],
                'member_account_number' => $insert_csv['member account number'],
                'member_postal_address' => $insert_csv['member postal address'],
                'member_postal_code' => $insert_csv['member postal code'],
                'member_location' => $insert_csv['member location'],
                'member_number' => $insert_csv['member number'],
                'member_payroll_number' => $insert_csv['member payroll number'],
                'member_share_balance' => $insert_csv['member share balance'],
                'advance_loan' => $insert_csv['advance loan'],
                'development_loan' => $insert_csv['development loan'],
                'emergency_loan' => $insert_csv['emergency loan'],
                'school_loan' => $insert_csv['school loan'],
            );
            $data['member'] = $this->db->insert('member', $data);
        }
        fclose($fp) or die("can't close file");
        $this->session->set_flashdata("success_message", "CSV template uploaded successfully");
        redirect("microfinance/members");
        $data['success'] = "success";
        return $data;
    }
    public function check_member_existence($nationalid, $payroll_number)
    {
        $data = array(
            'member_national_id' => $nationalid,
            'member_payroll_number' => $payroll_number,
        );
        $this->db->select('member_first_name,member_last_name,advance_loan,development_loan,emergency_loan,school_loan,member_share_balance,member_phone_number,member_password,member_payroll_number');
        $this->db->where($data);
        $member_details = $this->db->get("member");
        return $member_details;
    }
    public function save_member_password($nationalid, $password, $phone_number)
    {
        $data = array(
            'member_password' => md5($password),
            'member_phone_number' => $phone_number,
        );
        $this->db->where('member_national_id', $nationalid);
        if($this->db->update("member", $data)) 
        {
            return true;
        } 
        else 
        {
            return false;
        }
    }
    public function retrieve_phone($phone_number)
    {
        $data = array(
            'member_phone_number' => $phone_number,
        );
        $this->db->select('member_phone_number');
        $this->db->where($data);
        $member_details = $this->db->get("member");
        return $member_details;
    }
    public function get_total_members()
    {
        return $this->db->count_all('member');
    }
}
