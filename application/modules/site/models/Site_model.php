<?php
 Class Site_model extends CI_Model
 {
    public function display_page_title()
    {
        //explode is converting to an array
      $page = explode("/",uri_string());
      $total = count($page);
      $last = $total - 1;
      //last item in url
      $name = $this->site_model->decode_web_name($page[$last]);
      
      if(is_numeric($name))
      {
        $last = $last - 1;
        $name = $this->site_model->decode_web_name($page[$last]);
      }
      $page_url = ucwords(strtolower($name));
      
      return $page_url;
    }
    public function decode_web_name($web_name)
  {
    $field_name = str_replace("-", " ", $web_name);
    
    return $field_name;
  }

  //getting total number of rows for loan types
  public function get_count_loan_types($table)
  {
    $total_loan_types = $this->db->count_all_results($table);
    return $total_loan_types;
  }

  public function get_all_results($table,$limit_per_page, $start_index)
    {
        
        //$this->db->where($where);
        $this->db->limit($limit_per_page, $start_index);
        $query = $this->db->get($table);
        return $query;

    }
  
 }

?>