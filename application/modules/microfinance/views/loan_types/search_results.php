<h1>Search Results </h1>
<table class="table">
    <tr>
        <th>#</th>
        <th>Loan Name</th>
        <th>Status</th>
        <th>Max Amount</th>
        <th>Min Amount</th>
        <th>Custom Amount</th>
        <th>Max Installs</th>
        <th>Mini Installs</th>
        <th>Custom Installs</th>
        <th>Max Guarantors</th>
        <th>Min Guarantors</th>
        <th>Custom Guarantors</th>
        <th>Interest Rate</th>
        <th colspan="4" style="text-align:center">Actions</th>
    </tr>
    <?php
            foreach ($results as $row) {
                ?>
    <tr>
        <td>
            <?php echo $row['loan_type_id'];?>
        </td>
        <td>
            <?php echo $row['loan_type_name'];?>
        </td>
        <td>
            <?php echo $row['maximum_loan_amount'];?>
        </td>
        <td>
            <?php echo $row['minimum_loan_amount'];?>
        </td>
        <td>
            <?php echo $row['custom_loan_amount'];?>
        </td>
        <td>
            <?php echo $row['maximum_number_of_installments'];?>
        </td>
        <td>
            <?php echo $row['minimum_number_of_installments'];?>
        </td>
        <td>
            <?php echo $row['custom_number_of_installments'];?>
        </td>
        <td>
            <?php echo $row['maximum_number_of_guarantors'];?>
        </td>
        <td>
            <?php echo $row['minimum_number_of_guarantors'];?>
        </td>
        <td>
            <?php echo $row['custom_number_of_guarantors'];?>
        </td>
        <td>
            <?php echo $row['interest_rate'];?>
        </td>
        <td>
            <?php echo $row['loan_type_status'];?>
        </td>
    </tr>
    <?php
                }
            ?>
</table>