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

echo form_open('loan_types/execute_search');

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
                <?php echo anchor("member/new_member", "Add Member", array("class"=>"btn btn-primary btn-sm")); ?>

                <?php echo anchor("member/bulk_registration/", "Bulk Registration", array("class" => "btn btn-success btn-sm")); ?>
            </div>

        </div>
        <?php echo form_close() ?>
        <table class="table table-condensed table-striped table-sm table-bordered">
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>National ID</th>
                <th>Email</th>
                <th>Location</th>
                <th>Member Number</th>
                <th>Member Payroll Number</th>
                <th>Employer Name</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Registration Date</th>
                <th colspan="4" style="text-align:center">Actions</th>


            </tr>
            <?php
            if ($all_members->num_rows() > 0) {
                
                $count = 0;
                foreach ($all_members->result() as $row) {
                    $count++;
                    $id = $row->member_id;
                    $first_name = $row->member_first_name;
                    $last_name = $row->member_last_name;
                    $national_id = $row->member_national_id;
                    $email = $row->member_email;
                    $location = $row->member_location;
                    $member_number = $row->member_number;
                    $member_payroll_number = $row->member_payroll_number;
                    $employer = $row->employer_id;
                    $phone_number = $row->member_phone_number;
                    $status = $row->member_status;
                    $created_on = $row->created_on;
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
                    <?php echo $email; ?>
                </td>
                <td>
                    <?php echo $location; ?>
                </td>
                <td>
                    <?php echo $member_number; ?>
                </td>
                <td>
                    <?php echo $member_payroll_number; ?>
                </td>
                <td>
                    <?php foreach($employer_details->result() as $row){
                        $employer_name = $row->employer_name;
                        $employer_id = $row->employer_id;

                        if ($employer == $employer_id){
                            echo $employer_name;
                        } 
                    } ?>
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
                                            <th scope="col">Employer Name</th>
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
                                                <?php echo $employer_name; ?>
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
                                                <?php echo anchor("member/member/display_edit_form/" . $id, '<i class="fas fa-edit"></i>', "class ='btn btn-info btn-sm'"); ?>
                                            </td>

                                            <td>
                                                <?php echo anchor("member/member/delete_member/" . $id, "<i class='fas fa-trash-alt'></i>", array("onclick" => "return confirm('Are you sure you want to delete?')", "class" => "btn btn-danger btn-sm")); ?>
                                            </td>

                                            <td>
                                                <?php if( $status  == 1){
                                            echo anchor("member/member/deactivate/" . $id, "<i class='far fa-thumbs-down'></i>", "class ='btn btn-danger btn-sm'");
                                            }
                                            else{
                                                echo anchor("member/member/activate/" . $id, "<i class='far fa-thumbs-up'></i>", "class ='btn btn-primary btn-sm'");
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
                    <?php echo anchor("member/member/display_edit_form/" . $id, "<i class='fas fa-edit'></i>", "class ='btn btn-info btn-sm'"); ?>
                    </td>
                    <td>
                    <?php echo anchor("member/member/delete_member/" . $id, "<i class='fas fa-trash-alt'></i>", array("onclick" => "return confirm('Are you sure you want to delete?')", "class" => "btn btn-danger btn-sm")); ?>
                    </td>

                    <td>
                    <?php if( $status  == 1){
                        echo anchor("member/member/deactivate/" . $id, "<i class='far fa-thumbs-down'></i>", "class ='btn btn-danger btn-sm'");
                    }
                    else{
                        echo anchor("member/member/activate/" . $id, "<i class='far fa-thumbs-up'></i>", "class ='btn btn-primary btn-sm'");
                    }?>
                </td>


            </tr>


            <?php
                }
                }

                ?>
        </table>

        <!-- pagination -->
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
        <!-- end of pagination -->
    </div>
</div>
</div>