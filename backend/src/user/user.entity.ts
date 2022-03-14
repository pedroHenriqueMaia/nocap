import { Publication } from './../ publication/publication.entity';
import { hasPasswordTranform } from './../common/helpers/crypto';
import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @HideField()
  @Column({ transformer: hasPasswordTranform })
  password: string;

  @Field()
  @Column({ nullable: true })
  bio: string;

  constructor(user?: Partial<User>) {
    this.id = user?.id;
    this.name = user?.name;
    this.email = user?.email;
    this.password = user?.password;
    this.bio = user?.bio;
  }
}
