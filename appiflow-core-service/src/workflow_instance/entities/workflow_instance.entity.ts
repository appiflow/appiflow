import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'workflow_instance' })
export class WorkflowInstance extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  workflow_instance_id: string;  
  
  @Column({ type: 'varchar', length: 300 })
  status: string;

}