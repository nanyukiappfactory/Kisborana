<?php
    if (!defined('BASEPATH')) {
        exit('No direct script access allowed');
    }
    require_once "./application/modules/admin/controllers/Admin.php";
    class Saving_types extends Admin
    {
        public function __construct()
        {
            parent::__construct();
            $this->load->model("microfinance/saving_types_model");
            $this->load->model("site/site_model");
            $this->load->library(array("pagination", "upload"));
            $this->load->helper(array('url', 'form', 'html', 'download'));
        }
        //all saving types
        public function index($sortBy="saving_type_name",$order="asc")
        {
            $var = $this->session->userdata('logged_in_user');
            $login_status = $var['login_status'];
            if ($login_status == 'TRUE') {

                $table = "saving_type";
                $where = "deleted = 0";
                $search_results = $this->session->userdata("search_session");
                if (!empty($search_results) && $search_results != null) {
                    $where = $search_results;
                }
                //pagination
                $config = array();
                $config["base_url"] = base_url() . "saving-types/all-saving-types/".$sortBy.'/'.$order;
                $config["total_rows"] = $this->saving_types_model->record_count();
                $config["per_page"] = 5;
                $config["uri_segment"] = 3;

                $config['full_tag_open'] = '<div class="pagging text-center"><nav aria-label="Page navigation example"><ul class="pagination">';
                $config['full_tag_close'] = '</ul></nav></div>';
                $config['num_tag_open'] = '<li class="page-item"><span class="page-link">';
                $config['num_tag_close'] = '</span></li>';
                $config['cur_tag_open'] = '<li class="page-item active"><span class="page-link">';
                $config['cur_tag_close'] = '<span class="sr-only">(current)</span></span></li>';
                $config['next_tag_open'] = '<li class="page-item"><span class="page-link">';
                $config['next_tag_close'] = '<span aria-hidden="true"></span></span></li>';
                $config['prev_tag_open'] = '<li class="page-item"><span class="page-link">';
                $config['prev_tag_close'] = '</span></li>';
                $config['first_tag_open'] = '<li class="page-item"><span class="page-link">';
                $config['first_tag_close'] = '</span></li>';
                $config['last_tag_open'] = '<li class="page-item"><span class="page-link">';
                $config['last_tag_close'] = '</span></li>';

                $this->pagination->initialize($config);
                $page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 0;
                
                
                $v_data = $this->saving_types_model->get_saving_type($config["per_page"], $page, $sortBy,$order);
                $link_data = $this->pagination->create_links();
                //search
                $this->form_validation->set_rules("search", "Search", "required");
                if ($this->form_validation->run()) {
                    $saving_type_id["searched_saving_type"] = $this->saving_types_model->search_saving_type();                   
                    $data = array("title" => $this->site_model->display_page_title(),
                        "content" => $this->load->view("microfinance/saving_types/search_results", $saving_type_id, true),
                    );
                    $this->load->view("site/layouts/layout", $data);
                } else {
                    $all_data = array(
                        "all_saving_type" => $v_data,
                        "links" => $link_data,
                        "page" => $page,
                        "order"=>$order
                    );
                    
                    $data = array("title" => $this->site_model->display_page_title(),
                        "content" => $this->load->view("microfinance/saving_types/all_saving_type", $all_data, true),
                    );
                    $this->load->view("site/layouts/layout", $data);
                }
            } else {
                redirect("admin/login_admin");
            }
        }

        //ading new saving type
        public function new_saving_type()
        {
            $this->form_validation->set_rules("saving_type_name", "Saving Type Name", "required");

            if ($this->form_validation->run()) {
                $saving_type_id = $this->saving_types_model->add_saving_type();
                if ($saving_type_id > 0) {
                    $this->session->set_flashdata("success_message", "New saving type has been added");
                } else {
                    $this->session->set_flashdata("error_message", "unable to add saving type");
                }
                redirect("saving-types/all-saving-types");

                $data["form_error"] = validation_errors();
            }
            $v_data["add_saving_type"] = "microfinance/saving_types_model";
            $data = array("title" => $this->site_model->display_page_title(),
                "content" => $this->load->view("microfinance/saving_types/add_saving_type", $v_data, true),

            );
            $this->load->view("site/layouts/layout", $data);
        }

        //editing saving type
        public function edit_saving_type($saving_type_id)
        {
            $this->form_validation->set_rules("saving_type_name", "Saving Type Name", "required");

            if ($this->form_validation->run()) {
                $saving_type_id = $this->saving_types_model->edit_saving_type($saving_type_id);
                redirect("saving-types/all-saving-types");
            } else {
                $validation_errors = validation_errors();
                if (!empty($validation_errors)) {
                    $this->session->set_flashdata("error", $validation_errors);
                }
            }

            //1. get data for the saving type with the passed saving_type_id from the model
            $single_saving_type_data = $this->saving_types_model->get_single_saving_type($saving_type_id);
            if ($single_saving_type_data->num_rows() > 0) {
                $row = $single_saving_type_data->row();
                $saving_type_id = $row->saving_type_id;
                $saving_type_name = $row->saving_type_name;
            }
            $v_data = array(
                "saving_type_id" => $saving_type_id,
                "saving_type_name" => $saving_type_name,
            );
           
            //2. load view with the data from step 1
            $data = array(
                "title" => $this->site_model->display_page_title(),
                "content" => $this->load->view("microfinance/saving_types/edit_saving_type", $v_data, true),
            );
            $this->load->view("site/layouts/layout", $data);
        }

        //deleting a row
        public function delete_saving_type($saving_type_id)
        {
            $undeleted = $this->saving_types_model->delete_saving_type($saving_type_id);

            if ($undeleted > 0) {
                $this->session->set_flashdata("success_message", "Saving Type Deleted Successfully");               
            } else {
                $this->session->set_flashdata("error_message", "Unable to Delete Saving Type");               
            }
            redirect("saving-types/all-saving-types");
        }

        //deactivate
        public function deactivate_saving_type($saving_type_id)
        {
            //1. load model and pass saving_type_id so as to update the saving_type_status column of that particular saving_type
            $undeactivated = $this->saving_types_model->deactivate_saving_type($saving_type_id);
            //2. Return all saving_type where the value saving_type_status column is 1; meaning, they are deactivated

            if ($undeactivated) {
                $this->session->set_flashdata("success_message", "Saving Type Dactivated Successfully");                
            } else {
                $this->session->set_flashdata("error_message", "Unable to Deactivate Saving Type");                
            }
            redirect("saving-types/all-saving-types");
        }

        //activate
        public function activate_saving_type($saving_type_id)
        {
            //1. load model and pass saving_type_id so as to update the saving_type_status column of that particular saving_type
            $unactivated = $this->saving_types_model->activate_saving_type($saving_type_id);
            //2. Return all saving_types where the value saving_type_status column is 1; meaning, they are active

            if ($unactivated) {
                $this->session->set_flashdata("success_message", "Saving Type Activated Successfully");                
            } else {
                $this->session->set_flashdata("error_message", "Unable to Activate Saving Type");              
            }
            redirect("saving-types/all-saving-types");
        }

        //function for importing saving types in bulk
        public function bulk_registration()
        {
            $v_data["add_saving_type"] = "microfinance/saving_types/saving_types_model";
            $data = array("title" => $this->site_model->display_page_title(),
                          "content" => $this->load->view("microfinance/saving_types/bulk_registration", $v_data, true),

            );
            $this->load->view("site/layouts/layout", $data);
        }
        public function download_csv()
        {
            force_download("./assets/downloads/saving_type.csv", null);
        }

        public function upload_csv()
        {
            $this->saving_types_model->upload_csv();
        } 
    }
