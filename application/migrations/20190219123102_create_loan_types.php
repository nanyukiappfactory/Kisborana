<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Migration_Create_Loan_types extends CI_Migration
{

    public function up()
    {
        $this->dbforge->add_field(array(
            'loan_type_id' => array(
                'type' => 'INT',
                'unsigned' => true,
                'constraint' => '11',
                'auto_increment' => true,
            ),
            'loan_type_name' => array(
                'type' => 'VARCHAR',
                'constraint' => '100',
                'null' => false,
            ),
            'maximum_loan_amount' => array(
                'type' => 'INT',
                'constraint' => '11',
                'null' => true,
            ),
            'minimum_loan_amount' => array(
                'type' => 'INT',
                'constraint' => '11',
                'null' => true,
            ),

            'custom_loan_amount' => array(
                'type' => 'INT',
                'constraint' => '11',
                'null' => true,
            ),

            'maximum_number_of_installments' => array(
                'type' => 'INT',
                'constraint' => '11',
                'null' => true,
            ),

            'minimum_number_of_installments' => array(
                'type' => 'INT',
                'constraint' => '11',
                'null' => true,
            ),

            'custom_number_of_installments' => array(
                'type' => 'INT',
                'constraint' => '11',
                'null' => true,
            ),

            'maximum_number_of_guarantors' => array(
                'type' => 'INT',
                'constraint' => '11',
                'null' => true,
            ),

            'minimum_number_of_guarantors' => array(
                'type' => 'INT',
                'constraint' => '11',
                'null' => false,
            ),

            'custom_number_of_guarantors' => array(
                'type' => 'INT',
                'constraint' => '11',
                'null' => true,
            ),

            'interest_rate' => array(
                'type' => 'DECIMAL',
                'constraint' => '11',
                'null' => false,
            ),
        ));
        $this->dbforge->add_field("`loan_type_status` tinyint NOT NULL DEFAULT 1");
        $this->dbforge->add_field("`created_by` int NOT NULL ");
        $this->dbforge->add_field("`created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
        $this->dbforge->add_field("`modified_by` int NULL ");
        $this->dbforge->add_field("`modified_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP");
        $this->dbforge->add_field("`deleted_by` int NULL");
        $this->dbforge->add_field("`deleted` tinyint NOT NULL DEFAULT 0");
        $this->dbforge->add_field("`deleted_on` timestamp NULL");
        $this->dbforge->add_key('loan_type_id', true);
        $this->dbforge->create_table('loan_type');
// $this->db->query('ALTER TABLE `partner` ADD FOREIGN KEY(`partner_type_id`) REFERENCES `partner_type`(`partner_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;');
    }

    public function down()
    {
        $this->dbforge->drop_table('loan_type');
    }
}
