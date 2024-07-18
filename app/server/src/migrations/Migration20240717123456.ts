import { Migration } from '@mikro-orm/migrations';

// todo - need to fix this. Not able to run the migration
export class Migration20240717123456 extends Migration {

    async up(): Promise<void> {
        this.addSql(`
            CREATE TABLE post (
                id SERIAL PRIMARY KEY,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                title VARCHAR(255) NOT NULL,
                content TEXT,
                "order" INTEGER NOT NULL);
                `);
    }

    async down(): Promise<void> {
        this.addSql('drop table post;');
    }

}