// src/app.module.ts

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './graphql/appResolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  ApolloServerPluginCacheControl,
  ApolloServerPluginLandingPageGraphQLPlaygroundOptions,
} from 'apollo-server-core';


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
  ],
  providers: [AppResolver],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      // consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
      // consumer.apply(EventMiddleware).forRoutes('graphql');
  }
}
