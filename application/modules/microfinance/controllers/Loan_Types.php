<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}
require_once "./application/modules/admin/controllers/Admin.php";

class Loan_Types extends Admin
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model(array("loan_types_model", "site_model"));

        // load required libraries
        $this->load->library(array('pagination', 'upload'));

        // load required helpers
        $this->load->helper(array('url', 'form', 'html', 'download'));

    }
    public function index($order_column = 'loan_type_name', $order_method = 'ASC')
    {
        // Pagination
        $table = "loan_type";
        $where = "deleted = 0";

        $search_results = $this->session->userdata("search_session");

        if (!empty($search_results) && $search_results != null) {
            $where = $search_results;

        }

        $total_records = $this->site_model->get_count_loan_types($table);
        $limit_per_page = 5;
        $segment = 5;

        $config['base_url'] = site_url() . 'loan-types/all-loan-types/' . $order_column . '/' . $order_method;
        $config['total_rows'] = $total_records;
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
        $v_data = $this->pagination->create_links();

        $query = $this->site_model->get_all_results($search_results, $table, $limit_per_page, $start_index, $where, $order_column, $order_method);

        //Ordering
        if ($order_method == 'DESC') {

            $order_method = 'ASC';
        } else {
            $order_method = 'DESC';
        }

        $params = array('links' => $v_data,
            'all_loan_types' => $query,
            'page' => $start_index,
            'order_method' => $order_method,
            'order_column' => $order_column,
        );

        $data = array(
            "title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/loan_types/all_loan_types", $params, true),
        );
        $this->load->view("site/layouts/layout", $data);

    }
    //search function
    public function execute_search()
    {
        $search_results = $this->input->post("search");
        $this->form_validation->set_rules("search", "Search", "required");

        if ($this->form_validation->run()) {
            $search_session = $this->session->set_userdata("search_session", $search_results);
        } else {
            $this->session->unset_userdata("search_session");
        }
        redirect("loan-types/all-loan-types");
    }
    // close search session
    public function close_search_session()
    {
        $this->session->unset_userdata("search_session");
        redirect("loan-types/all-loan-types");
    }
    // adding a new loan_type
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
            $loan_type_created = $this->loan_types_model->add_loan_type();
            if ($loan_type_created > 0) {
                $this->session->set_flashdata("success_message", "New Loan Type has been Added");
                redirect("loan-types/all-loan-types");
            } else {
                $this->session->set_flashdata("error_message", "Unable to Add Loan Type");
            }
        } else {
            $this->session->set_flashdata("error_message", validation_errors());
        }
        $v_data["add_loan_type"] = "loan_types/loan_types_model";
        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/loan_types/add_loan_type", $v_data, true),
        );
        $this->load->view("site/layouts/layout", $data);
    }

    //deleting a loan type
    public function delete($loan_type_id)
    {
        $my_loan_type = $this->loan_types_model->get_delete_loan_type($loan_type_id);
        if ($my_loan_type > 0) {
            $this->session->set_flashdata("success_message", "Loan Type Deleted Successfully");
            redirect("loan-types/all-loan-types");
        } else {
            $this->session->set_flashdata("error_message", "Unable to Delete Loan Type");
            redirect("loan-types/all-loan-types");
        }
    }

    //deactivating a loan type
    public function deactivate($loan_type_id)
    {
        $my_loan_type = $this->loan_types_model->get_deactivate_loan_type($loan_type_id);
        if ($my_loan_type > 0) {
            $this->session->set_flashdata("success_message", "Loan Type Deactivated Successfully");
            redirect("loan-types/all-loan-types");
        } else {
            $this->session->set_flashdata("error_message", "Unable to Deactivate Loan Type");
            redirect("loan-types/all-loan-types");
        }
    }

    //impoting records from a csv file
    public function bulk_upload_view()
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

    //activating a loan type
    public function activate($loan_type_id)
    {
        $my_loan_type = $this->loan_types_model->get_activate_loan_type($loan_type_id);
        if ($my_loan_type > 0) {
            $this->session->set_flashdata("success_message", "Loan Type Activated Successfully");
            redirect("loan-types/all-loan-types");
        } else {
            $this->session->set_flashdata("error_message", "Unable to Activate Loan Type");
            redirect("loan-types/all-loan-types");
        }
    }

    //editing a loan type
    public function edit($loan_type_id)
    {

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
            $loan_type_edited = $this->loan_types_model->get_update_loan_type($loan_type_id);
            // var_dump($loan_type_edited);die();
            if ($loan_type_edited > 0) {
                $this->session->set_flashdata("success_message", "Your loan type has been edited");
                redirect("loan-types/all-loan-types");
            } else {
                $this->session->set_flashdata("error_message", "unable to edit loan_type");
                redirect("edit-loan-types");
            }
        } else {
            $this->session->set_flashdata("error_message", validation_errors());

        }

        //1. get data for the loan_type with the passed loan_type_id from the model
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
        }
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
    public function download_csv()
    {
        force_download("./assets/downloads/loan_type.csv", null);
    }
}
