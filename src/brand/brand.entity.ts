import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 250, nullable: false })
  name: string

  @Column({ length: 250, nullable: false })
  slug: string

  @Column({ length: 450, nullable: true })
  logo: string
}
