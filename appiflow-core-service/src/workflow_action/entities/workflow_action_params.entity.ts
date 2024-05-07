import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/providers/database/postgres/base.entity';

@Entity({ name: 'workflow_action_params' })
export class WorkflowActionParams extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  workflow_action_id: string;  

  @Column('jsonb', { default: {} })
  input_params: string;

  @Column('jsonb', { default: {} })
  output_params: string;

}