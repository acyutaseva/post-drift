import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql";

const config: Options = {
    entities: ['./dist/**/*entity*'],
    driver: PostgreSqlDriver, 
    dbName: process.env.MIKRO_ORM_DB_NAME,
    // todo: use db username and password from env
    user: "admin",
    password: "admin",
    debug: process.env.NODE_ENV !== 'production',
    };

export default config;