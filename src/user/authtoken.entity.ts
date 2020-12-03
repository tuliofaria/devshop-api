import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from './user.entity'

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(
    type => User,
    user => user.authTokens
  )
  user: User

  @Column({ type: 'timestamp' })
  createdAt: Date

  @Column({ type: 'timestamp' })
  lastUsedAt: Date

  @Column({ type: 'boolean' })
  active: boolean

  @Column()
  userAgent: string

  @BeforeInsert()
  setCreatedDate(): void {
    this.createdAt = new Date()
    this.lastUsedAt = new Date()
    this.active = true
  }
}
