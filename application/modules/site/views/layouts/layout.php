<?php
  $alert_message = '';
	$layout_message = '';  
  $error = $this->session->flashdata("error");
  $success = $this->session->flashdata("success");
  if(!empty($error))
  {
    $alert_message='<div class="alert alert-dark" role="alert">'.$error.'</div>';
  }
  if(!empty($success))
  {   
		$alert_message='<div class="alert alert-success" role="alert">'.$success.'</div>';
  }
  $layout_message .= '<div class="container">'.$alert_message.'</div>';
  ?>
<!doctype html>
<html lang="en">
  <head>
   <?php $this->load->view("site/layouts/includes/header");?>
  </head>
  <body>
    <?php $this->load->view("site/layouts/includes/navigation"); ?>
    <div class="container-fluid">
      <div class="row">
        <?php $this->load->view("site/layouts/includes/sidebar");?>
        <main role="main" class="col-md-3 ml-sm-auto col-lg-10 px-3 pt-5">    
        <?php echo $layout_message; ?>
        <?php echo $content; ?>
        </main>
      </div>
    </div>
    <script src="<?php echo base_url() ?>assets/vendor/jquery/jquery-3.3.1.slim.min.js"></script>
    <script src="<?php echo base_url() ?>assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="<?php echo base_url() ?>assets/vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="<?php echo base_url() ?>assets/themes/custom/feather.min.js"></script>
    <script src="<?php echo base_url() ?>assets/themes/custom/select2_script.js"></script>
    <link href="<?php echo base_url();?>assets/themes/custom/select2.min.css" rel="stylesheet">
    <script src="<?php echo base_url();?>assets/themes/custom/select2.min.js"></script>
  </body>      
</html>
