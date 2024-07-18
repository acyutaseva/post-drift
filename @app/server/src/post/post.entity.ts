import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
  position: number;

  // todo : add user field to post
}



@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  content?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  position?: number;

  
}