<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Import Controller
 *
 * @author TechArise Team
 *
 * @email  info@techarise.com
 */
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Imports extends CI_Controller {

    public function __construct() {
        parent::__construct();
        //$this->load->library('excel');
        $this->load->model('Import_model', 'import');
        $this->load->model("site/site_model"); 
    }

    // upload xlsx|xls file
    public function index() {
        $data['page'] = 'import';
       // $data['title'] = 'Import XLSX | TechArise';
        
       $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view('saving_types/upload', $data, true),
        );
        $this->load->view("site/layouts/layout", $data);

    }
    // import excel/csv data
    public function save() {

        // //validation
        // $this->form_validation->set_rules("saving_type_name", "Saving Type Name", "required");

        // if($this->form_validation->run())
        // {
        //     $saving_type_id = $this->saving_type_model->edit_saving_type($saving_type_id);

        //     redirect("saving_type");
        // }
        // else
        // {
        //     $validation_errors = validation_errors();
        //     if(!empty ($validation_errors))
        //     {
        //         $this->session->set_flashdata("error",$validation_errors);
        //     }
        // }
        //end of validation
       
        $this->load->library('excel');     
        
        if ($this->input->post('importfile')) {
            $path = 'assets/uploads/';

            $config['upload_path'] = $path;
            $config['allowed_types'] = 'xlsx|xls|jpg|png|csv';
            $config['remove_spaces'] = TRUE;
            $this->load->initialize($config);
            $this->load->library('upload', $config);
            if (!$this->upload->do_upload('userfile')) {
                $error = array('error' => $this->upload->display_errors());
                

            } else {
                $data = array('upload_data' => $this->upload->data());
            }
            
            if (!empty($data['upload_data']['file_name'])) {
                $import_xls_file = $data['upload_data']['file_name'];
            } else {
                $import_xls_file = 0;
            }
            $inputFileName = $path . $import_xls_file;
            try {
                $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
                $objReader = PHPExcel_IOFactory::createReader($inputFileType);
                $objPHPExcel = $objReader->load($inputFileName);
            } catch (Exception $e) {
                die('Error loading file "' . pathinfo($inputFileName, PATHINFO_BASENAME)
                        . '": ' . $e->getMessage());
            }
            $allDataInSheet = $objPHPExcel->getActiveSheet()->toArray(null, true, true, true);
            
            $arrayCount = count($allDataInSheet);
            $flag = 0;
            $createArray = array('saving_type_name');
            $makeArray = array('saving_type_name' => 'saving_type_name');
            $SheetDataKey = array();
            foreach ($allDataInSheet as $dataInSheet) {
                foreach ($dataInSheet as $key => $value) {
                    if (in_array(trim($value), $createArray)) {
                        $value = preg_replace('/\s+/', '', $value);
                        $SheetDataKey[trim($value)] = $key;
                    } else {
                        
                    }
                }
            }
            $data = array_diff_key($makeArray, $SheetDataKey);
           
            if (empty($data)) {
                $flag = 1;
            }
            if ($flag == 1) {
                for ($i = 2; $i <= $arrayCount; $i++) {
                    $addresses = array();
                    $saving_type_name = $SheetDataKey['saving_type_name'];
                    
                   
                    $saving_type_name = filter_var(trim($allDataInSheet[$i][$saving_type_name]), FILTER_SANITIZE_STRING);
                   
                    

                    $fetchData[] = array('saving_type_name' => $saving_type_name);


                }              
                $data['employeeInfo'] = $fetchData;

               // var_dump($fetchData); die();

                $this->import->setBatchImport($fetchData);
                $this->import->importData();
            } else {
                echo "Please import correct file";
            }
        }

                
        //$this->load->view('saving_type/display', $data);
       // $v_data ["add_saving_type"]= "saving_type/saving_type_model";
        $data = array("title" => $this->site_model->display_page_title(),
            "content" => $this->load->view('saving_types/display', $data, true),
        );
        $this->load->view("site/layouts/layout", $data);
        
    }

    //download template
    public function download()
    {

        $this->load->helper('download');
        $name = "posts.csv";
        $data = file_get_contents('uploads/posts.csv'); 
        force_download($name, $data); 

        
            redirect('saving_types/import/','refresh');
    }
}
?>