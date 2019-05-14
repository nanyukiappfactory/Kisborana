<?php
class savings_model extends CI_Model
{
    //getting member name
    public function get_member_details(){
        $query = $this->db->get('member');
        return $query;

    }

    //getting saving_type_details
    public function get_saving_type_details(){
       $query = $this->db->get('saving_type');
        return $query;
       //var_dump($query->result());die();

    }

    //getting single saving_type_details
    public function get_single_saving_type_details($saving_type_id){
        $this->db->where("saving_type_id", $saving_type_id);
        $query = $this->db->get('saving_type');
        return ($query);
 
     }

     //add saving
    public function add_saving()
    {           
        $data = array(
            "member_id" => $this->input->post("member_name"),
            "saving_type_id" => $this->input->post("saving_type_name"),
            "saving_amount" => $this->input->post("saving_amount"),          
            
        );
               
        if ($this->db->insert("saving", $data)) {
             $saving_id = $this->db->insert_id(); 
           
            return $saving_id;

        } else {
            return false;
        }
    }
    
    public function get_single_saving($saving_id)
    {
        $this->db->where("saving_id", $saving_id);
        return $this->db->get("saving");
    }
    
    public function get_update_saving($saving_id)
    {
            $data = array(
            "saving_type_name" => $this->input->post("saving_type_name"),
            "saving_amount" => $this->input->post("saving_amount"),            
        );
        
        $this->db->where("saving_id",$saving_id);        
        $this->db->set($data);
        $this->db->update('saving');
        return $this->db->get("saving");
    }

    public function get_delete_saving($saving_id)
    {
        $this->db->where("saving_id",$saving_id);        
        $this->db->set('deleted','1');
        $this->db->update('saving');
        return $this->db->get("saving");
    }

    public function get_deactivate_saving($saving_id)
    {
        $this->db->where("saving_id",$saving_id);        
        $this->db->set('saving_status','0');
        $this->db->update('saving');
        return $this->db->get("saving");
    }

    public function get_activate_saving($saving_id)
    {
        $this->db->where("saving_id",$saving_id);        
        $this->db->set('saving_status','1');
        $this->db->update('saving');
        return $this->db->get("saving");
    }

    // pagination functions
    public function get_total()
    {
        return $this->db->count_all("saving");
    }

    public function get_saving($limit, $start) 
    {   
        $where = "deleted = 0";
        $this->db->where($where);
        $this->db->limit($limit, $start);
        $query = $this->db->get("saving");
         return  $query;
           
    }
    // Search function
    public function get_results($search_term='default')
    {
        // Use the Active Record class for safer queries.
        $this->db->select('*');
        $this->db->from('saving');
        $this->db->like('saving_amount',$search_term);
        $this->db->or_like('approved_amount', $search_term);

        // Execute the query.
        $query = $this->db->get();

        // Return the results.
        return $query->result_array();
    }

    // retrieve undeleted and active saving types
    public function get_saving_type_details_active(){
        $where = array(
            'deleted' => 0,
            'saving_type_status' => 1
        );
        $this->db->where($where);
        $query = $this->db->get("saving_type");
         return  $query;
    }
    
}
