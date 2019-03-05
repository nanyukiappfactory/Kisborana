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
		<?php echo form_open_multipart($this->uri->uri_string()); ?>
		<div class="form-group">
			<label for='loan_type_name'>Loan Type Name: </label>
			<input type="text" name="loan_type_name" class="form-control" required value="<?php echo set_value('loan_type_name')?>"> </div>
		<div class="form-row">
			<div class="form-group col-md-3">
				<label for='maximum_loan_amount'>Maximum loan amount: </label>
				<input type="text" name="maximum_loan_amount" class="form-control" value="<?php echo set_value('maximum_loan_amount')?>">
			</div>
			
			<div class="form-group col-md-3">
				<label for='minimum_loan_amount'>Minimum loan amoun: </label>
				<input type="number" name="minimum_loan_amount" class="form-control" value="<?php echo set_value('minimum_loan_amount')?>">
			</div>
			<div class="form-group col-md-3">
				<label for='custom_loan_amount'>Custom loan amount: </label>
				<input type="number" name="custom_loan_amount" class="form-control" value="<?php echo set_value('custom_loan_amount')?>">
			</div>
		</div>
		<div class="form-row">
			<div class="form-group col-md-3">
				<label for='maximum_number_of_installments'>Maximum number of installments: </label>
				<input type="number" name="maximum_number_of_installments" class="form-control" value="<?php echo set_value('maximum_number_of_installments')?>">
			</div>
			<div class="form-group col-md-3">
				<label for='minimum_number_of_installments'>Minimum number of installments: </label>
				<input type="number" name="minimum_number_of_installments" class="form-control" value="<?php echo set_value('minimum_number_of_installments')?>">
			</div>
			<div class="form-group col-md-3">
				<label for='custom_number_of_installments'>Custom number of installments: </label>
				<input type="number" name="custom_number_of_installments" class="form-control" value="<?php echo set_value('custom_number_of_installments')?>">
			</div>
		</div>
		<div class="form-row">
			<div class="form-group col-md-3">
				<label for='maximum_number_of_guarantors'>Maximum number of guarantors: </label>
				<input type="numbert" name="maximum_number_of_guarantors" class="form-control" value="<?php echo set_value('maximum_number_of_guarantors')?>">
			</div>
			<div class="form-group col-md-3">
				<label for='minimum_number_of_guarantors'>Minimum number of guarantors: </label>
				<input type="number" name="minimum_number_of_guarantors" class="form-control" value="<?php echo set_value('minimum_number_of_guarantors')?>">
			</div>
			<div class="form-group col-md-3">
				<label for='custom_number_of_guarantors'>Custom number of guarantors: </label>
				<input type="number" name="custom_number_of_guarantors" class="form-control" value="<?php echo set_value('custom_number_of_guarantors')?>">
			</div>
		</div>
		<div class="form-group">
			<div>
				<label for='interest_rate'>Interest rate: </label>
				<input type="number" step="0.01" name="interest_rate" class="form-control" value="<?php echo set_value('interest_rate')?>">
			</div>
		</div>
		<div class="row">
			</br>
		</div>
		<div class="form-group col-md-3">
			<input type="submit" value="Add Loan Type" class="btn btn-primary">
		</div>
		<?php echo form_close(); ?>
	</div>
</div>
</div>