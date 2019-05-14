<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_saving extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'saving_id' => array(
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
                        'saving_type_id' => array(
                            'type' => 'INT',
                            'constraint' => 11,
                            'unsigned' => TRUE,
                            'foreign_key' => array( //relationship
                                'table' => 'saving_type', // table to
                                'field' => 'saving_type_id' // field to
                            ),
                        ),
                        
                        'saving_amount' => array(
                            'type' => 'INT',
                            'constraint' => 200,
                            'unsigned' => TRUE,
                        ),
                        'saving_date' => array(
                            'type' => 'timestamp',
                            'constraint' => 6,
                            'unsigned' => TRUE,
                        ),
                        
                        ));
                    $this->dbforge->add_field("`saving_status` tinyint NOT NULL DEFAULT 1");
                    $this->dbforge->add_field("`created_by` int NOT NULL ");
                    $this->dbforge->add_field("`created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
                    $this->dbforge->add_field("`modified_by` int NULL ");
                    $this->dbforge->add_field("`modified_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP");
                    $this->dbforge->add_field("`deleted_by` int NULL");
                    $this->dbforge->add_field("`deleted` tinyint NOT NULL DEFAULT 0");
                    $this->dbforge->add_field("`deleted_on` timestamp NULL DEFAULT NULL");
                    $this->dbforge->add_key('saving_id', TRUE);
                    $this->dbforge->create_table('saving');
        }

        public function down()
        {
                $this->dbforge->drop_table('saving');
        }
}