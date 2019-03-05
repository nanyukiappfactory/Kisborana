<?php
require_once "./application/modules/admin/controllers/Admin.php";

class Loan_Types extends Admin
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("loan_types_model");
        $this->load->model("site_model");


        // load pagination library
        $this->load->library('pagination');

        // load form (multipart) and URL helper
        $this->load->helper(array('url', 'form', 'html', 'download'));

        // load upload library
        $this->load->library('upload');
    }
    public function index()
    {
        // Pagination
        $table = "loan_type";
        //$where = "deleted = 0";        
        $total_records = $this->site_model->get_count_loan_types($table);
        //var_dump($total_records);die();
        //$config = array();
        $limit_per_page = 5;
        $segment = 3;
        

        // get current page records
       
        $config['base_url'] = site_url().'loan-types/all-loan-types/';
        $config['total_rows'] = $total_records;
        $config['uri_segment'] = $segment;
        $config['per_page'] =  $limit_per_page ;
        $config['num_links'] = 3;

        $config['full_tag_open'] = '<div class="pagging text-center"><nav aria-label="Page navigation example"><ul class="pagination">';
        $config['full_tag_close'] = '</ul></nav></div>';
        $config['num_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['num_tag_close'] = '</span></li>';
        $config['cur_tag_open'] = '<li class="page-item active"><span class="page-link">';
        $config['cur_tag_close'] = '<span class="sr-only">(current)</span></span></li>';
        $config['next_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['next_tagl_close'] = '<span aria-hidden="true">&raquo;</span></span></li>';
        $config['prev_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['prev_tagl_close'] = '</span></li>';
        $config['first_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['first_tagl_close'] = '</span></li>';
        $config['last_tag_open'] = '<li class="page-item"><span class="page-link">';
        $config['last_tagl_close'] = '</span></li>';

        $this->pagination->initialize($config);
        $start_index = ($this->uri->segment($segment)) ? $this->uri->segment($segment) : 0;
        // build paging links
        $v_data = $this->pagination->create_links();
        $query = $this->site_model->get_all_results($table,$limit_per_page, $start_index);

        $params = array('links' => $v_data,
                        'all_loan_types' => $query,
                         'page' => $start_index,
        );
        
        //$var2 = $this->loan_types_model->get_loan_type($limit_per_page, $start_index);

        $data = array(
            "title" => $this->site_model->display_page_title(),
            "content" => $this->load->view("microfinance/loan_types/all_loan_types", $params, true)
        );
        $this->load->view("site/layouts/layout", $data);
        
    
    }

    //search function
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

        if ($this->form_validation->run()) 
        {
            
            $loan_type_id = $this->loan_types_model->add_loan_type();
            if ($loan_type_id > 0) {
                $this->session->set_flashdata("success_message", "New Loan Type has been Added");
                redirect("loan-types/all-loan-types");
            } else {
                $this->session->set_flashdata("error_message", "Unable to Add Loan Type");
            }
        }
        else
        {
            $this->session->set_flashdata("error_message", validation_errors());
            $v_data["add_loan_type"] = "loan_types/loan_types_model";
            $data = array("title" => $this->site_model->display_page_title(),
                "content" => $this->load->view("microfinance/loan_types/add_loan_type", $v_data, true),
    
            );
            $this->load->view("site/layouts/layout", $data);
        }
        

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
                $this->session->set_flashdata("success_message", "Your loan type has been edited");
                redirect("loan-types/all-loan-types");
            } else {
                $this->session->set_flashdata("error_message", "unable to edit loan_type");
                redirect("edit-loan-types");
            }
        }
        else {
            $this->session->set_flashdata("error_message", "Fill in the details correctly");
            $this->edit($loan_type_id);
        }
    }
    public function download_csv(){
        force_download("./assets/downloads/loan_type.csv", NULL);
    }
}
