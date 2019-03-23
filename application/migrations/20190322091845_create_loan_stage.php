<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_loan_stage extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'loan_stage_id' => array(
                                'type' => 'INT',
                                'constraint' => 11,
                                'unsigned' => TRUE,
                                'auto_increment' => TRUE
                        ),
                        'loan_stage_name' => array(
                                'type' => 'VARCHAR',
                                'constraint' => '100',
                                'DEFAULT' => 'In Progress',
                                'unsigned' => TRUE,
                        ),                      
                        
                ));
                $this->dbforge->add_field("`loan_stage_status` tinyint NOT NULL DEFAULT 1");
                $this->dbforge->add_field("`created_by` int NOT NULL ");
                $this->dbforge->add_field("`created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
                $this->dbforge->add_field("`modified_by` int NULL ");
                $this->dbforge->add_field("`modified_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP");
                $this->dbforge->add_field("`deleted` tinyint NOT NULL DEFAULT 0");
                $this->dbforge->add_field("`deleted_on` timestamp NULL DEFAULT NULL");
                $this->dbforge->add_field("`deleted_by` int NULL");                        
                $this->dbforge->add_key('loan_stage_id', TRUE);
                $this->dbforge->create_table('loan_stage');
                $data = array(
                        array('loan_stage_id'=>"1",
                                'loan_stage_name'=>"In Progress"),
                        array('loan_stage_id'=>"2",
                                'loan_stage_name'=>"Fully Paid")
                );
                $this->db->insert_batch('loan_stage', $data);
        }

        public function down()
        {
                $this->dbforge->drop_table('loan_stage');
        }
}