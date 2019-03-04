<div class="card">
    <div class="card-body">
        <?php echo form_open_multipart('microfinance/loan_types/edit_loan_type/'.$loan_type_id, array('onsubmit' => "return confirm('Do you want to update this record')")); ?>
        <div>
            <input type="hidden" name="loan_type_name" value="<?php echo $loan_type_id; ?>">
        </div>
        <div class="form-group">
            <label for='loan_type_name'>Loan Type Name: </label>
            <input type="text" name="loan_type_name" value="<?php echo $loan_type_name; ?>" class="form-control">
        </div>
        <div class="form-row">
            <div class="form-group col-md-3">
                <label for='maximum_loan_amount'>Maximum loan amount: </label>
                <input type="number" name="maximum_loan_amount" value="<?php echo $maximum_loan_amount; ?>"
                    class="form-control">
            </div>
            <div class="form-group col-md-3">
                <label for='minimum_loan_amount'>Minimum loan amount: </label>
                <input type="number" name="minimum_loan_amount" value="<?php echo $minimum_loan_amount; ?>"
                    class="form-control">
            </div>
            <div class="form-group col-md-3">
                <label for='custom_loan_amount'>Custom loan amount: </label>
                <input type="number" name="custom_loan_amount" value="<?php echo $custom_loan_amount; ?>"
                    class="form-control">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-3">
                <label for='maximum_number_of_installments'>Maximum number of installments: </label>
                <input type="number" name="maximum_number_of_installments"
                    value="<?php echo $maximum_number_of_installments; ?>" class="form-control">
            </div>
            <div class="form-group col-md-3">
                <label for='minimum_number_of_installments'>Minimum number of installments: </label>
                <input type="number" name="minimum_number_of_installments"
                    value="<?php echo $minimum_number_of_installments; ?>" class="form-control">
            </div>
            <div class="form-group col-md-3">
                <label for='custom_number_of_installments'>Custom number of installments: </label>
                <input type="number" name="custom_number_of_installments"
                    value="<?php echo $custom_number_of_installments; ?>" class="form-control">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-3">
                <label for='maximum_number_of_guarantors'>Maximum number of guarantors: </label>
                <input type="numbert" name="maximum_number_of_guarantors"
                    value="<?php echo $maximum_number_of_guarantors; ?>" class="form-control">
            </div>
            <div class="form-group col-md-3">
                <label for='minimum_number_of_guarantors'>Minimum number of guarantors: </label>
                <input type="number" name="minimum_number_of_guarantors"
                    value="<?php echo $minimum_number_of_guarantors; ?>" class="form-control">
            </div>
            <div class="form-group col-md-3">
                <label for='custom_number_of_guarantors'>Custom number of guarantors: </label>
                <input type="number" name="custom_number_of_guarantors"
                    value="<?php echo $custom_number_of_guarantors; ?>" class="form-control">
            </div>
        </div>
        <div class="form-group">
            <div>
                <label for='interest_rate'>Interest rate: </label>
                <input type="number" step="0.01" name="interest_rate" value="<?php echo $interest_rate; ?>"
                    class="form-control">
            </div>
        </div>
        <div class="row">
            </br>
        </div>
        <div class="form-group col-md-3">
            <input type="submit" value="Enter Loan Type" class="btn btn-primary">
        </div>
        <?php echo form_close(); ?>
    </div>

</div>
</div>