<div class="card">
	<div class="card-body">
		<?php echo form_open_multipart($this->uri->uri_string()); ?>
<div class="form-group" style  = "margin-top: 10px;">
			<div class="form-group col-sm-2">
				<label for='member_details'>Guarantor 1:</label>
			</div>
			<div class="form-group col-sm-3">
				<select class="form-control" name="member_name" single id="member_details">
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
				<input type="number" name="member_salary" class="form-control">				
			</div>			
			</div>
			
			<div class="form-group" style  = "margin-top: 10px;">
			<div class="form-group col-sm-2">
				<label for='member_details'>Guarantor 2:</label>
			</div>
			<div class="form-group col-sm-3">
				<select class="form-control" name="member_name" single id="member_details">
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
				<input type="number" name="member_salary" class="form-control">				
			</div>			
			</div>

			<div class="form-group" style  = "margin-top: 10px;">
			<div class="form-group col-sm-2">
				<label for='member_details'>Guarantor 3:</label>
			</div>
			<div class="form-group col-sm-3">
				<select class="form-control" name="member_name" single id="member_details">
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
				<input type="number" name="member_salary" class="form-control">				
			</div>			
			</div>

			<div class="form-group" style  = "margin-top: 10px;">
			<div class="form-group col-sm-2">
				<label for='member_details'>Guarantor 4:</label>
			</div>
			<div class="form-group col-sm-3">
				<select class="form-control" name="member_name" single id="member_details">
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
				<input type="number" name="member_salary" class="form-control">				
			</div>			
			</div>

            <div class="form-group" style  = "margin-top: 10px;">
			<input type="submit" value="Add Loan" class="btn btn-primary">
		</div>
		<?php echo form_close(); ?>
	</div>
</div>
</div>