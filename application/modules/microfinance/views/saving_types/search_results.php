
<div class="card">
        <div class="card-body">
    <div class ="container">

        <?php
            $success = $this->session->flashdata("success_message");
            $error = $this->session->flashdata("error_message");
            if (!empty($success)) {
        ?>
            <div class ="alert alert-success" role = "alert">
            <?php
            echo $success;
        ?>
            </div>
        <?php
            }

                if (!empty($error)) {
            ?>
            <div class ="alert alert-danger" role = "alert">
            <?php
                echo $error;
                ?>
            </div>

            <?php
                }
            ?>
    </div>

        <!-- <h1 style="font-family: 'PT Serif', serif; font-size: 20pt; align-text: center;" >Saving Types</h1> -->
        
        <?php echo form_open($this->uri->uri_string()) ?>
            
            <table style="width: 100%; margin-top: 10px;">
            <tr>
                <td>
            <div style= "display: flex; justify-content: flex-start;">
            <h1 style="font-family: 'PT Serif', serif; font-size: 20pt; align-text: center;" >Saving Types</h1>
            </div>
            </td>

            <td>
            <div style= "display: flex; justify-content: flex-end;" >
            <input class="form-control col-md-3" type="text" name = "search" placeholder="Search by name" aria-label="Search">
            <div class = "input-group-append">
            <input type = "submit" value="Search" class="btn btn-secondary btn-sm">            
            </div>            
            </div> 

            </td>
            </tr>
            </table>
            
                <br></br>
             <div style = "padding-bottom: 8px;"> 

            
            <div>   
            <?php echo anchor("saving_types/new_saving_type", "Add Saving Type", array("class"=>"btn btn-primary btn-sm")); ?>
            <?php echo anchor("saving_types/import", "Import Saving Types", array("class"=>"btn btn-success btn-sm")); ?>  
            </div>

            
        
        
        </div>

        <?php echo form_close() ?>

        <table class="table table-sm table-condensed table-striped table-sm table-bordered">
            <tr>
                <!-- <th width="50px"><input type="checkbox" id="master"></th> -->
                <th scope="col">#</th>
                <th scope="col">Saving Type Name</th>
                <th scope="col">Status</th>                
                <th scope="col">Actions</th>
                <!-- <th colspan="4" style = "text-align: center;">Actions</th> -->
                

            </tr>

            <?php
            if ($searched_saving_type->num_rows() > 0) {
                $count = 0;

                foreach ($searched_saving_type->result() as $row) {
                    $count++;
                    $id = $row->saving_type_id;
                    $name = $row->saving_type_name;
                    $check = $row->saving_type_status;
                    $delete = $row->deleted;

            ?>


                 <tr>
                <!-- <td><input type="checkbox" class="sub_chk" data-id="<?php //echo $delete ?>"></td> -->
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
                } else {
                    echo "<button class='badge badge-success far fa-thumbs-up'> Active</button>";
                }
                ?>
                 </td>

                 <td>                  

                    <a href="#individualSaving_type<?php echo $id; ?>" class="btn btn-info btn-sm" data-toggle="modal" data-target="#individualSaving_type<?php echo $id; ?>"><i class="far fa-eye"></i></a>
                    <!-- Modal -->
                    <div class="modal fade" id="individualSaving_type<?php echo $id; ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><?php echo $name; ?>'s Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    </div>

                    <div class="modal-body">
                    <!-- modal body -->
                    <table class="table table-sm">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Saving Type Name</th>
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
                                if ($check == 0) {
                                 echo "<button class='badge badge-danger far fa-thumbs-down'> Inactive</button>";
                                } else {
                                 echo "<button class='badge badge-success far fa-thumbs-down'> Active</button>";
                                }
                                ?>

                            </td>

                            <td>

                                <?php echo anchor("saving_types/saving_types/update_saving_type/" . $id, '<i class="fas fa-edit"></i>', "class ='btn btn-info'"); ?>

                            </td>

                            <td>
                                <?php echo anchor("saving_types/saving_types/delete_saving_type" . $id, "<i class='fas fa-trash-alt'></i>", array("onclick" => "return confirm('Are you sure you want to delete?')", "class" => "btn btn-danger")); ?>

                            </td>

                            <td>
                                <?php
                                if ($check == 0) {
                                    echo anchor("saving_types/saving_types/activate_saving_type/" . $id, "<i class='far fa-thumbs-up'></i>", array("onclick" => "return confirm('Are you sure you want to activate?')", "class" => "btn btn-success btn-sm"));
                                } else {
                                    echo anchor("saving_types/saving_types/deactivate_saving_type/" . $id, "<i class='far fa-thumbs-down'></i>", array("onclick" => "return confirm('Are you sure you want to deactivate?')", "class" => "btn btn-danger btn-sm"));
                                }
                                ?>
                            </td>

                    </table>            
                    </div>                

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>

                    </div>
                    </div>
                    </div>
                 
                 <!-- end of modal body -->

                 
                    <?php echo anchor("saving_types/saving_types/update_saving_type/" . $id, '<i class="fas fa-edit"></i>', "class ='btn btn-info btn-sm'"); ?>
                

                 
                    <?php echo anchor("saving_types/saving_types/delete_saving_type/" . $id, "<i class='fas fa-trash-alt'></i>", array("onclick" => "return confirm('Are you sure you want to delete?')", "class" => "btn btn-danger btn-sm")); ?>
               
                 
                 
                    <?php
                    if ($check == 0) {
                        echo anchor("saving_types/saving_types/activate_saving_type/" . $id, "<i class='far fa-thumbs-up'></i>", array("onclick" => "return confirm('Are you sure you want to activate?')", "class" => "btn btn-success btn-sm"));
                    } else {
                        echo anchor("saving_types/saving_types/deactivate_saving_type/" . $id, "<i class='far fa-thumbs-down'></i>", array("onclick" => "return confirm('Are you sure you want to deactivate?')", "class" => "btn btn-danger btn-sm"));
                    }
                    ?>
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
        <?php echo anchor("saving_types/saving_types", "Back", array("class"=>"btn btn-primary btn-sm")); ?><br></br>

    </div>
    </div>
    </div>

