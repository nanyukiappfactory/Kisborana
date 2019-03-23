<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}
require_once "./application/modules/admin/controllers/Admin.php";

class Loans extends Admin
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("site/site_model");
        $this->load->model("loans_model");

        // load pagination library
        $this->load->library('pagination');

        // load form (multipart) and URL helper
        $this->load->helper(array('url', 'form','html'));

        // load upload library
        $this->load->library('upload');
    }
    public function index()
    {
        
        $var = $this->session->userdata('logged_in_user');
        $login_status = $var['login_status'];
        if ($login_status == 'TRUE'){
        // Pagination

        $start_index = ($this->uri->segment(3)) ? $this->uri->segment(3) : 0;
        $total_records = $this->loans_model->get_total();
        $config = array();
        $limit_per_page = 2;

        // get current page records
        $config['base_url'] = base_url() . 'loans/index';
        $config['total_rows'] = $total_records;
        $config['per_page'] = 2;
        $config["uri_segment"] = 3;
        $config['num_links'] = 1;

        $this->pagination->initialize($config);
        $member_details = $this->loans_model->get_member_details();
        $loan_type_details = $this->loans_model->get_loan_type_details();
        $loan_stage_details =$this->loans_model->get_loan_stage_details();

        // build paging links
        $params = array('links' => $this->pagination->create_links(),
            'all_loans' => $this->loans_model->get_loan($limit_per_page, $start_index),
            'page' => $start_index,
            'member_details'=>$member_details,
            'loan_type_details'=>$loan_type_details,
            'loan_stage_details'=>$loan_stage_details);

            $var2 = $this->loans_model->get_loan($limit_per_page, $start_index);
           
        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("loans/all_loans", $params, true));
        $this->load->view("site/layouts/layout", $data);
    }else{
        redirect("admin/login_admin");
    }
    }

    public function execute_search()
    {
        // Retrieve the posted search term.
        $search_term = $this->input->post('search');

        // Use a model to retrieve the results.
        $data['results'] = $this->loans_model->get_results($search_term);

        // Pass the results to the view.

        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("loans/search_results", $data, true));
        $this->load->view("site/layouts/layout", $data);

    }

   //add loan
    public function new_loan()
    {
        //form validation
        $this->form_validation->set_rules("member_name", "Member", "required");
        $this->form_validation->set_rules("loan_type_name", "Loan Type", "required");
        $this->form_validation->set_rules("loan_stage", "Loan Stage", "required");
        $this->form_validation->set_rules("loan_amount", "Loan Amount", "numeric");
        $this->form_validation->set_rules("installment_period", "Installment Period", "numeric");
        // $this->form_validation->set_rules("loan_number", "Loan Number", "required");
        $this->form_validation->set_rules("member_salary", "Member Salary", "numeric");
        
      
        $member_details = $this->loans_model->get_member_details();
        $loan_type_details = $this->loans_model->get_loan_type_details_active();
        
       $loan_stage_details =$this->loans_model->get_loan_stage_details();

        if ($this->form_validation->run()) {
            $loan_id = $this->loans_model->add_loan();
            if ($loan_id > 0) {
                $this->session->set_flashdata("success_message", "new loan has been added");
                redirect("loans");
            } else {
                $this->session->set_flashdata("error_message", "unable to add loan");
            }
        }
        $data["form_error"] = validation_errors();
        // $this->load->view("add_loan", $data);

        $v_data = array ("add_loan" => "loans/loans_model",
                            "member_details" => $member_details,
                            "loan_type_details" => $loan_type_details,
                            "loan_stage_details"=>$loan_stage_details);
                            
       

        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("loans/add_loan", $v_data, true),

        );
        $this->load->view("site/layouts/layout", $data);

    }

    public function delete($loan_id)
    {
        $my_loan = $this->loans_model->get_delete_loan($loan_id);
        if($my_loan > 0){
            $this->session->set_flashdata("success_message", "loan deleted");
            redirect("loans");
        }
        else{
            $this->session->set_flashdata("error_message", "unable to delete");
            redirect("loans");
        }
    }

    public function deactivate($loan_id)
    {
        $my_loan = $this->loans_model->get_deactivate_loan($loan_id);
        if($my_loan > 0){
            $this->session->set_flashdata("success_message", "loan deactivated successfully");
            redirect("loans");
        }
        else{
            $this->session->set_flashdata("error_message", "unable to deactivate loan");
            redirect("loans");
        }
    }

    public function activate($loan_id)
    {
        $my_loan = $this->loans_model->get_activate_loan($loan_id);
        if($my_loan > 0){
            $this->session->set_flashdata("success_message", "loan activated successfully");
            redirect("loans");
        }
        else{
            $this->session->set_flashdata("error_message", "unable to activate loan");
            redirect("loans");
        }
    }

    public function edit($loan_id)
    {
        
    }

    public function edit_loan($loan_id)
    {
        //form validation
        $this->form_validation->set_rules("loan_name", "Loan Type Name", "required");
        $this->form_validation->set_rules("maximum_loan_amount", "Maximum loan amount", "numeric");
        $this->form_validation->set_rules("minimum_loan_amount", "Minimum loan amount", "numeric");
        $this->form_validation->set_rules("custom_loan_amount", "Custom loan amount", "numeric");
        $this->form_validation->set_rules("maximum_number_of_installments", "Maximum number of installments", "numeric");
        $this->form_validation->set_rules("minimum_number_of_installments", "Minimum number of installments", "numeric");
        $this->form_validation->set_rules("custom_number_of_installments", "Custom number of installments", "numeric");
        $this->form_validation->set_rules("maximum_number_of_guarantors", "Maximum number of guarantors", "numeric");
        $this->form_validation->set_rules("minimum_number_of_guarantors", "Minimum number of guarantors", "required|numeric");
        $this->form_validation->set_rules("custom_number_of_guarantors", "Custom number of guarantors", "numeric");
        $this->form_validation->set_rules("interest_rate", "Interest rate", "numeric|required");

        if ($this->form_validation->run()) {
            $loan_edited = $this->loans_model->get_update_loan($loan_id);
            // var_dump($loan_edited);die();
            if ($loan_edited > 0) {
                $this->session->set_flashdata("success_message", "Your loan" . $loan_id . "has been edited");
                redirect("loans");
            } else {
                $this->session->set_flashdata("error_message", "unable to edit loan");
            }
        } else {
            $this->session->set_flashdata("error_message", validation_errors());

        }
        //1. get data for the loan with the passed loan_id from the model
        $my_loan = $this->loans_model->get_single_loan($loan_id);

        if ($my_loan->num_rows() > 0) {
            $row = $my_loan->row();
            $id = $row->loan_id;
			$name = $row->loan_name;
			$max_loan = $row->maximum_loan_amount;
			$min_loan = $row->minimum_loan_amount;
			$custom_loan = $row->custom_loan_amount;
			$max_instal = $row->maximum_number_of_installments;
			$min_instal = $row->minimum_number_of_installments;
			$custom_instal = $row->custom_number_of_installments;
			$max_guar = $row->maximum_number_of_guarantors;
			$min_guar = $row->minimum_number_of_guarantors;
			$custom_guar = $row->custom_number_of_guarantors;
			$interest = $row->interest_rate;
			$check = $row->loan_status;
        }
            $data = array(
                "loan_name" => $name,               
                "maximum_loan_amount" => $max_loan,                
                "minimum_loan_amount" => $min_loan,
                "custom_loan_amount" => $custom_loan,
                "maximum_number_of_installments" => $max_instal,
                "minimum_number_of_installments" => $min_instal,
                "custom_number_of_installments" => $custom_instal,
                "maximum_number_of_guarantors" => $max_guar,
                "minimum_number_of_guarantors" => $min_guar,
                "custom_number_of_guarantors" => $custom_guar,
                "interest_rate" => $interest,
                "loan_id" => $id,
            );

            $view = array("title" => $this->site_model->display_page_title(),
                "content" => $this->load->view("edit_loan", $data, true));
            $this->load->view("site/layouts/layout", $view);

    }

     //getting single loan_type_details
     public function select_loan_type($loan_type_id)
     {

         $loan_from_view = "1";
         var_dump($loan_from_view);die();
        $selected_loan_type = $this->loans_model->get_single_loan_type_details($loan_type_id);

        if ($selected_loan_type->num_rows()>0)
        {
            $row = $selected_loan_type->row();
            $loan_type_name = $row->loan_type_name;
            $maximum_loan_amount = $row->maximum_loan_amount;
            $minimum_loan_amount = $row->minimum_loan_amount;
            $custom_loan_amount = $row->custom_loan_amount;
            $maximum_number_of_installments = $row->maximum_number_of_installments;
            $minimum_number_of_installments = $row->minimum_number_of_installments;
            $custom_number_of_installments = $row->custom_number_of_installments;
            $maximum_number_of_guarantors = $row->maximum_number_of_guarantors;
            $minimum_number_of_guarantors = $row->minimum_number_of_guarantors;
            $custom_number_of_guarantors = $row->custom_number_of_guarantors;
            $interest_rate = $row->interest_rate;


        }
     }
     
}
