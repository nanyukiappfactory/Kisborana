<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Members extends MX_Controller
{
    public function __construct()
    {
        parent::__construct();

        // Allow from any origin
		if (isset($_SERVER['HTTP_ORIGIN'])) {
			header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
			header('Access-Control-Allow-Credentials: true');
			header('Access-Control-Max-Age: 86400');    // cache for 1 day
		}
	
		// Access-Control headers are received during OPTIONS requests
		if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	
			if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
				header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
	
			if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
				header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	
			exit(0);
        }

        //load required model
        $this->load->model("auth/auth_model");
        $this->load->model("site/site_model");
        $this->load->model("member_model");

        // load upload library
        $this->load->helper('download');
    }

    // A function that displays all members
    public function index()
    {
        $employer_details = $this->member_model->get_employer_details();
        $v_data = array ("all_members"=>$this->member_model->get_members(),
                            "employer_details"=>$employer_details);

        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/members/all_members", $v_data, true),

        );
        $this->load->view("site/layouts/layout", $data);
    }

    // A function that adds a new member
    public function new_member()
    {

        $this->form_validation->set_rules("member_national_id", "National id", "required");
        $this->form_validation->set_rules("firstname", "First Name", "required");
        $this->form_validation->set_rules("lastname", "Last Name", "required");
        $this->form_validation->set_rules("bank_name", "Select Bank", "required");
        $this->form_validation->set_rules("employer_name", "Select Employer", "required");
        $this->form_validation->set_rules("email", "Email", "required");
        $this->form_validation->set_rules("phone_number", "Phone number", "required");
        $this->form_validation->set_rules("account_number", "Account number", "required");
        $this->form_validation->set_rules("postal_address", "Postal address", "required");
        $this->form_validation->set_rules("postal_code", "Postal code", "required");
        // $this->form_validation->set_rules("member_number", "Member number", "required");
        $this->form_validation->set_rules("member_payroll_number", "Member Payroll number", "required");
        $this->form_validation->set_rules("location", "Location", "required");

        $bank_details = $this->member_model->get_bank_details();
        $employer_details = $this->member_model->get_employer_details();
        if ($this->form_validation->run()) {
            $saved_members = $this->member_model->save_members();
            if ($saved_members) {
                //    echo "save member";
                $this->session->set_flashdata("success", "Successfully saved");

            } else {
                $this->session->set_flashdata("error", "Error when saving");
            }
            redirect("microfinance/members");
        }
        $v_data = array(
            "add_member" => "member/Member_model",
            "bank_details" => $bank_details,
            "employer_details" => $employer_details,
        );
        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/members/add_member", $v_data, true),
        );
        //var_dump($data);die();
        $this->load->view("site/layouts/layout", $data);
    }

    // A function that activates a member
    public function activate($member_id)
    {
        if ($this->member_model->activate($member_id)) {
            $this->session->set_flashdata("success", "Successfully activated");
        } else {
            $this->session->set_flashdata("error", "Cannot be activated");
        }
        redirect('microfinance/members');
    }

    // A function that deactivates a member
    public function deactivate($member_id)
    {
        if ($this->member_model->deactivate($member_id)) {
            $this->session->set_flashdata("success", "Successfully deactivated");
        } else {
            $this->session->set_flashdata("error", "Cannot be deactivated");
        }
        redirect('microfinance/members');
    }

    // A function that deletes a member
    public function delete_member($member_id)
    {
        if ($this->member_model->delete($member_id)) {
            $this->session->set_flashdata("success", "Successfully deleted");
        } else {
            $this->session->set_flashdata("error", "Cannot be deleted");
        }
        redirect('microfinance/members');
    }

    //A function that edits member deatails
    public function display_edit_form($member_id)
    {

        $this->form_validation->set_rules("member_national_id", "National id", "required");
        $this->form_validation->set_rules("firstname", "First Name", "required");
        $this->form_validation->set_rules("lastname", "Last Name", "required");
        $this->form_validation->set_rules("bank_name", "Select Bank", "required");
        $this->form_validation->set_rules("employer_name", "Select Employer", "required");
        $this->form_validation->set_rules("email", "Email", "required");
        $this->form_validation->set_rules("phone_number", "Phone number", "required");
        $this->form_validation->set_rules("account_number", "Account number", "required");
        $this->form_validation->set_rules("postal_address", "Postal address", "required");
        $this->form_validation->set_rules("postal_code", "Postal code", "required");
        $this->form_validation->set_rules("member_number", "Member number", "required");
        $this->form_validation->set_rules("member_payroll_number", "Member Payroll number", "required");
        $this->form_validation->set_rules("location", "Location", "required");

        //if the edit form is submitted do this
        if ($this->form_validation->run()) {
            $member_id = $this->member_model->update_member($member_id);
            redirect("microfinance/members");
        } else {
            $validation_errors = validation_errors();
            if (!empty($validation_errors)) {
                $this->session->set_flashdata("error", $validation_errors);
            }
        }

        //1. get data for the member with the passed member_id from the model

        $single_member_data = $this->member_model->get_single_member($member_id);
        if ($single_member_data->num_rows() > 0) {
            $row = $single_member_data->row();
            $member_id = $row->member_id;
            $first_name = $row->member_first_name;
            $last_name = $row->member_last_name;
            $national_id = $row->member_national_id;
            $email = $row->member_email;
            $location = $row->member_location;
            $postal_address = $row->member_postal_address;
            $postal_code = $row->member_postal_code;
            $member_number = $row->member_number;
            $member_payroll_number = $row->member_payroll_number;
            $employer_id = $row->employer_id;
            $employer_name = $row->employer_name;
            $bank_id = $row->bank_id;
            $bank_name = $row->bank_name;
            $phone_number = $row->member_phone_number;
            $account_number = $row->member_account_number;
        }
        $v_data = array(
            "member_id " => $member_id,
            "first_name" => $first_name,
            "last_name" => $last_name,
            "national_id" => $national_id,
            "email" => $email,
            "location" => $location,
            "postal_address" => $postal_address,
            "postal_code" => $postal_code,
            "member_number" => $member_number,
            "member_payroll_number" => $member_payroll_number,
            "employer_id" => $employer_id,
            "employer_name" => $employer_name,
            "phone_number" => $phone_number,
            "bank_account_number" => $account_number,
            "bank_id" => $bank_id,
            "bank_name" => $bank_name,

        );
        // var_dump($v_data);die();
        //2. Load view with the data from step 1
        $data = array(
            "title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/members/edit_member", $v_data, true),
        );

        $this->load->view("site/layouts/layout", $data);
    }
    public function bulk_registration()
    {
        $v_data["add_member"] = "member/member_model";
        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/members/bulk_registration", $v_data, true),

        );
        $this->load->view("site/layouts/layout", $data);
    }

    public function upload_csv()
    {
        $this->member_model->db_upload_cv();
    }

    public function download_csv(){
        force_download("./assets/downloads/member.csv", NULL);
    }

    public function execute_search()
    {
        // Retrieve the posted search term.
        $search_term = $this->input->post('search');

        // Use a model to retrieve the results.
        $data['results'] = $this->member_model->get_results($search_term);

        // Pass the results to the view.

        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/members/search_results", $data, true));
        $this->load->view("site/layouts/layout", $data);

    }

//get members to create web serrvice
public function check_member_existence($phone)
    {
       
        $all_members = $this->member_model->check_member_existence($phone);

        if($all_members->num_rows() > 0)
        {
            $members = $all_members->result();
            $members_encoded = json_encode($members);
            echo $members_encoded;
        }

        else{
    
            echo (json_encode("No members found"));
        }
    } 
}
