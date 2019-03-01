<h1>Delete Results </h1>
        <table  class="table" >
			<tr>
				<th>Name</th>
				<th>Age</th>
				<th>Hobby</th>
                <th>Picture</th>
			</tr>
            <tr>
                <td>
                    <?php echo $friend_name;?>
                </td>
                <td>
                    <?php echo $friend_age;?>
                </td>
                <td>
                    <?php echo$friend_hobby;?>
                </td>
                <td>
                    <img style="height: 100px; width: 100px;" src="<?php echo site_url().'uploads/'.$friend_picture?>" class="img-responsive">
                </td>
            </tr>
        </table>
        