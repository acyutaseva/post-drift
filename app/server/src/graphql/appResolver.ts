import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello, GraphQL!.....';
  }
}
