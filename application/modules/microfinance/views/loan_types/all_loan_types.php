<?php 
    $tr_loan_types = "";    
    $count = $page;
    $select_div = "";	
    $select_div .= '<select class="form-control custom-select2" name="search" single ">';
    if($all_loan_types->num_rows() > 0)
    {
        foreach($all_loan_types->result() as $row) 
        {
            $count++;
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
            $data = array (
                "id"=>$id,
                "name"=>$name,
                "max_loan"=>$max_loan,
                "count"=>$count,
                "min_loan"=>$min_loan,
                "custom_loan"=>$custom_loan,
                "max_instal"=>$max_instal,
                "min_instal"=>$min_instal,
                "custom_instal"=>$custom_instal,
                "max_guar"=>$max_guar,
                "min_guar"=>$min_guar,
                "custom_guar"=>$custom_guar,
                "interest"=>$interest,
                "check"=>$check
            );
            $view_modal = $this->load->view("microfinance/loan_types/view_loan_types", $data, true); 
            if($check == 0) 
            {
                $status_activation = "<span class='badge badge-danger far fa-thumbs-down'> Inactive</button>";
                
                $change_state =  anchor("loan-types/activate-loan-types/$id", "<i class='far fa-thumbs-up'></i>", array('onclick' => "return confirm('Do you want to activate this record')", 'class' => "btn btn-success btn-sm"));                   
            } 
            else 
            {
                $status_activation = "<span class='badge badge-success far fa-thumbs-up'> Active</button>";
                $change_state = anchor("loan-types/deactivate-loan-types/$id", "<i class='far fa-thumbs-down'></i>", array('onclick' => "return confirm('Do you want to deactivate this record')", 'class' => "btn btn-danger btn-sm"));
            }
            $edit_url = "loan-types/edit-loan-types/".$id;
            $edit_icon ='<i class="fas fa-edit"></i>';
            $delete_url ="loan-types/delete-loan-types/".$id;
            $delete_icon ="<i class='fas fa-trash-alt'></i>";
            $tr_loan_types .=
            '<tr>
                <td>'.$count.'</td>
                <td>'.$name.'</td>
                <td>'.$status_activation.'</td>
                <td>'.$max_loan.'</td>
                <td>'.$min_loan.'</td>
                <td>'.$custom_loan.'</td>
                <td>'.$max_instal.'</td>
                <td>'.$min_instal.'</td>
                <td>'.$custom_instal.'</td>
                <td>'.$max_guar.'</td>
                <td>'.$min_guar.'</td>
                <td>'.$custom_guar.'</td>
                <td>'.$interest.'</td>
                <td><a href="#individualSaving_type'.$id.'" class="btn btn-success btn-sm"data-toggle="modal" data-target="#individualSaving_type'.$id.'"><i class="far fa-eye"></i></a>'.$view_modal.'</td>
                <td>'.anchor($edit_url, $edit_icon, array('onclick' => "return confirm('Are you sure you want to edit?')", 'class' => "btn btn-info btn-sm")).'</td>
                <td>'.$change_state.'</td>
                <td>'.anchor($delete_url, $delete_icon, array('onclick' => "return confirm('Do you want to delete this record')", 'class' => "btn btn-danger btn-sm"), img('assets/images/lock.png')).'</td>            
            </tr>';
            $select_div .= '<option value = "'.$name. '">'.$name.'</option>';
        } 
    $select_div .= '</select>';
    }      
?>
<div class="card">
    <div class="card-body">     
        <table style="width: 100%; margin-top: 10px;">
            <tr>
                <td>
                    <div style="display: flex; justify-content: flex-start;">
                        <h1 style="font-family: 'PT Serif', serif; font-size: 30pt;">Loan Types </h1>
                    </div>
                </td>
                <td>
                    <div style="display: flex; justify-content: flex-end;">
                        <form action="<?php echo site_url('loan-types/search-loan-types');?>" method = "post">
                            <?php echo $select_div; ?>
                            <input type="submit" value = "Search" class="btn btn-secondary btn-sm"/>
                        </form>
                    </div>
                    <div style="display: flex; justify-content: flex-end;">                                                     
                        <?php echo anchor("loan-types/close-search-loan-types", "Exit Search"); ?>
                    </div>
                </td>
            </tr>
        </table>
        <br>
        <div style="padding-bottom: 8px;">
            <?php echo anchor("loan-types/add-loan-types", "Add loan type", array("class" => "btn btn-primary btn-sm")); ?>
            <?php echo anchor("loan-types/import-loan-types", "Bulk Registration", array("class" => "btn btn-success btn-sm")); ?>
        </div>
        <div class="table-responsive">
            <table class="table table-sm table-condensed table-striped table-sm table-bordered">
                <tr>
                    <th>#</th>
                    <th><a href="<?php echo site_url() . 'loan-types/all-loan-types/loan_type_name/' . $order_method . '/' . $page ?>">Loan Name</a></th>
                    <th>Status</th>
                    <th>Max Amount</th>
                    <th>Min Amount</th>
                    <th>Custom Amount</th>
                    <th>Max Installs</th>
                    <th>Mini Installs</th>
                    <th>Custom Installs</th>
                    <th>Max Guarantors</th>
                    <th>Min Guarantors</th>
                    <th>Custom Guarantors</th>
                    <th>Interest Rate</th>
                    <th colspan="4" style="text-align:center">Actions</th>
                </tr>
                <?php echo $tr_loan_types; ?>                                
            </table>
        </div>
        <?php echo $links; ?>
    </div>
</div>