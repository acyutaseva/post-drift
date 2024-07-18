import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Post {
  @PrimaryKey()
  @Field(() => Int)
  id: number;

  @Property({ onCreate: () => new Date() })
  @Field()
  createdAt: Date;

  @Property({ onCreate: () => new Date() })
  @Field()
  updatedAt: Date;

  @Property()
  @Field(() => String)
  title: string;

  @Property({columnType: 'text'})
  @Field(() => String)
  content: string;

  @Property()
  @Field(() => Int) 
  order: number;

  // todo : add user field to post
}
