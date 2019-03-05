<?php
class Loan_types_model extends CI_Model
{
    public function add_loan_type()
    {
        $data = array(
            "loan_type_name" => $this->input->post("loan_type_name"),
            "maximum_loan_amount" => $this->input->post("maximum_loan_amount"),
            "minimum_loan_amount" => $this->input->post("minimum_loan_amount"),
            "custom_loan_amount" => $this->input->post("custom_loan_amount"),
            "maximum_number_of_installments" => $this->input->post("maximum_number_of_installments"),
            "minimum_number_of_installments" => $this->input->post("minimum_number_of_installments"),
            "custom_number_of_installments" => $this->input->post("custom_number_of_installments"),
            "maximum_number_of_guarantors" => $this->input->post("maximum_number_of_guarantors"),
            "minimum_number_of_guarantors" => $this->input->post("minimum_number_of_guarantors"),
            "custom_number_of_guarantors" => $this->input->post("custom_number_of_guarantors"),
            "interest_rate" => $this->input->post("interest_rate"),
        );

        if ($this->db->insert("loan_type", $data)) {
            return $this->db->insert_id();
        } else {
            return false;
        }
    }

    public function get_single_loan_type($loan_type_id)
    {
        $this->db->where("loan_type_id", $loan_type_id);
        return $this->db->get("loan_type");
    }

    public function get_update_loan_type($loan_type_id)
    {
        $data = array(
            "loan_type_name" => $this->input->post("loan_type_name"),
            "maximum_loan_amount" => $this->input->post("maximum_loan_amount"),
            "minimum_loan_amount" => $this->input->post("minimum_loan_amount"),
            "custom_loan_amount" => $this->input->post("custom_loan_amount"),
            "maximum_number_of_installments" => $this->input->post("maximum_number_of_installments"),
            "minimum_number_of_installments" => $this->input->post("minimum_number_of_installments"),
            "custom_number_of_installments" => $this->input->post("custom_number_of_installments"),
            "maximum_number_of_guarantors" => $this->input->post("maximum_number_of_guarantors"),
            "minimum_number_of_guarantors" => $this->input->post("minimum_number_of_guarantors"),
            "custom_number_of_guarantors" => $this->input->post("custom_number_of_guarantors"),
            "interest_rate" => $this->input->post("interest_rate"),
        );

        $this->db->where("loan_type_id", $loan_type_id);
        $this->db->set($data);
        $this->db->update('loan_type');
        return $this->db->get("loan_type");
    }

    public function get_delete_loan_type($loan_type_id)
    {
        $this->db->where("loan_type_id", $loan_type_id);
        $this->db->set('deleted', '1');
        $this->db->update('loan_type');
        return $this->db->get("loan_type");
    }

    public function get_deactivate_loan_type($loan_type_id)
    {
        $this->db->where("loan_type_id", $loan_type_id);
        $this->db->set('loan_type_status', '0');
        $this->db->update('loan_type');
        return $this->db->get("loan_type");
    }

    public function get_activate_loan_type($loan_type_id)
    {
        $this->db->where("loan_type_id", $loan_type_id);
        $this->db->set('loan_type_status', '1');
        $this->db->update('loan_type');
        return $this->db->get("loan_type");
    }

    // pagination functions
    public function get_total()
    {
        return $this->db->count_all("loan_type");
    }

    
    // Search function
    public function get_results($search_term = 'default',$limit, $start)
    {
        // Use the Active Record class for safer queries.
        $this->db->select('*');
        $this->db->from('loan_type');
        $this->db->like('loan_type_name', $search_term);
        $this->db->limit($limit, $start);

        // Execute the query.
        $query = $this->db->get();

        // Return the results.
        return $query;
    }

    public function db_upload_cv()
    {
        $file_csv = $this->input->post('userfile');
        $config['upload_path'] = './assets/uploads/';
        $config['allowed_types'] = 'csv|CSV';
        $config['file_name'] = $_FILES["userfile"]['name'];
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
        $filename = $config['file_name'];

        if ($filename !== 'loan_type.csv') {
            $this->session->set_flashdata("error_message", "Wrong file, Kindly Upload 'loan_type_bulk.cv' ");
            redirect('loan_types/bulk_registration');
        } else {
            $this->upload->do_upload('userfile');
            $data = $this->upload->data();
            $count = 0;
            $fp = fopen($_FILES['userfile']['tmp_name'], 'r') or die("can't open file");
            while ($csv_line = fgetcsv($fp, 1024)) {
                $count++;
                if ($count == 1) {
                    continue;
                } //keep this if condition if you want to remove the first row
                for ($i = 0, $j = count($csv_line); $i < $j; $i++) {
                    $insert_csv = array();
                    $insert_csv['loan type name'] = $csv_line[0];
                    $insert_csv['maximum loan amount'] = $csv_line[1];
                    $insert_csv['minimum loan amount'] = $csv_line[2];
                    $insert_csv['custom loan amount'] = $csv_line[3];
                    $insert_csv['maximum number of installments'] = $csv_line[4];
                    $insert_csv['minimum number of installments'] = $csv_line[5];
                    $insert_csv['custom number of installments'] = $csv_line[6];
                    $insert_csv['maximum number of guarantors'] = $csv_line[7];
                    $insert_csv['minimum number of guarantors'] = $csv_line[8];
                    $insert_csv['custom number of guarantors'] = $csv_line[9];
                    $insert_csv['interest rate'] = $csv_line[10];
                    $insert_csv['loan type status'] = $csv_line[11];
                }
                $i++;
                $data = array(
                    'loan_type_name' => $insert_csv['loan type name'],
                    'maximum_loan_amount' => $insert_csv['maximum loan amount'],
                    'minimum_loan_amount' => $insert_csv['minimum loan amount'],
                    'custom_loan_amount' => $insert_csv['custom loan amount'],
                    'maximum_number_of_installments' => $insert_csv['maximum number of installments'],
                    'minimum_number_of_installments' => $insert_csv['minimum number of installments'],
                    'custom_number_of_installments' => $insert_csv['custom number of installments'],
                    'maximum_number_of_guarantors' => $insert_csv['maximum number of guarantors'],
                    'minimum_number_of_guarantors' => $insert_csv['minimum number of guarantors'],
                    'custom_number_of_guarantors' => $insert_csv['custom number of guarantors'],
                    'interest_rate' => $insert_csv['interest rate'],
                    'loan_type_status' => $insert_csv['loan type status']);
                $data['loan_type_details'] = $this->db->insert('loan_type', $data);
            }
            fclose($fp) or die("can't close file");
            $this->session->set_flashdata("success_message", "CSV template uploaded successfully");
            redirect("microfinance/loan_types");
            return $data;
        }

    }
}
