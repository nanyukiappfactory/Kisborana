<div class="card">
	<div class="card-body">
		<?php echo form_open_multipart($this->uri->uri_string()); ?>
		
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
				<label for='saving_type_details'>Saving Type:</label>
			</div>
			<div class="form-group col-sm-8">
				<select class="form-control" name="saving_type_name"  id="selectBox" onchange="changeFunc();" required="required">
					<?php 
					foreach($saving_type_details->result() as $row){
						$saving_type_name = $row->saving_type_name;
						$saving_type_id = $row->saving_type_id;
						$saving_amnt =$row->saving_amount;												
						$status = $row->saving_type_status;						
						?>
						<option value="<?php  echo $saving_type_id;?>"><?php echo $saving_type_name;?></option>						
					<?php
					}
					?>
				</select>
			</div>
		</div>		
		<div class="form-group" style  = "margin-top: 10px;">
			<div class="form-group col-md-2">
				<label for='saving_amount'>Shares Amount: </label>
				</div>
				<div class="form-group col-sm-8">
				<input type="number" name="saving_amount" class="form-control">
			</div>
			</div> 			
			<div class="form-group" style  = "margin-top: 10px;">
			<input type="submit" value="Add Shares" class="btn btn-primary">
		</div>
		<?php echo form_close(); ?>
	</div>
</div>
</div>


