import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/providers/database/postgres/base.entity';

@Entity({ name: 'workflow_action' })
export class WorkflowAction extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  workflow_action_id: string;  

  @Column({ type: 'varchar', length: 300 })
  workflow_instance_id: string;  

  @Column({ type: 'varchar', length: 300 })
  workflow_step_id: string;  
  
  @Column({ type: 'varchar', length: 300 })
  status: string;

  @Column({ type: 'varchar', length: 300 })
  action_name: string;

}