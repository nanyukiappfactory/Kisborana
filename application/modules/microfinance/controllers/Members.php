<?php
if (!defined('BASEPATH')) {exit('No direct script access allowed');}
require_once "./application/modules/admin/controllers/Admin.php";
class Members extends Admin
{
    public function __construct()
    {
        parent::__construct();
        // Allow from any origin
        if (isset($_SERVER['HTTP_ORIGIN'])) 
        {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400'); // cache for 1 day
        }
        // Access-Control headers are received during OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') 
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
        $this->load->model(array("member_model","site_model"));
       // load required libraries
       $this->load->library(array('pagination', 'upload'));
       // load required helpers
       $this->load->helper(array('url', 'form', 'html', 'download'));
        
    }
    // A function that displays all members
    public function index($order_column = 'member_first_name', $order_method = 'ASC')
    {
        // Listing and Search Parameters
        $table = 'member';
        $where = 'deleted = 0';
        $search_parameters = array('member_first_name','member_national_id','member_last_name','member_payroll_number');
        $search_results = $this->session->userdata("search_session");
        if(!empty($search_results) && $search_results != null) 
        {
            $where = $search_results;
        }
        // Pagination
        $total_members = $this->site_model->get_count_results($table);
        $limit_per_page = 20;
        $segment = 5;

        $config['base_url'] = site_url().'members/all-members/'.$order_column.'/'.$order_method;
        $config['total_rows'] = $total_members;
        $config['uri_segment'] = $segment;
        $config['per_page'] = $limit_per_page;
        $config['num_links'] = 3;

        $config['full_tag_open'] = '<div class="pagging text-center"><nav aria-label="Page navigation example"><ul class="pagination">';
        $config['full_tag_close'] = '</ul></nav></div>';
        $config['num_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['num_tag_close'] = '</span></li>';
        $config['cur_tag_open'] = '<li class="page-item active"><span class="page-link">';
        $config['cur_tag_close'] = '<span class="sr-only">(current)</span></span></li>';
        $config['next_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['next_tag_close'] = '<span aria-hidden="true">&raquo;</span></span></li>';
        $config['prev_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['prev_tag_close'] = '</span></li>';
        $config['first_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['first_tag_close'] = '</span></li>';
        $config['last_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['last_tag_close'] = '</span></li>';
 
        $this->pagination->initialize($config);
        $start_index = ($this->uri->segment($segment)) ? $this->uri->segment($segment) : 0;
        // build paging links
        $links = $this->pagination->create_links();
        $query = $this->site_model->get_all_results($search_results, $table, $limit_per_page, $start_index, $where, $order_column, $order_method, $search_parameters);
        $row = $query->num_rows();
        if($row > 0)
        {            
            if($order_method == 'DESC')
            {          
                $order_method = 'ASC';
            }
            else
            {
                $order_method = 'DESC';
            }
            // $this->session->set_flashdata("success_message", "$row Members retrived");
        }
        else
        {
            $this->session->set_flashdata("error_message", "0 Members retrieved");

        }
        $params = array('links' => $links,
            'all_members' => $query,
            'page' => $start_index,
            'order_method' => $order_method,
            'order_column' => $order_column,
        );        
        $data = array(
            "title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/members/all_members", $params, true)
        );
        $this->load->view("site/layouts/layout", $data);
    }
    // adding a new member
    public function add_member()
    {
        // form validation
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
        $this->form_validation->set_rules("member_payroll_number", "Member Payroll number", "required");
        $this->form_validation->set_rules("location", "Location", "required");

        $bank_details = $this->member_model->get_bank_details();
        $employer_details = $this->member_model->get_employer_details();
        if($this->form_validation->run()) 
        {
            $saved_members = $this->member_model->add_member();
            if($saved_members) 
            {
                $this->session->set_flashdata("success", "Successfully saved");

            } 
            else 
            {
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
        $this->load->view("site/layouts/layout", $data);
    }    
    //A function that edits member deatails
    public function edit_member($member_id)
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

        if($this->form_validation->run()) 
        {
            $members_edited = $this->member_model->edit_member($member_id);
            if($members_edited > 0)
            {
                $this->session->set_flashdata("success_message", "Your member has been edited");
                redirect("members/all-members");
            } 
            else 
            {
                $this->session->set_flashdata("error_message", "unable to member");
                redirect("members/all-members");
            }
        } 
        else 
        {
            $this->session->set_flashdata("error_message", validation_errors());
        }
        //1. get data for the member with the passed member_id from the model
        $single_member_data = $this->member_model->get_single_member($member_id);
        $bank_details = $this->member_model->get_bank_details();
        $employer_details = $this->member_model->get_employer_details();    
        if($single_member_data->num_rows() > 0) 
        {
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
            "phone_number" => $phone_number,
            "bank_account_number" => $account_number,
            "bank_details" => $bank_details,
            "employer_details" => $employer_details,
        );
        $data = array(
            "title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/members/edit_member", $v_data, true),
        );
        $this->load->view("site/layouts/layout", $data);
    }
    // activating a member
    public function activate_member($member_id)
    {
        $activated_member =$this->member_model->activate_member($member_id);
        if($activated_member > 0) 
        {
            $this->session->set_flashdata("success", "Successfully activated");
        } else {
            $this->session->set_flashdata("error", "Cannot be activated");
        }
        redirect('microfinance/members');
    }
    // deactivating a member
    public function deactivate_member($member_id)
    {
        $deactivated_member = $this->member_model->deactivate_member($member_id);
        if($deactivated_member > 0) 
        {
            $this->session->set_flashdata("success", "Successfully deactivated");
        } else {
            $this->session->set_flashdata("error", "Cannot deactivate");
        }
        redirect('microfinance/members');
    }
    // A function that deletes a member
    public function delete_member($member_id)
    {
        $deleted_member = $this->member_model->delete_member($member_id);
        if($deleted_member > 0) 
        {
            $this->session->set_flashdata("success", "Successfully deleted");
        } else {
            $this->session->set_flashdata("error", "Cannot be deleted");
        }
        redirect('microfinance/members');
    }
    // searching a member
    public function search_member()
    {
        $search_results = $this->input->post("search");
        $this->form_validation->set_rules("search", "Search", "required");        
        if($this->form_validation->run()) 
        {
            $search_session = $this->session->set_userdata("search_session", $search_results);
        } 
        else 
        {
            $this->session->unset_userdata("search_session");
        }
        redirect("microfinance/members");
    }
    // closing search session
    public function close_search_member_session()
    {
        $this->session->unset_userdata("search_session");
        redirect("microfinance/members"); 
    }
    // loading bulk view
    public function bulk_upload_view()
    {
        $v_data["add_member"] = "member/member_model";
        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/members/bulk_registration", $v_data, true),

        );
        $this->load->view("site/layouts/layout", $data);
    }
    // uploading csv file
    public function upload_csv()
    {
        $this->member_model->db_upload_cv();
    }
    // downloading csv template
    public function download_csv()
    {
        force_download("./assets/downloads/member.csv", null);
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
