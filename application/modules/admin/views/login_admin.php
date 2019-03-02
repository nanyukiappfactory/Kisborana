<?php echo form_open($this->uri->uri_string(), array ("class"=>"form-signin")); ?>

  <img class="mb-4" src="<?php echo base_url();?>assets/images/lock.png" alt="" width="72" height="72">
  <h1 class="h3 mb-3 font-weight-normal">Admin Login</h1>
  <label for="user_email" class="sr-only">Email address</label>
  <input type="email" name = "user_email" id = "user_email" class="form-control" placeholder="Email address"  autofocus>
  <label for="user_password" class="sr-only">Password</label>
  <input type="password"  name ="user_password" id ="user_password"class="form-control" placeholder="Password">
  
  <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
  <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
<?php echo form_close();?>