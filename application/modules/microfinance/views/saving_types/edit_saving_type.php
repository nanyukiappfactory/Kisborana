    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Page Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/themes/custom/style.css">
        <link href="<?php echo base_url(); ?>assets/vendor/bootstrap/css/bootstrap.min.css " rel="stylesheet">
        <script src="main.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="container">               	
                <?php echo form_open_multipart('microfinance/saving_types/edit_saving_type/'.$saving_type_id, array('onsubmit' => "return confirm('Do you want to update this record')")); ?>
                <div class="form-group">
                    <label for="saving_type_name">Saving Type Name</label>
                    <input type="text" name="saving_type_name" class="form-control"
                        value="<?php echo $saving_type_name; ?>">
                </div>
                <div class="submit_button">
                    <input type="submit" value="Update Saving Type" />
                </div>
                <?php echo form_close() ?>
            </div>
    </body>
    </html>