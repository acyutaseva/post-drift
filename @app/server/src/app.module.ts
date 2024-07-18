// src/app.module.ts

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostModule } from './post/post.module';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import config from './mikro-orm.config';
import { PostSeeder } from './seeder/post.seeder';




@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => {

          return {
              autoSchemaFile: true,
              context: ({ req, res, extra }) => {
                  if (extra) {
                      return { req: extra.request, res };
                  } else {
                      return { req, res };
                  }
              },
          };
      },
    }),
    MikroOrmModule.forRoot(config),
    PostModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

  }
}
