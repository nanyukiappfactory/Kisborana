 <div class="container">
 	<div class="container">
 		<?php       
            $validation_errors = validation_errors();
            if(!empty($validation_errors)){
                echo $validation_errors;
        }
        ?>
 		<!-- dynamically generating a form in brackets where to submit data to-->
 		<div class="card">
 			<div class="card-body">
 				<?php echo form_open ($this->uri->uri_string());?>
 				<div class="form-group" style="margin-bottom: 10px;">
 					<label for="saving_type_name">Saving Type Name</label>
 					<input type="text" name="saving_type_name" class="form-control">
 				</div>
 				<div class="submit_button">
 					<input type="submit" value="Add Saving Type" />
 				</div>
 				<?php echo form_close() ?>
 			</div>
 		</div>
 	</div>
