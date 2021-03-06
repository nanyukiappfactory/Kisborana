<div class="card">
	<div class="card-body">
		<h1 style="font-family: 'PT Serif', serif; font-size: 20pt;">Import CSV file </h1>
		<div class="container">
			<?php echo anchor("microfinance/members/download_csv/", "Download CSV Template", array("class" => "btn btn-success btn-sm")); ?>
			<br>
		</div>
		<?php echo form_open_multipart("microfinance/members/upload_csv");?>
		<div class="container">
			<label>Upload File</label>
			<div class="form-control filestyle">
				<input type="file" id="userfile" name="userfile">
			</div>
        </div>
        <br>
		<div class="form-row">
			<button type="submit" name="submit" class="btn btn-info">Save</button>
		</div>
		<?php echo form_close(); ?>
	</div>
</div>
