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
<table style="width: 100%; margin-top: 10px;">
<tr>
<td>
<div style= "display: flex; justify-content: flex-start;">
<h1 style="font-family: 'PT Serif', serif; font-size: 20pt;">Loans </h1>
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
<?php echo anchor("loans/new_loan", "Add Loan", array("class" => "btn btn-primary btn-sm")); ?>

<?php echo anchor("loans/bulk_registration/", "Bulk Registration", array("class" => "btn btn-success btn-sm")); ?>
</div>	
<div class="table-responsive">
<table class="table table-sm table-condensed table-striped table-sm table-bordered">
	<tr>
		<th>#</th>
		<th>Member</th>
		<th>Loan Status</th>
		<th>Loan Type</th>
		<th>Loan Stage</th>
		<th>Loan Amount</th>		
		<th>Installment Period</th>		
		<th>Loan Number</th>
		<th>Member Salary</th>
		<!-- <th>Gaurantors</th>	 -->
		<th>Actions</th>				
		
	</tr>
	<?php
	
			$count = $page;
			if($all_loans->num_rows() > 0){
			foreach ($all_loans->result() as $row) {
			$count++;
			$id = $row->loan_id;
			$name = $row->member_id;
			$loan_name = $row->loan_type_id;
			$loan_stage = $row->loan_stage_id;
			$loan_amount = $row->loan_amount;
			$installment_period =$row->installment_period;
			$loan_number = $row->loan_number;
			$member_salary = $row->member_salary;
			
			
			$check = $row->loan_status;
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
		
		<td>
		<?php 
			
			foreach($loan_type_details->result() as $row){
				$loan_type_name = $row->loan_type_name;
				$loan_type_id = $row->loan_type_id;
				

							if ($loan_name == $loan_type_id){
								echo $loan_type_name;
							} 
							
							
						}?>
		</td>
		<td>
			<?php foreach($loan_stage_details->result() as $row){
						$loan_stage_name = $row->loan_stage_name;
						$loan_stage_id = $row->loan_stage_id;

						if ($loan_stage==$loan_stage_id){
							echo $loan_stage_name;
						}
			 } ?>
		</td>
		<td>
			<?php echo $loan_amount; ?>
		</td>
		<td>
			<?php echo $installment_period ; ?>
		</td>
		<td>
			<?php echo $loan_number ; ?>
		</td>
		<td>
			<?php echo $member_salary; ?>
		</td>

		<!-- modal -->
		<td>                  

                    <a href="#individualSaving_type<?php echo $id; ?>" class="btn btn-success btn-sm" data-toggle="modal" data-target="#individualSaving_type<?php echo $id; ?>"><i class="far fa-eye"></i></a>
                    <!-- Modal -->
                    <div class="modal fade" id="individualSaving_type<?php echo $id; ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><?php echo  "Loan"?> Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    </div>

                    <div class="modal-body">
                    <!-- modal body -->
                    <table class="table table-sm">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col"> </th>
                            <th scope="col"> </th>
                            <th scope="col"> </th>
                            <th scope="col"> </th>
                            <th scope="col"> </th>
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
                                 echo "<button class='badge badge-success far fa-thumbs-up'> Active</button>";
                                }
                                ?>

                            </td>

                            <td>

                                <?php echo anchor("saving_type/saving_type/update_saving_type/" . $id, '<i class="fas fa-edit"></i>', "class ='btn btn-info'"); ?>

                            </td>

                            <td>
                                <?php echo anchor("saving_type/saving_type/delete_saving_type" . $id, "<i class='fas fa-trash-alt'></i>", array("onclick" => "return confirm('Are you sure you want to delete?')", "class" => "btn btn-danger")); ?>

                            </td>

                            <td>
                                <?php
                                if ($check == 0) {
                                    echo anchor("saving_type/saving_type/activate_saving_type/" . $id, "<i class='far fa-thumbs-up'></i>", array("onclick" => "return confirm('Are you sure you want to activate?')", "class" => "btn btn-success btn-sm"));
                                } else {
                                    echo anchor("saving_type/saving_type/deactivate_saving_type/" . $id, "<i class='far fa-thumbs-down'></i>", array("onclick" => "return confirm('Are you sure you want to deactivate?')", "class" => "btn btn-danger btn-sm"));
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