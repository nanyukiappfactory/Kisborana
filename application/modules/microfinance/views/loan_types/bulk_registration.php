<?php 
            $success = $this->session->flashdata("success_message");
            $error = $this->session->flashdata("error_message");

            if (!empty($success)) { ?>
<div class="alert alert-success" role="alert">
	<?php
                echo $success; ?>
</div>
<?php
            }

            if (!empty($error)) { ?>
<div class="alert alert-dark" role="alert">
	<?php
                echo $error; ?>
</div>
<?php
            }
        ?>
		<div class="card">
	<div class="card-body">
<h1 style="font-family: 'PT Serif', serif; font-size: 20pt;">Import CSV file </h1>
<div class="container">
<?php echo anchor("microfinance/loan_types/download_csv/", "Download CSV Template", array("class" => "btn btn-success btn-sm")); ?>
<br></br>
</div>
<?php echo form_open_multipart("microfinance/loan_types/upload_csv");?>
<div class="container">
	<label>Upload File</label>
    <div class="form-control filestyle">
	<input type="file" id="userfile" name="userfile">
</div>
<br></br>
</div>

<div class="form-row">
	<button type="submit" name="submit" class="btn btn-info">Save</button>
</div>
<?php echo form_close(); ?>
</div>
</div>