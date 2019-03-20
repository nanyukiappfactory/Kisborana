<div class="card">
    <div class="card-body">
        <div class="container">
            <?php
                $success = $this->session->flashdata("success_message");
                $error = $this->session->flashdata("error_message");
                if(!empty($success)) 
                {
            ?>
            <div class="alert alert-success" role="alert">
                <?php
                    echo $success; 
                }
                ?>
            </div>
                <?php               
                    if(!empty($error)) 
                    {
                ?>
            <div class="alert alert-dark" role="alert">
                <?php
                    echo $error;                     
                }
                ?>
            </div>
            <table style="width: 100%; margin-top: 10px;">
                <tr>
                    <td>
                        <div style="display: flex; justify-content: flex-start;">
                            <h1 style="font-family: 'PT Serif', serif; font-size: 30pt;">Loan Types </h1>
                        </div>
                    </td>
                    <td>
                        <div style="display: flex; justify-content: flex-end;">
                            <form action="<?php echo site_url('loan_types/execute_search');?>" method = "post">
                                <input type="text" name = "search" />
                                <input type="submit" value = "Search" class="btn btn-secondary btn-sm"/>
                            </form>
                        </div>
                        <div style="display: flex; justify-content: flex-end;"> 
                                                     
                                <?php echo anchor("loan-types/close-search", "Exit Search"); ?>
                        </div>
                    </td>
                </tr>
            </table>
            <br></br>
        <div style="padding-bottom: 8px;">
            <?php echo anchor("loan-types/add-loan-types", "Add loan type", array("class" => "btn btn-primary btn-sm")); ?>
            <?php echo anchor("loan-types/import-loan-types", "Bulk Registration", array("class" => "btn btn-success btn-sm")); ?>
        </div>
        <div class="table-responsive">
            <table class="table table-sm table-condensed table-striped table-sm table-bordered">
                <tr>
                    <th>#</th>
                    <th><a href="<?php echo site_url() . 'loan-types/all-loan-types/loan_type_name/' . $order_method . '/' . $page ?>">Loan
                        Name</a>
                    </th>
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
                    <?php
                        $count = $page;
                    if($all_loan_types->num_rows() > 0) {
                        foreach($all_loan_types->result() as $row) {
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
                    ?>
                <tr>
                    <td>
                        <?php echo $count; ?>
                    </td>
                    <td>
                        <?php echo $name; ?>
                    </td>
                    <td>
                        <?php
                            if ($check == 0) {
                                echo "<button class='badge badge-danger far fa-thumbs-down'> Inactive</button>";
                            } 
                            else 
                            {
                                echo "<button class='badge badge-success far fa-thumbs-up'> Active</button>";
                            }
                        ?>
                    </td>
                    <td>
                        <?php echo $max_loan; ?>
                    </td>
                    <td>
                        <?php echo $min_loan; ?>
                    </td>
                    <td>
                        <?php echo $custom_loan; ?>
                    </td>
                    <td>
                        <?php echo $max_instal; ?>
                    </td>
                    <td>
                        <?php echo $min_instal; ?>
                    </td>
                    <td>
                        <?php echo $custom_instal; ?>
                    </td>
                    <td>
                        <?php echo $max_guar; ?>
                    </td>
                    <td>
                        <?php echo $min_guar; ?>
                    </td>
                    <td>
                        <?php echo $custom_guar; ?>
                    </td>
                    <td>
                        <?php echo $interest; ?>
                    </td>
                    <td>
                        <a href="#individualSaving_type<?php echo $id; ?>" class="btn btn-success btn-sm"
                            data-toggle="modal" data-target="#individualSaving_type<?php echo $id; ?>"><i
                                class="far fa-eye"></i></a>
                        <!-- Modal -->
                        <div class="modal fade" id="individualSaving_type<?php echo $id; ?>" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel"><?php echo $name; ?>'s Details
                                        </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    </div>
                                    <div class="modal-body">
                                        <!-- modal body -->
                                        <table class="table table-sm">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Loan Type Name</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Edit</th>
                                                <th scope="col">Delete</th>
                                                <th scope="col">Change Status</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <?php echo $count; ?>
                                                </td>
                                                <td>
                                                    <?php echo $name; ?>
                                                </td>
                                                <td>
                                                    <?php
                                                        if ($check == 0) 
                                                        {
                                                            echo "<button class='badge badge-danger far fa-thumbs-down'>Inactive</button>";
                                                        } 
                                                        else 
                                                        {
                                                            echo "<button class='badge badge-primary far fa-thumbs-down'>Active</button>";
                                                        }
                                                    ?>
                                                </td>
                                                <td>
                                                    <?php echo anchor("loan_types/edit/" . $id, '<i class="fas fa-edit"></i>', "class ='btn btn-info btn-sm'"); ?>
                                                </td>
                                                <td>
                                                    <?php echo anchor("loan_types/delete/" . $id, "<i class='fas fa-trash-alt'></i>", array("onclick" => "return confirm('Are you sure you want to delete?')", "class" => "btn btn-danger btn-sm")); ?>
                                                </td>
                                                <td>
                                                    <?php
                                                        if ($check == '1') 
                                                        {
                                                            echo anchor("loan_types/deactivate/" . $id, "<i class='far fa-thumbs-down'></i>", array('onclick' => "return confirm('Do you want to deactivate this record')", 'class' => "btn btn-danger btn-sm"));
                                                        } 
                                                        else 
                                                        {
                                                            echo anchor("loan_types/activate/" . $id, "<i class='far fa-thumbs-up'></i>", array('onclick' => "return confirm('Do you want to activate this record')", 'class' => "btn btn-success btn-sm"));
                                                        }
                                                        ?>
                                                </td>
                                            </tr>
                                        </table>
                                        <!-- end of modal body -->
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary"
                                            data-dismiss="modal">Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <?php echo anchor("loan-types/edit-loan-types/$id", '<i class="fas fa-edit"></i>', array('onclick' => "return confirm('Are you sure you want to edit?')", 'class' => "btn btn-info btn-sm")); ?>
                    </td>
                    <td>
                        <?php
                            if ($check == '1') 
                            {
                                echo anchor("deactivate-loan-types/$id", "<i class='far fa-thumbs-down'></i>", array('onclick' => "return confirm('Do you want to deactivate this record')", 'class' => "btn btn-danger btn-sm"));
                            } 
                            else 
                            {
                                echo anchor("activate-loan-types/$id", "<i class='far fa-thumbs-up'></i>", array('onclick' => "return confirm('Do you want to activate this record')", 'class' => "btn btn-success btn-sm"));
                            }
                        ?>
                    </td>
                    <td>
                        <?php
                            echo anchor("delete-loan-types/$id", "<i class='fas fa-trash-alt'></i>", array('onclick' => "return confirm('Do you want to delete this record')", 'class' => "btn btn-danger btn-sm"), img('assets/images/lock.png')); 
                        ?>
                    </td>
                </tr>
                    <?php 
                        }
                        }
                    ?>
            </table>
        </div>
            <?php 
                echo $links; 
            ?>
        </div>
    </div>
</div>