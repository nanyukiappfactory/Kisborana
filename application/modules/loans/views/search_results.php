
        <h1>Search Results </h1>
        <table  class="table" >
			<tr>
				<th>Name</th>
				<th>Age</th>
				<th>Gender</th>
			</tr>
			<?php
            foreach ($results as $row) {
                ?>
            <tr>
                <td>
                    <?php echo $row['friend_name'];?>
                </td>
                <td>
                    <?php echo $row['friend_age'];?>
                </td>
                <td>
                    <?php echo $row['friend_gender'];?>
                </td>
            </tr>
            <?php
                }
            ?>
        </table>