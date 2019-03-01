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
          <?php echo form_open($this->uri->uri_string()); ?>
            <div class="form-group">
              <label for ="userfile" style="margin-bottom:5%;"><b>Select file to upload</b></label>
              <input type="file" id="userfile" name="userfile" size="20" style="margin-left:-12%;margin-top:3%;" />            </div>
             <br>
            <div class="submit_button">
              <input class="btn btn-success" type ="submit" value="Import Member"/>
            </div>
          <?php echo form_close(); ?>
        </div>
      </div>      
    <!-- </div> -->
  </div>
</body>
</html>