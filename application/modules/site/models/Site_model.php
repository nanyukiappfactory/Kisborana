<?php
class Site_model extends CI_Model
{
  public function display_page_title()
  {
    //explode is converting to an array
    $page = explode("/", uri_string());
    $total = count($page);
    $last = $total - 1;
    //last item in url
    $name = $this->site_model->decode_web_name($page[$last]);
    if (is_numeric($name)) 
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

  public function get_all_results($search_results, $table, $limit_per_page, $start_index, $where, $order_column, $order_by, $search_parameters)
  {
    if (!empty($search_results) && $search_results != null) 
    {
      $length = count($search_parameters);
      for($index = 0; $index < $length; $index ++)
      {
        $this->db->or_where($search_parameters[$index], $search_results);
      }
    }  
    else 
    {
      $this->db->where($where);
    }
    $this->db->limit($limit_per_page, $start_index);
    $this->db->order_by($order_column, $order_by);
    $query = $this->db->get($table);
    return $query;
  }
  //getting total number of rows for loan types
  public function get_count_results($table)
  {
    $where = "deleted = 0";
    $this->db->where($where);
    $total_records = $this->db->count_all_results($table);
    return $total_records;
  }
}
