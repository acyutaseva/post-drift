import { EntityManager } from '@mikro-orm/core';
import { Post } from '../post/post.entity';
import {  Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';


@Injectable()
export class PostSeeder  {

  async run(em: EntityManager): Promise<void> {
    const POST_COUNT = 10;
    const forkedEm= await em.fork();
    for (let i = 0; i < POST_COUNT; i++) {
      forkedEm.create(Post, {
        title: "Initial Position[" + i + "] - ",// + faker.lorem.sentence({min: 2, max: 5 }),
        content: faker.lorem.sentence({min: 5, max: 50 }),
        position: i,
      });
    }

    await forkedEm.flush();
    console.log('PostSeeder: Seeding complete');
  }
}