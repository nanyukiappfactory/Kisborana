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
                                                <?php echo anchor("members/edit_member/" . $id, '<i class="fas fa-edit"></i>', "class ='btn btn-info btn-sm'"); ?>
                                            </td>

                                            <td>
                                                <?php echo anchor("members/delete_member/" . $id, "<i class='fas fa-trash-alt'></i>", array("onclick" => "return confirm('Are you sure you want to delete?')", "class" => "btn btn-danger btn-sm")); ?>
                                            </td>

                                            <td>
                                                <?php if( $status  == 1){
                                                            echo anchor("members/deactivate/" . $id, "<i class='far fa-thumbs-down'></i>", array('onclick' => "return confirm('Do you want to deactivate this record')", 'class' => "btn btn-danger btn-sm"));

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