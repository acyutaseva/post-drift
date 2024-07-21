import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostModule } from './post/post.module';
import config from './mikro-orm.config';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: true,
        subscriptions: {
          'graphql-ws': {
            path: '/graphql',
            onConnect: () => {
              console.log('Connected to websocket');
            },
            onDisconnect: () => {
              console.log('Disconnected from websocket');
            },
          },
        },
        context: ({ req, res, extra }) => {
          if (extra) {
            return { req: extra.request, res, pubSub };
          } else {
            return { req, res, pubSub };
          }
        },
      }),
    }),
    MikroOrmModule.forRoot(config),
    PostModule,
  ],
})
export class AppModule {}
