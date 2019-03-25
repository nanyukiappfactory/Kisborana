<?php
class Saving_types_model extends CI_Model
{
    //function for adding new saving type
    public function add_saving_type()
    {
        $data = array(
            "saving_type_name" => $this->input->post("saving_type_name"),
        );

        if ($this->db->insert("saving_type", $data)) {
            return $this->db->insert_id();
        } else {
            return false;
        }
    }

    //function for grabing all saving types
    public function get_saving_type($limit, $start)
    {
        $this->db->limit($limit, $start);
        $this->db->order_by("created_on", "DESC");
        $this->db->where("deleted", 0);
        $query = $this->db->get("saving_type");
        if ($query->num_rows() > 0) {
            foreach ($query->result() as $row) {
                $data[] = $row;
            }
            return $data;
        }
        return false;
    }

    //retrieving a single saving type
    public function get_single_saving_type($saving_type_id)
    {
        $this->db->where("saving_type_id", $saving_type_id);
        return $this->db->get("saving_type");
    }

    //function for updating saving type
    public function edit_saving_type($saving_type_id)
    {
        $data = array(
            "saving_type_name" => $this->input->post("saving_type_name"),
        );
        $this->db->set($data);
        $this->db->where("saving_type_id", $saving_type_id);
        if ($this->db->update("saving_type")) {
            $this->session->set_flashdata("success", "successfully updated");
            return true;
        } else {
            $this->session->set_flashdata("error", "failed to update");
            return false;
        }
    }

    //function for deleting a saving type and returning the undeleted rows
    public function delete_saving_type($saving_type_id)
    {
        $this->db->where("saving_type_id", $saving_type_id);
        $this->db->set("deleted", 1);
        if ($this->db->update("saving_type")) {
            $saving_type_not_deleted = $this->get_saving_type($limit, $start);
            return $saving_type_not_deleted;
        } else {
            return false;
        }
    }

    //deactivate
    public function deactivate_saving_type($saving_type_id)
    {
        $this->db->where("saving_type_id", $saving_type_id);
        $this->db->set("saving_type_status", 0);
        if ($this->db->update("saving_type")) {
            $saving_type_not_deactivated = $this->get_saving_type($limit, $start);
            return $saving_type_not_deactivated;
        } else {
            return false;
        }
    }

    //activate
    public function activate_saving_type($saving_type_id)
    {
        $this->db->where("saving_type_id", $saving_type_id);
        $this->db->set("saving_type_status", 1);
        if ($this->db->update("saving_type")) {
            $saving_type_not_activated = $this->get_saving_type($limit, $start);
            return $saving_type_not_activated;
        } else {
            return false;
        }
    }

    //function for searching
    public function search_saving_type()
    {

        $keyword = $this->input->post("search");
        $this->db->like("saving_type_name", $keyword);
        $this->db->where("deleted", 0);
        $query = $this->db->get('saving_type');
        if ($query->num_rows() > 0) {
            $this->session->set_flashdata("success", "Search results found");

        } else {
            $this->session->set_flashdata("error", "Saving type not found");
        }
        return $query;
    }

    //counting all the records in saving_type table
    public function record_count()
    {
        return $this->db->count_all("saving_type");
        $this->db->select('COUNT(deleted) as count');
        $this->db->from("saving_type");
        $this->db->where("deleted", 0);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            $row = $query->row();
            return $row->count;
        }

    }

    //importing a csv file
    public function upload_csv()
    {
        $file_csv = $this->input->post("userfile");
        $config["upload_path"] = "./assets/uploads/";
        $config["allowed_types"] = "csv";
        $config["file_name"] = $_FILES["userfile"]["name"];
        $this->load->library("upload",$config);
        $this->upload->initialize($config);
        $filetype = $config["allowed_types"];
        if($filetype != "CSV" || $filetype != "csv")
        {
            $this->session->set_flashdata("error_message", "Wrong file, kindly upload the correct file format");
            redirect("saving-types/import-saving-types");
        }
        else
        {
            $this->upload->do_upload("userfile");
            $data = $this->upload->data();
            $count = 0;
            $fp = fopen($_FILES["userfile"]["tmp_name"],"r") or die("can't open file");
            while($csv_line = fgetcsv($fp, 1024)){
                $count++;
                if($count == 1)
                {
                    continue;
                }
                for($i = 0, $j = count($csv_line); $i < $j; $i++)
                {
                    $insert_csv = array();
                    $insert_csv["saving type name"] = $csv_line[0];
                }
                $i++;
                $data = array(
                    "saving_type_name"=>$insert_csv["saving type name"]
                );
                $data["saving_type_details"] = $this->db->insert("saving_type", $data);
            }
            fclose($fp) or die("can't close file");
            $this->session->set_flashdata("success_message", "CSV template uploaded successfully");
            redirect("microfinance/saving_types");
            return $data;
        }
    }

}
