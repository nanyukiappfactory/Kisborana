<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_loan extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'loan_id' => array(
                                'type' => 'INT',
                                'constraint' => 11,
                                'unsigned' => TRUE,
                                'auto_increment' => TRUE
                        ),
                        'member_id' => array(
                            'type' => 'INT',
                            'constraint' => 11,
                            'unsigned' => TRUE,
                            'foreign_key' => array( //relationship
                                'table' => 'member', // table to
                                'field' => 'member_id' // field to
                            ),
                        ),
                        'loan_type_id' => array(
                            'type' => 'INT',
                            'constraint' => 11,
                            'unsigned' => TRUE,
                            'foreign_key' => array( //relationship
                                'table' => 'loan_type', // table to
                                'field' => 'loan_type_id' // field to
                            ),
                        ),
                        'loan_stage_id' => array(
                                'type' => 'int',
                                'constraint' => '11',
                                'unsigned' => TRUE,
                                'foreign_key' => array( //relationship
                                    'table' => 'loan_stage', // table to
                                    'field' => 'loan_stage_id'
                        ),
                    ),
                        'loan_amount' => array(
                            'type' => 'INT',
                            'constraint' => 200,
                            'unsigned' => TRUE,
                        ),
                        'approved_amount' => array(
                            'type' => 'INT',
                            'constraint' => 200,
                            'unsigned' => TRUE,
                        ),
                        'disbursed_amount' => array(
                            'type' => 'INT',
                            'constraint' => 200,
                            'unsigned' => TRUE,
                        ),
                        'interest_amount' => array(
                            'type' => 'INT',
                            'constraint' => 200,
                            'unsigned' => TRUE,
                        ),
                        'repayment_amount' => array(
                            'type' => 'INT',
                            'constraint' => 200,
                            'unsigned' => TRUE,
                        ),
                        'installment_amount' => array(
                            'type' => 'INT',
                            'constraint' => 100,
                            'unsigned' => TRUE,
                        ),
                        'installment_period' => array(
                            'type' => 'INT',
                            'constraint' => 11,
                            'unsigned' => TRUE,
                        ),
                        'grace_period' => array(
                            'type' => 'INT',
                            'constraint' => 11,
                            'unsigned' => TRUE,
                        ),
                        'application_date' => array(
                            'type' => 'timestamp',
                            'constraint' => 6,
                            'unsigned' => TRUE,
                        ),
                        'approved_date' => array(
                            'type' => 'timestamp',
                            'constraint' => 6,
                            'unsigned' => TRUE,
                        ),
                        'disbursed_date' => array(
                            'type' => 'timestamp',
                            'constraint' => 6,
                            'unsigned' => TRUE,
                        ),
                        'approved_by' => array(
                            'type' => 'INT',
                            'constraint' => 11,
                            'unsigned' => TRUE,
                        ),
                        'disbursed_by' => array(
                            'type' => 'INT',
                            'constraint' => 11,
                            'unsigned' => TRUE,
                        ),
                        'loan_number' => array(
                            'type' => 'VARCHAR',
                            'constraint' => 100,
                            'unsigned' => TRUE,
                        ),
                        'member_salary' => array(
                            'type' => 'INT',
                            'constraint' => 100,
                            'unsigned' => TRUE,
                        ),
                        
                        ));
                    $this->dbforge->add_field("`loan_status` tinyint NOT NULL DEFAULT 1");
                    $this->dbforge->add_field("`created_by` int NOT NULL ");
                    $this->dbforge->add_field("`created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
                    $this->dbforge->add_field("`modified_by` int NULL ");
                    $this->dbforge->add_field("`modified_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP");
                    $this->dbforge->add_field("`deleted_by` int NULL");
                    $this->dbforge->add_field("`deleted` tinyint NOT NULL DEFAULT 0");
                    $this->dbforge->add_field("`deleted_on` timestamp NULL DEFAULT NULL");
                    $this->dbforge->add_key('loan_id', TRUE);
                    $this->dbforge->create_table('loan');
        }

        public function down()
        {
                $this->dbforge->drop_table('loan');
        }
}