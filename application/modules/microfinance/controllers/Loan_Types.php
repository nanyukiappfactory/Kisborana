<?php
require_once "./application/modules/admin/controllers/Admin.php";

class Loan_Types extends Admin
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("site/site_model");
        $this->load->model("loan_types_model");

        // load pagination library
        $this->load->library('pagination');

        // load form (multipart) and URL helper
        $this->load->helper(array('url', 'form', 'html', 'download'));

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
        $total_records = $this->loan_types_model->get_total();
        $config = array();
        $limit_per_page = 2;

        // get current page records
       
        $config['base_url'] = base_url() . 'microfinance/loan_types/index';
        $config['total_rows'] = $total_records;
        $config['per_page'] = 2;
        $config["uri_segment"] = 3;
        $config['num_links'] = 1;

        $this->pagination->initialize($config);

        // build paging links
        $params = array('links' => $this->pagination->create_links(),
            'all_loan_types' => $this->loan_types_model->get_loan_type($limit_per_page, $start_index),
            'page' => $start_index,
        );

        $var2 = $this->loan_types_model->get_loan_type($limit_per_page, $start_index);

        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/loan_types/all_loan_types", $params, true));
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
        $data['results'] = $this->loan_types_model->get_results($search_term);

        // Pass the results to the view.

        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/loan_types/search_results", $data, true));
        $this->load->view("site/layouts/layout", $data);

    }


    public function new_loan_type()
    {
        //form validation
        $this->form_validation->set_rules("loan_type_name", "Loan Type Name", "required");
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
            $loan_type_id = $this->loan_types_model->add_loan_type();
            if ($loan_type_id > 0) {
                $this->session->set_flashdata("success_message", "new loan_type has been added");
                redirect("microfinance/loan_types");
            } else {
                $this->session->set_flashdata("error_message", "unable to add loan_type");
            }
        }
        $data["form_error"] = validation_errors();
        // $this->load->view("add_loan_type", $data);

        $v_data["add_loan_type"] = "loan_types/loan_types_model";
        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/loan_types/add_loan_type", $v_data, true),

        );
        $this->load->view("site/layouts/layout", $data);

    }

    public function delete($loan_type_id)
    {
        $my_loan_type = $this->loan_types_model->get_delete_loan_type($loan_type_id);
        if ($my_loan_type > 0) {
            $this->session->set_flashdata("success_message", "loan_type deleted");
            redirect("microfinance/loan_types");
        } else {
            $this->session->set_flashdata("error_message", "unable to delete");
            redirect("microfinance/loan_types");
        }
    }

    public function deactivate($loan_type_id)
    {
        $my_loan_type = $this->loan_types_model->get_deactivate_loan_type($loan_type_id);
        if ($my_loan_type > 0) {
            $this->session->set_flashdata("success_message", "loan_type deactivated successfully");
            redirect("microfinance/loan_types");
        } else {
            $this->session->set_flashdata("error_message", "unable to deactivate loan_type");
            redirect("microfinance/loan_types");
        }
    }

    public function bulk_registration()
    {
        $v_data["add_loan_type"] = "microfinance/loan_types/loan_types_model";
        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/loan_types/bulk_registration", $v_data, true),

        );
        $this->load->view("site/layouts/layout", $data);
    }

    public function upload_csv()
    {
        $this->loan_types_model->db_upload_cv();
    }

    public function activate($loan_type_id)
    {
        $my_loan_type = $this->loan_types_model->get_activate_loan_type($loan_type_id);
        if ($my_loan_type > 0) {
            $this->session->set_flashdata("success_message", "loan_type activated successfully");
            redirect("microfinance/loan_types");
        } else {
            $this->session->set_flashdata("error_message", "unable to activate loan_type");
            redirect("microfinance/loan_types");
        }
    }

    public function edit($loan_type_id)
    {
        $my_loan_type = $this->loan_types_model->get_single_loan_type($loan_type_id);

        if ($my_loan_type->num_rows() > 0) {
            $row = $my_loan_type->row();
            $id = $row->loan_type_id;
            $name = $row->loan_type_name;
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
            $check = $row->loan_type_status;
            $data = array(
                "loan_type_name" => $name,
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
                "loan_type_id" => $id,
            );

            $view = array("title" => $this->site_model->display_page_title(),
                "content" => $this->load->view("microfinance/loan_types/edit_loan_type", $data, true));
            $this->load->view("site/layouts/layout", $view);

        }
    }

    public function edit_loan_type($loan_type_id)
    {
        //form validation
        $this->form_validation->set_rules("loan_type_name", "Loan Type Name", "required");
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
            $pal_id = $this->loan_types_model->get_update_loan_type($loan_type_id);
            // var_dump($pal_id);die();
            if ($pal_id > 0) {
                $this->session->set_flashdata("success_message", "Your loan_type" . $loan_type_id . "has been edited");
                redirect("microfinance/loan_types");
            } else {
                $this->session->set_flashdata("error_message", "unable to edit loan_type");
            }
        }
    }
    public function download_csv(){
        force_download("./assets/downloads/loan_type.csv", NULL);
    }
}
