<div class="card">
	<div class="card-body">
		<?php echo form_open_multipart($this->uri->uri_string()); ?>	
		<div class="form-group">
			<label for="member_national_id"><b>National id</b></label>
			<input type="number" name="member_national_id" class="form-control form-control-lg inputform">
		</div>
		<div class="form-group">
			<label for="first_name"><b>First Name</b></label>
			<input type="text" name="firstname" class="form-control form-control-lg inputform">
		</div>
		<div class="form-group">
			<label for="last_name"><b>Last Name</b></label>
			<input type="text" name="lastname" class="form-control form-control-lg inputform">
		</div>

		<div class="form-group">
			<label for="Bank"><b>Select Bank</b></label>
			<select name="bank_name" id="bank_details" class="form-control form-control-lg inputform">
				<?php 
                foreach($bank_details->result() as $row){
                  $bank_name =  $row->bank_name;
                  $bank_id =  $row->bank_id;
                  // echo $bank_name;
                
                ?>
				<option value="<?php echo $bank_id; ?>">
					<?php echo $bank_name; ?>
				</option>
				<?php } ?>
			</select>
		</div>

		<div class="form-group">
			<label for="Employer"><b>Select Employer</b></label>
			<select name="employer_name" id="employer_details" class="form-control form-control-lg inputform">
				<?php 
                foreach($employer_details->result() as $row){
                  $employer_name =  $row->employer_name;
                  $employer_id =  $row->employer_id;
                ?>
				<option value="<?php echo $employer_id; ?>">
					<?php echo $employer_name; ?>
				</option>
				<?php } ?>
			</select>
		</div>
		<div class="form-group">
			<label for="email"><b>Email Address</b></label>
			<input type="email" name="email" class="form-control form-control-lg inputform" />
		</div>
		<div class="form-group">
			<label for="phone_number"><b>Phone number</b></label>
			<input type="text" name="phone_number" class="form-control form-control-lg inputform" />
		</div>
		<div class="form-group">
			<label for="account_number"><b>Account number</b></label>
			<input type="number" name="account_number" class="form-control form-control-lg inputform" />
		</div>
		<div class="form-group">
			<label for="postal_address"><b>Postal address</b></label>
			<input type="text" name="postal_address" class="form-control form-control-lg inputform" />
		</div>
		<div class="form-group">
			<label for="postal_code"><b>Postal code</b></label>
			<input type="number" name="postal_code" class="form-control form-control-lg inputform" />
		</div>
		<!-- <div class="form-group">
			<label for="member_number"><b>Member number</b></label>
			<input type="number" name="member_number" class="form-control form-control-lg inputform" />
		</div> -->
		<div class="form-group">
			<label for="member_payroll_number"><b>Member Payroll number</b></label>
			<input type="number" name="member_payroll_number" class="form-control form-control-lg inputform" />
		</div>
		<div class="form-group">
			<label for="location"><b>Location</b></label>
			<input type="text" name="location" class="form-control form-control-lg inputform">
		</div> <br>
		<div class="submit_button">
			<input class="btn btn-success" type="submit" value="Add Member" />
		</div>
		<?php echo form_close() ?>
	</div>
</div>
