import { Query, Resolver } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';

@Resolver()
export class AppResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello, GraphQL!' + uuidv4();;
  }
}
