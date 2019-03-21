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
                        <td><?php echo $count; ?></td>
                        <td><?php echo $name; ?></td>
                        <td>
                            <?php
                                if ($check == 0) {
                                 echo "<button class='badge badge-danger far fa-thumbs-down'> Inactive</button>";
                                } else {
                                 echo "<button class='badge badge-success far fa-thumbs-up'> Active</button>";
                                }
                            ?>
                        </td>
                        <td><?php echo anchor("saving-types/edit-saving-types/" . $id, '<i class="fas fa-edit"></i>', "class ='btn btn-info btn-sm'"); ?></td>
                        <td><?php echo anchor("saving_types/delete-saving-type/" . $id, "<i class='fas fa-trash-alt'></i>", array("onclick" => "return confirm('Are you sure you want to delete?')", "class" => "btn btn-danger btn-sm")); ?></td>
                        <td>
                            <?php
                            if ($check == 0) {
                                echo anchor("saving-types/activate-saving-type/" . $id, "<i class='far fa-thumbs-up'></i>", array("onclick" => "return confirm('Are you sure you want to activate?')", "class" => "btn btn-success btn-sm"));
                            } else {
                                echo anchor("saving-types/deactivate-saving-type/" . $id, "<i class='far fa-thumbs-down'></i>", array("onclick" => "return confirm('Are you sure you want to deactivate?')", "class" => "btn btn-danger btn-sm"));
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