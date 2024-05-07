import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/providers/database/postgres/base.entity';

@Entity({ name: 'workflow_step_params' })
export class WorkflowStepParams extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  workflow_step_id: string;  

  @Column('jsonb', { default: {} })
  input_params: string;

  @Column('jsonb', { default: {} })
  output_params: string;

}