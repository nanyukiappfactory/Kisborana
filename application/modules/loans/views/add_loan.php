<div class="card">
	<div class="card-body">
		<?php echo form_open_multipart($this->uri->uri_string()); ?>
		<div class="form-group " style  = "margin-top: 10px; ">
			<div class="form-group col-sm-2">
				<label for='loan_stage_details'>Loan Stage:</label>
			</div>
			<div class="form-group col-sm-3">
			
			

				<select class="form-control" name="loan_stage" single id="loan_stage">
					
				<?php 
					foreach($loan_stage_details->result() as $row){
						$loan_stage_name = $row->loan_stage_name;
						$loan_stage_id = $row->loan_stage_id;
						
						?>
						<option value="<?php echo $loan_stage_id; ?>"><?php echo $loan_stage_name;?></option>
						
					<?php
					}
					?>
				</select>
			</div>
			</div>

		<div class="form-group" style  = "margin-top: 10px;">
			<div class="form-group col-sm-2">
				<label for='member_details'>Member:</label>
			</div>
			<div class="form-group col-sm-8">
			


				<select class="form-control custom-select2" name="member_name" single id="member_details">
					<?php 
						foreach($member_details->result() as $row)
						{
							$member_first_name = $row->member_first_name;
							$member_last_name = $row->member_last_name;
							$member_id = $row->member_id;
							
					
						
					?>
					<option value = "<?php echo $member_id; ?>">
					<?php echo $member_first_name. " ".$member_last_name;?>
					</option>
					<?php  } ?>
				</select>
			</div>
			</div>

			<div class="form-group" style  = "margin-top: 10px;">
			<div class="form-group col-sm-2">
				<label for='loan_type_details'>Loan Type:</label>
			</div>
			<div class="form-group col-sm-8">
				<select class="form-control" name="loan_type_name"  id="selectBox" onchange="changeFunc();" required="required">
					<?php 
					foreach($loan_type_details->result() as $row){
						$loan_type_name = $row->loan_type_name;
						$loan_type_id = $row->loan_type_id;
						$loan_amnt =$row->maximum_loan_amount;
						$loan_min_amnt =$row->minimum_loan_amount;
						$loan_cust_amnt =$row->custom_loan_amount;
						$maximum_number_of_inst =$row->maximum_number_of_installment;
						$minimum_number_of_inst =$row->minimum_number_of_installment;
						$custom_number_of_inst =$row->custom_number_of_installment;
						$maximum_number_of_guarantor =$row->maximum_number_of_guarantors;
						$mimimum_number_of_guarantor =$row->minimum_number_of_guarantors;
						$custom_number_of_guarantor =$row->custom_number_of_guarantors;
						
						
						$status = $row->loan_type_status;

						
						?>
						<option value="<?php echo 'Max Loan Amount: '. $loan_amnt; echo " ";  echo 'Min Loan Amount: '.$loan_min_amnt; echo " ";  echo 'Custom Loan Amount: '.$loan_cust_amnt; echo ' '; echo 'Max Guarantors: '.$maximum_number_of_guarantor; echo ' '; echo 'Min Guarantors: '.$mimimum_number_of_guarantor;?>"><?php echo $loan_type_name;?></option>
						

					<?php
					}
					?>

				</select>
				<div class="container" id="display" style="display:none;">
				<table id ="loan_type_details" class="table table-sm table-condensed table-striped table-sm table-bordered">
				<th>Selected Loan Type Details</th>
				<td ></td>				
				</table>
				</div>
			</div>
		</div>

		
		
		<div class="form-group" style  = "margin-top: 10px;">
			<div class="form-group col-md-2">
				<label for='loan_amount'>Loan amount: </label>
				</div>
				<div class="form-group col-sm-8">
				<input type="number" name="loan_amount" class="form-control">
			</div>
			</div> 

			<div class="form-group" style  = "margin-top: 10px;">
			<div class="form-group col-md-2">
				<label for='installment_period'>Installment Period: </label>
				</div>
				<div class="form-group col-sm-8">
				<input type="number" name="installment_period" class="form-control">
			</div>
			</div> 

			<!-- <div class="form-group" style  = "margin-top: 10px;">
			<div class="form-group col-md-2">
				<label for='loan_number'>Loan Number: </label>
				</div>
				<div class="form-group col-sm-8">
				<input type="number" name="loan_number" class="form-control">
			</div>
			</div>  -->

			<div class="form-group" style  = "margin-top: 10px;">
			<div class="form-group col-md-2">
				<label for='member_salary'>Member Salary: </label>
				</div>
				<div class="form-group col-sm-8">
				<input type="number" name="member_salary" class="form-control">
			</div>
			</div> 

			
			<div class="form-group" style  = "margin-top: 10px;">
			<div class="form-group col-sm-2">
				<label for='member_details'>Guarantor 1:</label>
			</div>
			<div class="form-group col-sm-3">
				<select class="form-control custom-select2" name="guarantor_name" single id="guarantor_details">
					<?php 
						foreach($member_details->result() as $row)
						{
							$member_first_name = $row->member_first_name;
							$member_last_name = $row->member_last_name;
							$member_id = $row->member_id;
							
					
						
					?>
					<option value = "<?php echo $member_id; ?>">
					<?php echo $member_first_name. " ".$member_last_name;?>
					</option>
					<?php  } ?>
				</select>
				
				
			</div>
			<div class="form-group col-md-2">
				<label for='loan_amount'>Guaranteed Amount: </label>
				</div>
				<div class="form-group col-sm-3">
				<input type="number" name="guaranteed_amount" class="form-control">				
			</div>			
			</div>
			
			
			<div class="form-group" style  = "margin-top: 10px;">
			<input type="submit" value="Next" class="btn btn-primary">
		</div>
		<?php echo form_close(); ?>
	</div>
</div>
</div>


