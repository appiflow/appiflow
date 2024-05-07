import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/providers/database/postgres/base.entity';

@Entity({ name: 'workflow_instance_params' })
export class WorkflowInstanceParams extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  workflow_instance_id: string;  
  
  @Column('jsonb', { nullable: false, default: {} })
  workflow_definition: string;

}