<div class="card">
    <div class="card-body">

        <div class="container">
            <?php
$success = $this->session->flashdata("success_message");
$error = $this->session->flashdata("error_message");

if (!empty($success)) {?>
            <div class="alert alert-success" role="alert">
                <?php
echo $success; ?>
            </div>
            <?php
}

if (!empty($error)) {?>
            <div class="alert alert-dark" role="alert">
                <?php
echo $error; ?>
            </div>
            <?php
}
?>
        </div>

        <?php

echo form_open('members/execute_search');

?>

        <?php echo form_open($this->uri->uri_string()) ?>

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
                        <input class="form-control col-md-3" type="text" name="search" placeholder="Search member"
                            aria-label="Search">
                        <div class="input-group-append">
                            <input type="submit" value="Search" class="btn btn-secondary btn-sm">
                        </div>
                    </div>

                </td>
            </tr>
        </table>

        <br></br>
        <div style="padding-bottom: 8px;">


            <div>
                <?php echo anchor("members/new_member", "Add Member", array("class"=>"btn btn-primary btn-sm")); ?>

                <?php echo anchor("members/bulk_registration/", "Bulk Registration", array("class" => "btn btn-success btn-sm")); ?>
            </div>

        </div>
        <?php echo form_close() ?>
        <table class="table table-condensed table-striped table-sm table-bordered">
            <tr>
                <th>#</th>
                <th><a href="<?php echo site_url().'members/all-members/member_first_name/'.$order_method.'/'.$page ?>" >First Name</a></th>
                <th><a href="<?php echo site_url().'members/all-members/member_last_name/'.$order_method.'/'.$page ?>" >Last Name</a></th>
                <th>National ID</th>
                <th>Member Payroll Number</th>
                <th>Employer Name</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Registration Date</th>
                <th>Share Balance</th>
                <th>Advance Loan</th>
                <th>Development Loan</th>
                <th>Emergency Loan</th>
                <th>School Loan</th>
                <th colspan="4" style="text-align:center">Actions</th>
            </tr>
            <?php

$count = $page;
            if ($all_members->num_rows() > 0) {
                foreach ($all_members->result() as $row) {
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
            ?>


            <tr>
                <td>
                    <?php echo $count; ?>
                </td>
                <td>
                    <?php echo $first_name; ?>
                </td>
                <td>
                    <?php echo $last_name; ?>
                </td>
                <td>
                    <?php echo $national_id; ?>
                </td>
                <td>
                    <?php echo $member_payroll_number; ?>
                </td>
                <td>
                    <?php //foreach($employer_details->result() as $row){
                        //$employer_name = $row->employer_name;
                        //$employer_id = $row->employer_id;

                        //if ($employer == $employer_id){
                            //echo $employer_name;
                       //} 
                    //} ?>
                </td>
                <td>
                    <?php echo $phone_number; ?>
                </td>
                <td>
                    <?php if($status  == 1){ ?>
                    <span class="badge badge-success far fa-thumbs-up">Active</span>
                    <?php }
                else {?>
                    <span class="badge badge-danger far fa-thumbs-down">Inactive</span>
                    <?php }?>
                </td>
                <td>
                    <?php echo $created_on; ?>
                </td>
                <td>
                    <?php echo $share_balance; ?>
                </td>
                <td>
                    <?php echo $advance_loan; ?>
                </td>
                <td>
                    <?php echo $development_loan; ?>
                </td>
                <td>
                    <?php echo $emergency_loan; ?>
                </td>
                <td>
                    <?php echo $school_loan; ?>
                </td>

                <td>

                    <a href="#individualMember<?php echo $id;?>" class="btn btn-success btn-sm" data-toggle="modal"
                        data-target="#individualMember<?php echo $id;?>"><i class="far fa-eye"></i></a>

                    <!-- Modal -->
                    <div class="modal fade" id="individualMember<?php echo $id;?>" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content modal-lg">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">
                                        <?php echo $first_name." ".$last_name; ?></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <table class="table table-condensed table-striped table-sm table-bordered">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">National ID</th>
                                            <th scope="col">Member Number</th>
                                            <th scope="col">Member Name</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                            <th scope="col">Change Status</th>

                                        </tr>
                                        <tr>
                                            <td>
                                                <?php echo $count;?>
                                            </td>
                                            <td>
                                                <?php echo $national_id; ?>
                                            </td>
                                            <td>
                                                <?php echo $member_number; ?>
                                            </td>
                                            <td>
                                                <?php echo $last_name; ?>
                                            </td>
                                            <td>
                                                <?php if($status  == 0){ ?>
                                                <span class="badge badge-danger far fa-thumbs-down"> Inactive</span>
                                                <?php }
                                            else {?>
                                                <span class="badge badge-success far fa-thumbs-up"> Active</span>
                                                <?php }?>
                                            </td>

                                            <td>
                                                <?php echo anchor("members/edit/" . $id, '<i class="fas fa-edit"></i>', "class ='btn btn-info btn-sm'"); ?>
                                            </td>

                                            <td>
                                                <?php echo anchor("members/delete_member/" . $id, "<i class='fas fa-trash-alt'></i>", array("onclick" => "return confirm('Are you sure you want to delete?')", "class" => "btn btn-danger btn-sm")); ?>
                                            </td>

                                            <td>
                                                <?php if( $status  == 1){
                                            echo anchor("members/deactivate/" . $id, "<i class='far fa-thumbs-down'></i>", "class ='btn btn-danger btn-sm'");
                                            }
                                            else{
                                                echo anchor("members/activate/" . $id, "<i class='far fa-thumbs-up'></i>", "class ='btn btn-primary btn-sm'");
                                            }?>
                                            </td>



                                        </tr>
                                    </table>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- End of modal body -->

                    <td>
                    <?php echo anchor("members/edit/" . $id, "<i class='fas fa-edit'></i>", "class ='btn btn-info btn-sm'"); ?>
                    </td>
                    <td>
                    <?php echo anchor("members/delete/" . $id, "<i class='fas fa-trash-alt'></i>", array("onclick" => "return confirm('Are you sure you want to delete?')", "class" => "btn btn-danger btn-sm")); ?>
                    </td>

                    <td>
                    <?php if( $status  == 1){
                        echo anchor("members/deactivate/" . $id, "<i class='far fa-thumbs-down'></i>", "class ='btn btn-danger btn-sm'");
                    }
                    else{
                        echo anchor("members/activate/" . $id, "<i class='far fa-thumbs-up'></i>", "class ='btn btn-primary btn-sm'");
                    }?>
                </td>


            </tr>


            <?php
                }
               }

                ?>
        </table>
    </div>
    <?php echo $links; ?>
</div>
</div>