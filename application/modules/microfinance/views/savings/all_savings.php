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

echo form_open('savings/execute_search');

?>
<table style="width: 100%; margin-top: 10px;">
<tr>
<td>
<div style= "display: flex; justify-content: flex-start;">
<h1 style="font-family: 'PT Serif', serif; font-size: 20pt;">Shares </h1>
</div>
</td>
<td>
<div style= "display: flex; justify-content: flex-end;" >
    <?php
echo form_input(array('name' => 'search', 'placeholder' => 'search', 'aria-label' => 'Search', 'class' => 'form-control col-md-3'));
?>
<div class = "input-group-append">
    <?php
echo form_submit('search_submit', 'Search', array('class' => 'btn-secondary btn-sm'));

?>
</div>
</div>
</td>
</tr>
</table>
<br></br>
<div style="padding-bottom: 8px;">
<?php echo anchor("saving/add-saving", "Add saving", array("class" => "btn btn-primary btn-sm")); ?>

<?php echo anchor("savings/bulk_registration/", "Bulk Registration", array("class" => "btn btn-success btn-sm")); ?>
</div>	
<div class="table-responsive">
<table class="table table-sm table-condensed table-striped table-sm table-bordered">
	<tr>
		<th>#</th>
		<th>Member</th>		
		<th>Saving Type</th>
        <th>Shares</th>	
        <th>Saving Status</th>
			
		
		<th>Actions</th>				
		
	</tr>
	<?php
	
			$count = $page;
			if($all_savings->num_rows() > 0){
			foreach ($all_savings->result() as $row) {
			$count++;
			$id = $row->saving_id;
			$name = $row->member_id;
			$saving_name = $row->saving_type_id;
            $saving_amount = $row->saving_amount;
            $check = $row->saving_status;
			?>
	<tr>
		<td >
			<?php echo $count; ?>
		</td>
		<td>
			<?php 
			
			foreach($member_details->result() as $row)
						{
							$member_first_name = $row->member_first_name;
							$member_last_name = $row->member_last_name;
							$member_id = $row->member_id;

							if ($name == $member_id){
								echo $member_first_name. " ".$member_last_name;
							} 
							
							
						}?>
		</td>		
		<td>
		<?php 
			
            foreach($saving_type_details->result() as $row)
            {
                $saving_type_name = $row->saving_type_name;
                $saving_type_id = $row->saving_type_id;

                if ($saving_name == $saving_type_id){
                    echo $saving_type_name;
                } 
                
            }?>
		</td>
		<td>
			<?php echo $saving_amount; ?>
		</td>
        <td>
		<?php 
				if($check == '1'){ ?>
					<div class="badge badge-primary">
					<?php
					echo "Active";
					?>
					</div>
					<?php
				}						
				else
				{ ?>
				<div class="badge badge-danger">
				<?php
				echo "Inactive";
				?>
				</div>
				<?php
				}				
				?>
		</td>

		<!-- modal -->
		<td>                  

                    <a href="#individualSaving_type<?php echo $id; ?>" class="btn btn-success btn-sm" data-toggle="modal" data-target="#individualSaving_type<?php echo $id; ?>"><i class="far fa-eye"></i></a>
                    <!-- Modal -->
                    <div class="modal fade" id="individualSaving_type<?php echo $id; ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><?php echo  "Saving"?> Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    </div>

                    <div class="modal-body">
                    <!-- modal body -->
                    <table class="table table-sm">
                        <tr>
                            <th>#</th>
                            <th>Member</th>		
                            <th>Status</th>
                            <th>Edit</th>	
                            <th>Delete</th>
                            <th>Change Status</th>
                            </tr>

                        <tr>
                            <td>
                            <?php echo $count; ?>
                            </td>

                            <td>
                            <?php 
                                foreach($member_details->result() as $row){
                                    $member_first_name = $row->member_first_name;
                                    $member_last_name = $row->member_last_name;
                                    $member_id = $row->member_id;
                                    if($name==$member_id){
                                        if ($name == $member_id){
                                            echo $member_first_name. " ".$member_last_name;
                                        } 
                                    }

                                }
                            ?>
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

                                <?php echo anchor("microfinance/savings/edit_saving/" . $id, '<i class="fas fa-edit"></i>', "class ='btn btn-info'"); ?>

                            </td>

                            <td>
                                <?php echo anchor("saving_type/saving_type/delete_saving_type" . $id, "<i class='fas fa-trash-alt'></i>", array("onclick" => "return confirm('Are you sure you want to delete?')", "class" => "btn btn-danger")); ?>

                            </td>

                            <td>
                                <?php
                                if ($check == 0) {
                                    echo anchor("microfinance/savings/activate/" . $id, "<i class='far fa-thumbs-up'></i>", array("onclick" => "return confirm('Are you sure you want to activate?')", "class" => "btn btn-success btn-sm"));
                                } else {
                                    echo anchor("microfinance/savings/deactivate/" . $id, "<i class='far fa-thumbs-down'></i>", array("onclick" => "return confirm('Are you sure you want to deactivate?')", "class" => "btn btn-danger btn-sm"));
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
					</td>
		<!-- end of view modal -->
		
		
		
	</tr>
	<?php }} ?>
</table>
</div>
<?php echo $links;?>
</div>
</div>