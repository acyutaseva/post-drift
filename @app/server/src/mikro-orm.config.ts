import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';

const config: Options = {
  entities: ['./dist/**/*entity*'],
  driver: PostgreSqlDriver,
  dbName: process.env.MIKRO_ORM_DB_NAME,
  // todo: use db username and password from env
  user: 'admin', //process.env.MIKRO_ORM_USER,
  password: 'admin', //process.env.MIKRO_ORM_PASSWORD,
  host: process.env.MIKRO_ORM_DB_HOST,
  port: parseInt(process.env.MIKRO_ORM_DB_PORT || '5432', 10),
  debug: process.env.NODE_ENV !== 'production',
};

export default config;
