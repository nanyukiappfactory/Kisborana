
        <h1>Search Results </h1>
        <table  class="table" >
        <tr>
		<th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>National ID</th>
                <th>Email</th>
                <th>Location</th>
                <th>Member Number</th>
                <th>Member Payroll Number</th>
                <th>Employer Name</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Registration Date</th>

</tr>
			<?php
            foreach ($results as $row) {
                ?>
            <tr>
                <td>
                    <?php echo $row['member_id'];?>
                </td>
                <td>
                    <?php echo $row['member_first_name'];?>
                </td>
                <td>
                    <?php echo $row['member_last_name'];?>
                </td>
                <td>
                    <?php echo $row['member_national_id'];?>
                </td>
                <td>
                    <?php echo $row['member_email'];?>
                </td>
                <td>
                    <?php echo $row['member_location'];?>
                </td>
                <td>
                    <?php echo $row['member_number'];?>
                </td>
                <td>
                    <?php echo $row['member_payroll_number'];?>
                </td>
                <td>
                    <?php echo $row['employer_id'];?>
                </td>
                <td>
                    <?php echo $row['member_phone_number'];?>
                </td>
                <td>
                    <?php echo $row['member_status'];?>
                </td>
                <td>
                    <?php echo $row['created_on'];?>
                </td>
            </tr>
            <?php
                }
            ?>
        </table>