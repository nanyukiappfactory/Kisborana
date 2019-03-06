<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_member extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'member_id' => array(
                                'type' => 'INT',
                                'constraint' => 11,
                                'unsigned' => TRUE,
                                'auto_increment' => TRUE
                        ),
                        'bank_id' => array(
                            'type' => 'INT',
                            'constraint' => 11,
                            'unsigned' => TRUE,
                            'foreign_key' => array( //relationship
                                'table' => 'bank', // table to
                                'field' => 'bank_id' // field to
                            ),
                        ),
                        'member_national_id' => array(
                            'type' => 'INT',
                            'constraint' => 11,
                            'unsigned' => TRUE,
                        ),
                        'member_first_name' => array(
                                'type' => 'VARCHAR',
                                'constraint' => '100',
                        ),
                        'member_last_name' => array(
                            'type' => 'VARCHAR',
                            'constraint' => '100',
                        ),
                        'employer_id' => array(
                            'type' => 'INT',
                            'constraint' => 11,
                            'unsigned' => TRUE,
                            'foreign_key' => array( //relationship
                                'table' => 'employer', // table to
                                'field' => 'employer_id' // field to
                            ),
                        ),
                        'member_email' => array(
                                'type' => 'VARCHAR',
                                'constraint' => '100',
                        ),
                        'member_phone_number' => array(
                            'type' => 'VARCHAR',
                            'constraint' => '100',
                        ),
                        'member_account_number' => array(
                            'type' => 'VARCHAR',
                            'constraint' => '100',
                        ),
                        'member_postal_address' => array(
                            'type' => 'VARCHAR',
                            'constraint' => '100',
                        ),
                        'member_postal_code' => array(
                            'type' => 'VARCHAR',
                            'constraint' => '100',
                        ),
                        'member_location' => array(
                            'type' => 'VARCHAR',
                            'constraint' => '100',
                        ),
                        'member_number' => array(
                            'type' => 'VARCHAR',
                            'constraint' => '100',
                        ),
                        'member_payroll_number' => array(
                            'type' => 'VARCHAR',
                            'constraint' => '100',
                        ),
                        'member_password' => array(
                            'type' => 'VARCHAR',
                            'constraint' => '32',
                            'null' => false,
                        ),
                        'member_loan_balance' => array(
                            'type' => 'INT',
                            'constraint' => '100',
                            'null' => false,
                        ),
                        'member_share_balance' => array(
                            'type' => 'INT',
                            'constraint' => '100',
                            'null' => false,
                        ),
                        ));
                    $this->dbforge->add_field("`member_status` tinyint NOT NULL DEFAULT 1");
                    $this->dbforge->add_field("`created_by` int NOT NULL ");
                    $this->dbforge->add_field("`created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
                    $this->dbforge->add_field("`modified_by` int NULL ");
                    $this->dbforge->add_field("`modified_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP");
                    $this->dbforge->add_field("`deleted_by` int NULL");
                    $this->dbforge->add_field("`deleted` tinyint NOT NULL DEFAULT 0");
                    $this->dbforge->add_field("`deleted_on` timestamp NULL DEFAULT NULL");
                    $this->dbforge->add_key('member_id', TRUE);
                    $this->dbforge->create_table('member');
        }

        public function down()
        {
                $this->dbforge->drop_table('member');
        }
}