<?php
    $modal_loan_types = "";
    $edit_url = "loan-types/edit-loan-types/".$id;
    $edit_icon ='<i class="fas fa-edit"></i>';
    $delete_url ="loan-types/delete-loan-types/".$id;
    $delete_icon ="<i class='fas fa-trash-alt'></i>";
	if($check == 0) 
	{
        $status_activation = "<span class='badge badge-danger far fa-thumbs-down'> Inactive</button>";
        
        $change_state =  anchor("loan-types/activate-loan-types/$id", "<i class='far fa-thumbs-up'></i>", array('onclick' => "return confirm('Do you want to activate this record')", 'class' => "btn btn-success btn-sm"));                   
    } 
    else 
    {
        $status_activation = "<span class='badge badge-success far fa-thumbs-up'> Active</button>";
        $change_state = anchor("loan-types/deactivate-loan-types/$id", "<i class='far fa-thumbs-down'></i>", array('onclick' => "return confirm('Do you want to deactivate this record')", 'class' => "btn btn-danger btn-sm"));
    }                            
    $modal_loan_types .=
    '<tr>
        <td>'.$count.'</td>
        <td>'.$name.'</td>
        <td>'.$status_activation.'</td>
        <td>'.anchor($edit_url, $edit_icon, array('onclick' => "return confirm('Are you sure you want to edit?')", 'class' => "btn btn-info btn-sm")).'</td>
        <td>'.anchor($delete_url, $delete_icon, array('onclick' => "return confirm('Do you want to delete this record')", 'class' => "btn btn-danger btn-sm"), img('assets/images/lock.png')).'</td> 
        <td>'.$change_state.'</td>
    </tr>';
?>
<div class="modal fade" id="individualSaving_type<?php echo $id; ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">
                    <?php echo $name; ?>'s Details
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<!-- modal body -->
				<table class="table table-sm">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Loan Type Name</th>
						<th scope="col">Status</th>
						<th scope="col">Edit</th>
						<th scope="col">Delete</th>
						<th scope="col">Change Status</th>
					</tr>
					<?php echo $modal_loan_types ?>
				</table>
				<!-- end of modal body -->
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal">Close
				</button>
			</div>
		</div>
	</div>
</div>
