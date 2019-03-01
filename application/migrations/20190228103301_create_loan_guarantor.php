<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_loan_guarantor extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'loan_guarantor_id' => array(
                                'type' => 'INT',
                                'constraint' => 11,
                                'unsigned' => TRUE,
                                'auto_increment' => TRUE
                        ),
                        'loan_id' => array(
                            'type' => 'INT',
                            'constraint' => 11,
                            'unsigned' => TRUE,
                            'foreign_key' => array( //relationship
                                'table' => 'loan', // table to
                                'field' => 'loan_id' // field to
                            ),
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
                        'guaranteed_amount' => array(
                                'type' => 'INT',
                                'constraint' => '100',
                        ),
                        ));
                    $this->dbforge->add_field("`loan_guarantor_status` tinyint NOT NULL DEFAULT 1");
                    $this->dbforge->add_field("`created_by` int NOT NULL ");
                    $this->dbforge->add_field("`created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
                    $this->dbforge->add_field("`modified_by` int NULL ");
                    $this->dbforge->add_field("`modified_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP");
                    $this->dbforge->add_field("`deleted_by` int NULL");
                    $this->dbforge->add_field("`deleted` tinyint NOT NULL DEFAULT 0");
                    $this->dbforge->add_field("`deleted_on` timestamp NULL DEFAULT NULL");
                    $this->dbforge->add_key('loan_guarantor_id', TRUE);
                    $this->dbforge->create_table('loan_guarantor');
        }

        public function down()
        {
                $this->dbforge->drop_table('loan_guarantor');
        }
}