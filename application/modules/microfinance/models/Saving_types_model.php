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
        $this->db->limit($limit,$start);
        $this->db->order_by("created_on", "DESC");
        $this->db->where("deleted",0);


        $query = $this->db->get ("saving_type");

        if($query->num_rows()>0)
        {
            foreach ($query->result() as $row)
            {
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
        $data = array (
            "saving_type_name" =>$this->input->post("saving_type_name")
        );

        $this->db->set($data);
        $this->db->where("saving_type_id", $saving_type_id);

        if ($this->db->update("saving_type"))
        {
            $this->session->set_flashdata("success","successfully updated");
            return true;
        } 
        else{
            $this->session->set_flashdata("error", "failed to update");
            return false;
        }
    }

    //function for deleting a saving type and returning the undeleted rows
    public function delete_saving_type($saving_type_id)
    {
        $this->db->where("saving_type_id", $saving_type_id);
        $this->db->set("deleted",1);

        if($this->db->update("saving_type"))
        {
            $saving_type_not_deleted = $this->get_saving_type($limit, $start);
            
            return $saving_type_not_deleted;
        }
        else
        {
           return false;
        }
    }

  //deactivate
  public function deactivate_saving_type($saving_type_id)
  {
     $this->db->where("saving_type_id", $saving_type_id);
     $this->db->set("saving_type_status",0);
     if($this->db->update("saving_type"))
     {
        $saving_type_not_deactivated= $this->get_saving_type($limit, $start);       
         return $saving_type_not_deactivated;
     }
     else {        
         return false;
     }
 }
  
 //activate
 public function activate_saving_type($saving_type_id)
 {
    $this->db->where("saving_type_id", $saving_type_id);
    $this->db->set("saving_type_status",1);
    if($this->db->update("saving_type"))
    {
       $saving_type_not_activated= $this->get_saving_type($limit, $start);      
        return $saving_type_not_activated;
    }
    else {
        return false;
    }
}

//function for searching 
// public function search_saving_type()
// {   
    
//     $keyword = $this->input->post("search");
//     $this->db->like("saving_type_name",$keyword);
//     $this->db->where("deleted",0);
//     $query=$this->db->get('saving_type');
//     if ($query->num_rows() > 0) {
//         $this->session->set_flashdata("success", "Search results found");
        
//     } else {
//         $this->session->set_flashdata("error", "Saving type not found");
//     } 
//     return $query;

// }

//function for searching
public function search_saving_type()
{
    $this->db->select('*');
    $this->db->from('saving_type');
    $this->db->like("saving_type_name",$keyword);

    $query = $this->db->get();
    return $query;
}

//counting all the records in saving_type table
public function record_count()
{
    return $this->db->count_all("saving_type");
}

//retrieve a list of saving types

}