// src/post/post.service.ts

import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Post[]> {
    return this.em.find(Post, {});
  }

  async findById(id: number): Promise<Post | null> {
    return this.em.findOne(Post, { id });
  }

  async create(postData: Partial<Post>): Promise<Post> {
    const post = new Post();
    post.title = postData.title;
    post.content=  postData.content;
    await this.em.persistAndFlush(post);
    return post;
  }

  async update(id: number, postData: Partial<Post>): Promise<Post | null> {
    const post = await this.em.findOne(Post, { id });
    if (!post) return null;
    post.title = postData.title || post.title;
    post.content = postData.content || post.content;
    await this.em.flush();
    return post;
  }

  async delete(id: number): Promise<boolean> {
    const post = await this.em.findOne(Post, { id });
    if (!post) return false;
    await this.em.removeAndFlush(post);
    return true;
  }
}
