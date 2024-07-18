// src/post/post.service.ts

import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Post, UpdatePostInput } from './post.entity';

@Injectable()
export class PostService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Post[]> {
    return this.em.find(Post, {}, { orderBy: { position: 'ASC' } });
  }

  async findById(id: number): Promise<Post | null> {
    return this.em.findOne(Post, { id });
  }

  async create(postData: Partial<Post>): Promise<Post> {
    const post = new Post();
    post.title = postData.title;
    post.content = postData.content;
    await this.em.persistAndFlush(post);
    return post;
  }

  async update(id: number, postData: UpdatePostInput): Promise<Post | null> {
    const post = await this.em.findOne(Post, { id });
    if (!post) {
      return null;
    }

    const currentPosition = post.position;
    const newPosition = postData.position;

    if (currentPosition === newPosition) {
      Object.assign(post, postData);
      this.em.persist(post);
      return; // No change needed if the positions are the same
    }

    // Begin transaction
    await this.em.transactional(async (em) => {
      if (currentPosition < newPosition) {
        // Moving down
        await em
          .getConnection()
          .execute(
            'UPDATE post SET position = position - 1 WHERE position > ? AND position <= ?',
            [currentPosition, newPosition],
          );
      } else {
        // Moving up
        await em
          .getConnection()
          .execute(
            'UPDATE post SET position = position + 1 WHERE position >= ? AND position < ?',
            [newPosition, currentPosition],
          );
      }
      post.position = newPosition;
      await em.persistAndFlush(post);
    });

    return await this.em.findOne(Post, { id });
  }

  async delete(id: number): Promise<boolean> {
    const post = await this.em.findOne(Post, { id });
    if (!post) return false;
    await this.em.removeAndFlush(post);
    return true;
  }
}
