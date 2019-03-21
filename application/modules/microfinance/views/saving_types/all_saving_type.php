<?php  
    $success = $this->session->flashdata("success_message");
    $error = $this->session->flashdata("error_message");
    $alert ="";
    $all_alerts ="";
    if(!empty($success)) {
        
        $alert = '<div class="alert alert-success" role="alert">'.$success.'</div>';
    }
    if(!empty($error)) {            
        $alert = '<div class="alert alert-danger" role="alert">'.$error.'</div>';           
    }
    $all_alerts = '<div class="container">'.$alert.'</div>';         

    $tr_saving_types = "";
    $count = $page;    
    if ($all_saving_type) {
        foreach ($all_saving_type as $row) {
            $count++;
            $id = $row->saving_type_id;
            $name = $row->saving_type_name;
            $check = $row->saving_type_status;
            $delete = $row->deleted;
            $modal_data = array(
                "id" => $id,
                "name" => $name,
                "check" => $check,
                "delete" => $delete,
                "count" => $count,
            );
            $view_modal = $this->load->view("microfinance/saving_types/view_saving_types", $modal_data, true);
            
            if($check == 0) {
                $status_activation = "<button class='badge badge-danger far fa-thumbs-down'> Inactive</button>";
            } else {
                $status_activation = "<button class='badge badge-success far fa-thumbs-up'> Active</button>";
            }
            if($check == 0) {
                $change_state = anchor("saving-types/activate-saving-type/".$id, "<i class='far fa-thumbs-up'></i>", array("onclick" => "return confirm('Are you sure you want to activate?')", "class" => "btn btn-success btn-sm"));
            } else {
                $change_state = anchor("saving-types/deactivate-saving-type/".$id, "<i class='far fa-thumbs-down'></i>", array("onclick" => "return confirm('Are you sure you want to deactivate?')", "class" => "btn btn-danger btn-sm"));
            }

            $edit_url = "saving-types/edit-saving-types/".$id;
            $edit_icon = '<i class="fas fa-edit"></i>';
            $delete_url = "saving_types/delete-saving-type/".$id;
            $delete_icon = "<i class='fas fa-trash-alt'></i>";
            $tr_saving_types .='
            <tr>
                <td>'.$count.'</td>
                <td>'.$name.'</td>
                <td>'.$status_activation.'</td>
                <td>
                    <a href="#individualSaving_type'.$id.'" class="btn btn-success btn-sm" data-toggle="modal" data-target="#individualSaving_type' . $id . '">
                        <i class="far fa-eye"></i>
                    </a>'.$view_modal.
                '</td>
                <td>'.anchor($edit_url, $edit_icon, array('onclick' => "return confirm('Are you sure you want to edit?')", 'class' => "btn btn-info btn-sm")) . '</td>
                <td>'.anchor($delete_url, $delete_icon, array("onclick" => "return confirm('Are you sure you want to delete?')", "class" => "btn btn-danger btn-sm")) . '</td>
                <td>'.$change_state . '</td>
            </tr>'
            ;
        }
    }
?>
<div class="card">
    <div class="card-body">
      <?php echo $all_alerts;?>
        <?php echo form_open($this->uri->uri_string()) ?>
            <table style="width: 100%; margin-top: 10px;">
                <tr>
                    <td>
                        <div style="display: flex; justify-content: flex-start;">
                            <h1 style="font-family: 'PT Serif', serif; font-size: 20pt; align-text: center;">Saving Types
                            </h1>
                        </div>
                    </td>
                    <td>
                        <div style="display: flex; justify-content: flex-end;">
                            <input class="form-control col-md-3" type="text" name="search" placeholder="Search by name"
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
                    <?php echo anchor("saving-types/add-saving-type", "Add Saving Type", array("class" => "btn btn-primary btn-sm")); ?>
                    <?php echo anchor("microfinance/imports", "Import Saving Types", array("class" => "btn btn-success btn-sm")); ?>
                </div>
            </div>
        <?php echo form_close() ?>
        <table class="table table-sm table-condensed table-striped table-sm table-bordered">
            <tr>
                <!-- <th width="50px"><input type="checkbox" id="master"></th> -->
                <th scope="col">#</th>
                <th scope="col">Saving Type Name</th>
                <th scope="col">Status</th>
                <!-- <th scope="col">Actions</th> -->
                <th colspan="4" style="text-align: center;">Actions</th>
            </tr>
            <?php echo $tr_saving_types; ?>
        </table>
        <p><?php echo $links; ?></p>
    </div>
</div>
</div>
