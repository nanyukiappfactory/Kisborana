<?php 
    $member_data = '';
    $select_div = "";
	$member_message = '';
    $alert_message = '';
    $count = $page;	
    $success = $this->session->flashdata("success_message");
    $error = $this->session->flashdata("error_message");  
    if(!empty($success)) 
    {
		$alert_message='<div class="alert alert-success" role="alert">'.$success.'</div>';	
	}
    if(!empty($error)) 
    {
		$alert_message='<div class="alert alert-dark" role="alert">'.$error.'</div>';
    }
    $member_message .= '<div class="container">'.$alert_message.'</div>';
    if($all_members->num_rows() > 0) 
    {
        foreach ($all_members->result() as $row) 
        {
            $count++;
            $id = $row->member_id;
            $first_name = $row->member_first_name;
            $last_name = $row->member_last_name;
            $national_id = $row->member_national_id;
            $member_number = $row->member_number;
            $member_payroll_number = $row->member_payroll_number;
            $employer = $row->employer_id;
            $phone_number = $row->member_phone_number;
            $status = $row->member_status;
            $created_on = $row->created_on;
            $share_balance = $row->member_share_balance;
            $advance_loan = $row->advance_loan;
            $development_loan = $row->development_loan;
            $emergency_loan = $row->emergency_loan;
            $school_loan = $row->school_loan;
            $data = array (
                "id"=>$id,
                "national_id"=>$national_id,
                "member_number"=>$member_number,
                "count"=>$count,
                "last_name"=>$last_name,
                "first_name"=>$first_name,
                "status"=>$status
            );
            $view_modal = $this->load->view("microfinance/members/view_members", $data, true);            
            if($status  == 1)
            { 
                $status_span = "<span class='badge badge-success far fa-thumbs-up'>Active</span>";
                
                $status_button = anchor("members/deactivate-member/$id", "<i class='far fa-thumbs-down'></i>", array("class" => 'btn btn-danger btn-sm',"onclick" => 'return confirm("Do you want to deactive")'));
            }
            else 
            {
                $status_span = "<span class='badge badge-danger far fa-thumbs-down'>Inactive</span>";
                
                $status_button = anchor("members/activate-member/$id", "<i class='far fa-thumbs-up'></i>", array("class" => 'btn btn-success btn-sm',"onclick" => 'return confirm("Do you want to active")'));
            }
            $edit_url = 'members/edit-member/'.$id;
            $edit_icon = "<i class='fas fa-edit'></i>";
            $delete_url = "members/delete-member/".$id;
            $delete_icon = "<i class='fas fa-trash-alt'></i>";

            $member_data .=
            '<tr><td>'.$count.'</td>
            <td>'.$first_name.'</td>
            <td>'.$last_name.'</td>
            <td>'.$status_span.'</td>
            <td>'.$national_id.'</td>
            <td>'.$member_payroll_number.'</td>
            <td>'.$phone_number.'</td>
            <td>'.$created_on.'</td>
            <td>'.$share_balance.'</td>
            <td>'.$advance_loan.'</td>
            <td>'.$development_loan.'</td>
            <td>'.$emergency_loan.'</td>
            <td>'.$school_loan.'</td>
            <td>
            <a href="#individualMember'.$id.'" class="btn btn-success btn-sm"
                data-toggle="modal" data-target="#individualMember'.$id.'"><i
                    class="far fa-eye"></i></a>'.$view_modal.
                    '</td>
                    <td>'.anchor($edit_url, $edit_icon, array('onclick' => "return confirm('Are you sure you want to edit?')", 'class' => "btn btn-info btn-sm")).'</td>
                    <td>'.$status_button.'</td>
                    <td>'.anchor($delete_url, $delete_icon, array('onclick' => "return confirm('Do you want to delete this record')", 'class' => "btn btn-danger btn-sm")).'</td>
            </tr>';
            
        }
    }
                        
?>
<div class="card">
    <div class="card-body">        
        <?php echo $member_message;?> 
        <table style="width: 100%; margin-top: 10px;">
            <tr>
                <td>
                    <div style="display: flex; justify-content: flex-start;">
                        <h1 style="font-family: 'PT Serif', serif; font-size: 20pt; align-text: center;">Sacco Members
                        </h1>
                    </div>
                </td>
                <td>
                    <div style="display: flex; justify-content: flex-end;">
                        <form action="<?php echo site_url('members/search-members');?>" method = "post">
                            <input type="text" placeholder="Search" name="search">
                            <input type="submit" value = "Search" class="btn btn-secondary btn-sm"/>
                        </form>
                    </div>
                    <div style="display: flex; justify-content: flex-end;">                                                     
                        <?php echo anchor("members/close-search-members", "Exit Search"); ?>
                    </div>
                </td>
            </tr>
        </table>
        <br>
        <div style="padding-bottom: 8px;">
            <div>
                <?php echo anchor("members/add-member", "Add Member", array("class"=>"btn btn-primary btn-sm")); ?>

                <?php echo anchor("members/import-members/", "Bulk Registration", array("class" => "btn btn-success btn-sm")); ?>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-condensed table-striped table-sm table-bordered">
                <tr>
                    <th>#</th>
                    <th><a href="<?php echo site_url().'members/all-members/member_first_name/'.$order_method.'/'.$page ?>" >First Name</a></th>
                    <th><a href="<?php echo site_url().'members/all-members/member_last_name/'.$order_method.'/'.$page ?>" >Last Name</a></th>
                    <th>Status</th>
                    <th>National ID</th>
                    <th>Member Payroll Number</th>
                    <th>Phone Number</th>
                    <th>Registration Date</th>
                    <th>Share Balance</th>
                    <th>Advance Loan</th>
                    <th>Development Loan</th>
                    <th>Emergency Loan</th>
                    <th>School Loan</th>
                    <th colspan="4" style="text-align:center">Actions</th>
                </tr>
                <?php echo $member_data;?>
            </table>
        </div>
        <?php echo $links; ?>
    </div>
</div>