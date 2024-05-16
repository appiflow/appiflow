import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/providers/database/postgres/base.entity';

@Entity({ name: 'workflow_instance_params' })
export class WorkflowInstanceParams extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  workflow_instance_id: string;  
  
  //@Column('varchar', { nullable: false, default: {} })
  @Column('jsonb', { nullable: false })
  workflow_definition: string;

  @Column('jsonb', { nullable: true  })
  input_params: string;

  @Column('jsonb', { nullable: true  })
  output_params: string;

}