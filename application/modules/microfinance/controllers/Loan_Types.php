<?php
    if (!defined('BASEPATH')) {exit('No direct script access allowed');}
    require_once "./application/modules/admin/controllers/Admin.php";
    class Loan_types extends Admin
    {
        public function __construct()
        {
            parent::__construct();
            //load required models
            $this->load->model(array("loan_types_model", "site_model"));
        }
        // listing all loan types
        public function index($order_column = 'loan_type_name', $order_method = 'ASC')
        {
            // Listing and Search Parameters
            $table = "loan_type";
            $where = "deleted = 0";
            $search_parameters = array('loan_type_name');
            $search_results = $this->session->userdata("search_session");
            if(!empty($search_results) && $search_results != null) 
            {
                $where = $search_results;
            }
            // Pagination
            $total_records = $this->site_model->get_count_results($table);
            $limit_per_page = 5;
            $segment = 5;

            $config['base_url'] = site_url().'loan-types/all-loan-types/'.$order_column.'/'.$order_method;
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
            $query = $this->site_model->get_all_results($search_results, $table, $limit_per_page, $start_index, $where, $order_column, $order_method, $search_parameters);
            $row = $query->num_rows();
            if($query->num_rows() > 0)
            {
                //Ordering
                if($order_method == 'DESC')
                {
                    $order_method = 'ASC';
                }
                else
                {
                    $order_method = 'DESC';
                }
            }
            else
            {
                $this->session->set_flashdata("error", "0 Loan types retrieved");

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
        // adding a new loan_type
        public function add_loan_type()
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

            if($this->form_validation->run())  
            {
                $loan_type_created = $this->loan_types_model->add_loan_type();
                if($loan_type_created > 0) 
                {
                    $this->session->set_flashdata("success", "New Loan Type has been Added");
                    redirect("loan-types/all-loan-types");
                } 
                else 
                {
                    $this->session->set_flashdata("error", "Error, Unable to Add Loan Type");
                }
            } 
            else 
            {
                $this->session->set_flashdata("error", validation_errors());
            }
            $v_data["add_loan_type"] = "loan_types/loan_types_model";
            $data = array(
                "title" => $this->site_model->display_page_title(),
                "content" => $this->load->view("microfinance/loan_types/add_loan_type", $v_data, true),
            );
            $this->load->view("site/layouts/layout", $data);
        }
        //editing a loan type
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

            if($this->form_validation->run())
            {
                $loan_type_edited = $this->loan_types_model->edit_loan_type($loan_type_id);
                if($loan_type_edited > 0)
                {
                    $this->session->set_flashdata("success", "Your loan type has been edited");
                } 
                else 
                {
                    $this->session->set_flashdata("error", "unable to edit loan_type");
                }
                redirect("loan-types/all-loan-types");
            } 
            else
            {
                $this->session->set_flashdata("error", validation_errors());
            }
            //1. get data for the loan_type with the passed loan_type_id from the model
            $my_loan_type = $this->loan_types_model->get_single_loan_type($loan_type_id);
            if($my_loan_type->num_rows() > 0) 
            {
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
            $view = array(
                "title" => $this->site_model->display_page_title(),
                "content" => $this->load->view("microfinance/loan_types/edit_loan_type", $data, true));
            $this->load->view("site/layouts/layout", $view);
        }
        //activating a loan type
        public function activate_loan_type($loan_type_id)
        {
            $activated_loan = $this->loan_types_model->activate_loan_type($loan_type_id);
            if($activated_loan > 0) 
            {
                $this->session->set_flashdata("success", "Loan Type Activated Successfully");
            } 
            else 
            {
                $this->session->set_flashdata("error", "Unable to Activate Loan Type");
            }
            redirect("loan-types/all-loan-types");
        }
        //deactivating a loan type
        public function deactivate_loan_type($loan_type_id)
        {
            $deactivated_loan_type = $this->loan_types_model->deactivate_loan_type($loan_type_id);
            if($deactivated_loan_type > 0) 
            {
                $this->session->set_flashdata("success", "Loan Type Deactivated Successfully");
            } 
            else 
            {
                $this->session->set_flashdata("error", "Unable to Deactivate Loan Type");
            }
            redirect("loan-types/all-loan-types");
        }
        //deleting a loan type
        public function delete_loan_type($loan_type_id)
        {
            $deleted_loan_type = $this->loan_types_model->delete_loan_type($loan_type_id);
            if($deleted_loan_type > 0) 
            {
                $this->session->set_flashdata("success", "Loan Type Deleted Successfully");
            } 
            else 
            {
                $this->session->set_flashdata("error", "Unable to Delete Loan Type");
            }
            redirect("loan-types/all-loan-types");
        }
        //searching a loan type
        public function search_loan_type()
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
            redirect("loan-types/all-loan-types");
        }
        // closing search session
        public function close_search_loan_type_session()
        {
            $this->session->unset_userdata("search_session");
            redirect("loan-types/all-loan-types");
        }
        // loading bulk view
        public function bulk_upload_view()
        {
            $v_data["add_loan_type"] = "microfinance/loan_types/loan_types_model";
            $data = array(
                "title" => $this->site_model->display_page_title(),
                "content" => $this->load->view("microfinance/loan_types/bulk_registration", $v_data, true),
            );
            $this->load->view("site/layouts/layout", $data);
        }
        // downloading csv template
        public function download_csv()
        {
            force_download("./assets/downloads/loan_type.csv", null);
        }
        // uploading csv file
        public function upload_csv()
        {
            $this->loan_types_model->upload_csv();
        } 
    }
