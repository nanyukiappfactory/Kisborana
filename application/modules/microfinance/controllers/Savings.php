<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}
require_once "./application/modules/admin/controllers/Admin.php";

class Savings extends Admin
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("site/site_model");
        $this->load->model("savings_model");

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
        $total_records = $this->savings_model->get_total();
        $config = array();
        $limit_per_page = 10;

        // get current page records
        $config['base_url'] = base_url() . 'savings/index';
        $config['total_rows'] = $total_records;
        $config['per_page'] = 10;
        $config["uri_segment"] = 3;
        $config['num_links'] = 1;

        $this->pagination->initialize($config);
        $member_details = $this->savings_model->get_member_details();
        $saving_type_details = $this->savings_model->get_saving_type_details();
        

        // build paging links
        $params = array('links' => $this->pagination->create_links(),
            'all_savings' => $this->savings_model->get_saving($limit_per_page, $start_index),
            'page' => $start_index,
            'member_details'=>$member_details,
            'saving_type_details'=>$saving_type_details,
            );

            $var2 = $this->savings_model->get_saving($limit_per_page, $start_index);
           
        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("savings/all_savings", $params, true));
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
        $data['results'] = $this->savings_model->get_results($search_term);

        // Pass the results to the view.

        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("savings/search_results", $data, true));
        $this->load->view("site/layouts/layout", $data);

    }

   //add saving
    public function new_saving()
    {
        //form validation
        $this->form_validation->set_rules("member_name", "Member", "required");
        $this->form_validation->set_rules("saving_type_name", "saving Type", "required");
        $this->form_validation->set_rules("saving_amount", "Shares Amount", "numeric");
        
        
      
        $member_details = $this->savings_model->get_member_details();
        $saving_type_details = $this->savings_model->get_saving_type_details_active();

        if ($this->form_validation->run()) {
            $saving_id = $this->savings_model->add_saving();
            if ($saving_id > 0) {
                $this->session->set_flashdata("success_message", "new saving has been added");
                redirect("saving/all-savings");
            } else {
                $this->session->set_flashdata("error_message", "unable to add saving");
            }
            
        }
        $data["form_error"] = validation_errors();
        // $this->load->view("add_saving", $data);

        $v_data = array ("add_saving" => "savings/savings_model",
                            "member_details" => $member_details,
                            "saving_type_details" => $saving_type_details,
                            );
                            
       

        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("savings/add_saving", $v_data, true),

        );
        $this->load->view("site/layouts/layout", $data);

    }

    public function delete($saving_id)
    {
        $my_saving = $this->savings_model->get_delete_saving($saving_id);
        if($my_saving > 0){
            $this->session->set_flashdata("success_message", "saving deleted");
            redirect("savings");
        }
        else{
            $this->session->set_flashdata("error_message", "unable to delete");
            redirect("savings");
        }
    }

    public function deactivate($saving_id)
    {
        $my_saving = $this->savings_model->get_deactivate_saving($saving_id);
        if($my_saving > 0){
            $this->session->set_flashdata("success_message", "saving deactivated successfully");
            redirect("saving/all-savings");
        }
        else{
            $this->session->set_flashdata("error_message", "unable to deactivate saving");
            redirect("saving/all-savings");
        }
    }

    public function activate($saving_id)
    {
        $my_saving = $this->savings_model->get_activate_saving($saving_id);
        if($my_saving > 0){
            $this->session->set_flashdata("success_message", "saving activated successfully");
            redirect("saving/all-savings");
        }
        else{
            $this->session->set_flashdata("error_message", "unable to activate saving");
            redirect("saving/all-savings");
        }
    }


    public function edit_saving($saving_id)
    {
        //form validation
        $this->form_validation->set_rules("saving_name", "saving Type Name", "required");
        $this->form_validation->set_rules("maximum_saving_amount", "Maximum saving amount", "numeric");
        $this->form_validation->set_rules("minimum_saving_amount", "Minimum saving amount", "numeric");
        $this->form_validation->set_rules("custom_saving_amount", "Custom saving amount", "numeric");
        $this->form_validation->set_rules("maximum_number_of_installments", "Maximum number of installments", "numeric");
        $this->form_validation->set_rules("minimum_number_of_installments", "Minimum number of installments", "numeric");
        $this->form_validation->set_rules("custom_number_of_installments", "Custom number of installments", "numeric");
        $this->form_validation->set_rules("maximum_number_of_guarantors", "Maximum number of guarantors", "numeric");
        $this->form_validation->set_rules("minimum_number_of_guarantors", "Minimum number of guarantors", "required|numeric");
        $this->form_validation->set_rules("custom_number_of_guarantors", "Custom number of guarantors", "numeric");
        $this->form_validation->set_rules("interest_rate", "Interest rate", "numeric|required");

        if ($this->form_validation->run()) {
            $saving_edited = $this->savings_model->get_update_saving($saving_id);
            // var_dump($saving_edited);die();
            if ($saving_edited > 0) {
                $this->session->set_flashdata("success_message", "Your saving" . $saving_id . "has been edited");
                redirect("saving/all-savings");
            } else {
                $this->session->set_flashdata("error_message", "unable to edit saving");
            }
        } else {
            $this->session->set_flashdata("error_message", validation_errors());

        }
        //1. get data for the saving with the passed saving_id from the model
        $my_saving = $this->savings_model->get_single_saving($saving_id);

        if ($my_saving->num_rows() > 0) {
            $row = $my_saving->row();
            $id = $row->saving_id;
			$name = $row->saving_name;
			$max_saving = $row->maximum_saving_amount;
			$min_saving = $row->minimum_saving_amount;
			$custom_saving = $row->custom_saving_amount;
			$max_instal = $row->maximum_number_of_installments;
			$min_instal = $row->minimum_number_of_installments;
			$custom_instal = $row->custom_number_of_installments;
			$max_guar = $row->maximum_number_of_guarantors;
			$min_guar = $row->minimum_number_of_guarantors;
			$custom_guar = $row->custom_number_of_guarantors;
			$interest = $row->interest_rate;
			$check = $row->saving_status;
        }
            $data = array(
                "saving_name" => $name,               
                "maximum_saving_amount" => $max_saving,                
                "minimum_saving_amount" => $min_saving,
                "custom_saving_amount" => $custom_saving,
                "maximum_number_of_installments" => $max_instal,
                "minimum_number_of_installments" => $min_instal,
                "custom_number_of_installments" => $custom_instal,
                "maximum_number_of_guarantors" => $max_guar,
                "minimum_number_of_guarantors" => $min_guar,
                "custom_number_of_guarantors" => $custom_guar,
                "interest_rate" => $interest,
                "saving_id" => $id,
            );

            $view = array("title" => $this->site_model->display_page_title(),
                "content" => $this->load->view("edit_saving", $data, true));
            $this->load->view("site/layouts/layout", $view);

    }

     //getting single saving_type_details
     public function select_saving_type($saving_type_id)
     {

         $saving_from_view = "1";
         var_dump($saving_from_view);die();
        $selected_saving_type = $this->savings_model->get_single_saving_type_details($saving_type_id);

        if ($selected_saving_type->num_rows()>0)
        {
            $row = $selected_saving_type->row();
            $saving_type_name = $row->saving_type_name;
            $maximum_saving_amount = $row->maximum_saving_amount;
            $minimum_saving_amount = $row->minimum_saving_amount;
            $custom_saving_amount = $row->custom_saving_amount;
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
