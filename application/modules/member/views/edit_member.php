<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel ="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/themes/custom/style.css">
    <link href="<?php echo base_url(); ?>assets/vendor/bootstrap/css/bootstrap.min.css "rel="stylesheet">
    <link href="<?php echo base_url();?>assets/themes/custom/style.css" rel="stylesheet">
    <script src="main.js"></script>
</head>
<body>
  <div class = "container">
    <!-- <div class="col-md-9 ml-sm-auto col-lg-10 px-4 pt-5"> -->
      <?php
        $validation_errors = validation_errors();
        if (!empty($validation_errors)) {
            echo $validation_errors;
        }
      ?>
      <br>
      <div class="card">
        <div class="card-body">
          <?php echo form_open_multipart($this->uri->uri_string()); ?>
            <div class="form-group">
              <label for ="member_national_id"><b>National id</b></label>
              <input type="number" name="member_national_id" value="<?php echo $national_id ?>" class="form-control form-control-lg inputform">
            </div>
            <div class="form-group">
              <label for ="first_name"><b>First Name</b></label>
              <input type="text" name="firstname" value="<?php echo $first_name ?>" class="form-control form-control-lg inputform">
            </div>
            <div class="form-group">
              <label for ="last_name"><b>Last Name</b></label>
              <input type="text" name="lastname" value="<?php echo $last_name ?>" class="form-control form-control-lg inputform">
            </div>
            
            <div class="form-group">
              <label for="Bank"><b>Select Bank</b></label>
              <select name="bank_name"  id="bank_details" class="form-control form-control-lg inputform">
                <option value="<?php echo $bank_id; ?>"><?php echo $bank_name; ?></option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="Employer"><b>Select Employer</b></label>
              <select name="employer_name" id="employer_details" class="form-control form-control-lg inputform">
                <option value="<?php echo $employer_id; ?>"><?php echo $employer_name; ?></option>
              </select>
            </div>
            <div class="form-group">
              <label for="email"><b>Email Address</b></label>
              <input type="email" name="email" value="<?php echo $email ?>" class="form-control form-control-lg inputform"/>
            </div>
            <div class="form-group">
              <label for="phone_number"><b>Phone number</b></label>
              <input type="number" name="phone_number" value="<?php echo $phone_number?>" class="form-control form-control-lg inputform"/>
            </div>
            <div class="form-group">
              <label for="account_number"><b>Account number</b></label>
              <input type="number" name="account_number" value="<?php echo $bank_account_number?>" class="form-control form-control-lg inputform"/>
            </div>
            <div class="form-group">
              <label for="postal_address"><b>Postal address</b></label>
              <input type="text" name="postal_address" value="<?php echo $postal_address ?>" class="form-control form-control-lg inputform"/>
            </div>
            <div class="form-group">
              <label for="postal_code"><b>Postal code</b></label>
              <input type="number" name="postal_code" value="<?php echo $postal_code ?>" class="form-control form-control-lg inputform"/>
            </div>
            <div class="form-group">
              <label for="member_number"><b>Member number</b></label>
              <input type="number" name="member_number" value="<?php echo $member_number ?>" class="form-control form-control-lg inputform"/>
            </div>
            <div class="form-group">
              <label for="member_payroll_number"><b>Member Payroll number</b></label>
              <input type="number" name="member_payroll_number" value="<?php echo $member_payroll_number ?>" class="form-control form-control-lg inputform"/>
            </div>
            <div class="form-group">
              <label for="location"><b>Location</b></label>
              <input type="text" name="location" value="<?php echo $location ?>" class="form-control form-control-lg inputform">
            </div> <br>
            <div class="submit_button">
              <input class="btn btn-success" type ="submit"value="Update Member"/>
            </div>
          <?php echo form_close() ?>
        </div>
      </div>      
    <!-- </div> -->
  </div>
</body>
</html>