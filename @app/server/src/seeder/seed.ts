import { MikroORM } from '@mikro-orm/core';
import { AppModule } from '../app.module';
import { NestFactory } from '@nestjs/core';
import config from '../mikro-orm.config';
import { PostSeeder } from './post.seeder';
import { log } from 'console';


(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const orm = await MikroORM.init(config);
    const postSeeder = app.get(PostSeeder);
    await postSeeder.run(orm.em);
    console.log('Seeding complete');
})();


