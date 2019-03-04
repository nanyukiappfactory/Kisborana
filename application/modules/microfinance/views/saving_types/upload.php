<div class="card">
        <div class="card-body">
<div class="row">
    <div class="col-lg-12">
    <h1 style="font-family: 'PT Serif', serif; font-size: 20pt; align-text: center;" >Saving Types</h1>
        <ol class="breadcrumb">
            <li class="active"><i class="fa fa-list"></i> imports saving types</li>
        </ol>            
    </div>
</div><!-- /.row -->

        <?php
       
            $validation_errors = validation_errors();
            if(!empty($validation_errors)){
                echo $validation_errors;
        }
        ?>

<?php
$output = '';
$output .= form_open_multipart('microfinance/imports/save');
$output .= '<div class="row">';
$output .= '<div class="col-lg-12 col-sm-12"><div class="form-group">';
$output .= form_label('import Saving Types', 'image');

 echo anchor("microfinance/imports/download", "Download Template", array("class"=>"btn btn-primary btn-sm")); ?><br></br>
<?php
$data = array(
    'name' => 'userfile',
    'id' => 'userfile',
    'class' => 'form-control filestyle',
    'value' => '',
    'data-icon' => 'false'
);

$output .= form_upload($data);
$output .= '</div> <span style="color:red;">*Please choose an Excel file(.csv) as Input</span></div>';
$output .= '<div class="col-lg-12 col-sm-12"><div class="form-group text-right">';
$data = array(
    'name' => 'importfile',
    'id' => 'importfile-id',
    'class' => 'btn btn-primary btn-sm',
    'value' => 'Import',
);

$output .= form_submit($data, 'Import Data');
$output .= '</div>
                        </div></div>';
$output .= form_close();
echo $output;
?>

<br></br>

<?php echo anchor("saving_types/saving_types", "Back", array("class"=>"btn btn-primary btn-sm")); ?><br></br>

</div>
</div>