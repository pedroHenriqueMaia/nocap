import { User } from './../user/user.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Publication {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  message: string;

  @Field()
  @Column()
  like:number = 0;

  @Field()
  @Column()
  publication_date: number;

  @ManyToOne(() => User, (user) => user.publication, {
    onDelete: 'CASCADE',
  })
  @Field(() => String)
  user: User['id'];

  constructor(publication?: Partial<Publication>) {
    this.id = publication?.id;
    this.title = publication?.title;
    this.message = publication?.message;
    this.publication_date = publication?.publication_date;
  }
}
