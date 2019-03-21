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
                                                    <?php echo anchor("loan-types/edit-loan-types/" . $id, '<i class="fas fa-edit"></i>', "class ='btn btn-info btn-sm'"); ?>
                                                </td>
                                                <td>
                                                    <?php echo anchor("delete-loan-types/" . $id, "<i class='fas fa-trash-alt'></i>", array("onclick" => "return confirm('Are you sure you want to delete?')", "class" => "btn btn-danger btn-sm")); ?>
                                                </td>
                                                <td>
                                                    <?php
                                                        if ($check == '1') 
                                                        {
                                                            echo anchor("deactivate-loan-types/" . $id, "<i class='far fa-thumbs-down'></i>", array('onclick' => "return confirm('Do you want to deactivate this record')", 'class' => "btn btn-danger btn-sm"));
                                                        } 
                                                        else 
                                                        {
                                                            echo anchor("activate-loan-types/" . $id, "<i class='far fa-thumbs-up'></i>", array('onclick' => "return confirm('Do you want to activate this record')", 'class' => "btn btn-success btn-sm"));
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