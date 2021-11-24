import {MigrationInterface, QueryRunner} from "typeorm";

export class userMessage1637742971799 implements MigrationInterface {
    name = 'userMessage1637742971799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message_blog" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "post_text" character varying, "post_media" character varying, "author" character varying NOT NULL, "isDeleted" boolean NOT NULL, CONSTRAINT "PK_c7ad0300077b5ff4c78a2e996b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "isDeleted" boolean NOT NULL, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "message_blog"`);
    }

}
