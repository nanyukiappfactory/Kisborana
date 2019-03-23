<?php
	$edit_loan_type = '';
	$alert_message = '';	
	$success = $this->session->flashdata("success_message");
	$error = $this->session->flashdata("error_message");
    if(!empty($success)) 
    {
		$alert_message='<div class="alert alert-success" role="alert">'.$success.'</div>';	
	}
    if(!empty($error)) 
    {
		$alert_message='<div class="alert alert-dark" role="alert">'.$error.'</div>';
	}
	$edit_loan_type .= '<div class="container">'.$alert_message.'</div>';
?>
<div class="card">
    <div class="card-body">
		<?php echo $edit_loan_type;?>    
        <?php echo form_open_multipart('microfinance/loan_types/edit_loan_type/'.$loan_type_id, array('onsubmit' => "return confirm('Do you want to update this record')")); ?>
            <div>
                <input type="hidden" name="loan_type_id" value="<?php echo $loan_type_id; ?>">
            </div>
            <div class="form-group">
                <label for='loan_type_name'>Loan Type Name: </label>
                <input type="text" name="loan_type_name" value="<?php echo $loan_type_name; ?>" class="form-control">
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label for='maximum_loan_amount'>Maximum loan amount: </label>
                    <input type="number" name="maximum_loan_amount" id="maximum_loan_amount" onkeydown="return event.keyCode !== 69" onkeyup="maximumLoan()" value="<?php echo $maximum_loan_amount; ?>" class="form-control">
                </div>
                <div class="form-group col-md-3">
                    <label for='minimum_loan_amount'>Minimum loan amount: </label>
                    <input type="number" name="minimum_loan_amount" id="minimum_loan_amount" onkeydown="return event.keyCode !== 69" onkeyup="maximumLoan()" value="<?php echo $minimum_loan_amount; ?>" class="form-control">
                </div>
                <div class="form-group col-md-3">
                    <label for='custom_loan_amount'>Custom loan amount: </label>
                    <input type="number" name="custom_loan_amount" onkeydown="return event.keyCode !== 69" value="<?php echo $custom_loan_amount; ?>" class="form-control">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label for='maximum_number_of_installments'>Maximum number of installments: </label>
                    <input type="number" name="maximum_number_of_installments" id="maximum_number_of_installments"
                    onkeydown="return event.keyCode !== 69" onkeyup="maximumInstall()" value="<?php echo $maximum_number_of_installments; ?>" class="form-control">
                </div>
                <div class="form-group col-md-3">
                    <label for='minimum_number_of_installments'>Minimum number of installments: </label>
                    <input type="number" name="minimum_number_of_installments" id="minimum_number_of_installments"
                    onkeydown="return event.keyCode !== 69" onkeyup="maximumInstall()" value="<?php echo $minimum_number_of_installments; ?>" class="form-control">
                </div>
                <div class="form-group col-md-3">
                    <label for='custom_number_of_installments'>Custom number of installments: </label>
                    <input type="number" name="custom_number_of_installments" onkeydown="return event.keyCode !== 69"
                    value="<?php echo $custom_number_of_installments; ?>" class="form-control">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label for='maximum_number_of_guarantors'>Maximum number of guarantors: </label>
                    <input type="numbert" name="maximum_number_of_guarantors" id="maximum_number_of_guarantors"
                    onkeydown="return event.keyCode !== 69" onkeyup="maximumGuarnt()" value="<?php echo $maximum_number_of_guarantors; ?>" class="form-control">
                </div>
                <div class="form-group col-md-3">
                    <label for='minimum_number_of_guarantors'>Minimum number of guarantors: </label>
                    <input type="number" name="minimum_number_of_guarantors" id="minimum_number_of_guarantors"
                    onkeydown="return event.keyCode !== 69" onkeyup="maximumGuarnt()" value="<?php echo $minimum_number_of_guarantors; ?>" class="form-control">
                </div>
                <div class="form-group col-md-3">
                    <label for='custom_number_of_guarantors'>Custom number of guarantors: </label>
                    <input type="number" name="custom_number_of_guarantors"
                    onkeydown="return event.keyCode !== 69"  value="<?php echo $custom_number_of_guarantors; ?>" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <div>
                    <label for='interest_rate'>Interest rate: </label>
                    <input type="number" step="0.01" name="interest_rate" onkeydown="return event.keyCode !== 69" value="<?php echo $interest_rate; ?>"
                        class="form-control">
                </div>
            </div>
            <div class="row">
                <br>
            </div>
            <div class="form-group col-md-3">
                <input type="submit" id="submit" value="Update Loan Type" class="btn btn-primary">
            </div>
        <?php echo form_close(); ?>
    </div>
</div>