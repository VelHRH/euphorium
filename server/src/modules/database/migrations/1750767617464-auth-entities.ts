import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuthEntities1750767617464 implements MigrationInterface {
  name = 'AuthEntities1750767617464';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"confirmations_type_enum\" AS ENUM('email', 'password', 'passwordChanged')",
    );
    await queryRunner.query(
      'CREATE TABLE "confirmations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."confirmations_type_enum" NOT NULL, "expires" TIMESTAMP NOT NULL, "token" character varying NOT NULL, "userId" integer, CONSTRAINT "UQ_896ed64bde1cef05ea113698a3a" UNIQUE ("token"), CONSTRAINT "PK_8a3991e9a203e6460dcb9048746" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX "IDX_7d1a1130c8184b69878e356614" ON "confirmations" ("userId", "type") ',
    );
    await queryRunner.query(
      'CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" character varying NOT NULL, "userId" integer, CONSTRAINT "UQ_b443618a8149644123d48eceed4" UNIQUE ("refreshToken"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "confirmations" ADD CONSTRAINT "FK_b75d86ea0c798f196ac3df0d161" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"',
    );
    await queryRunner.query(
      'ALTER TABLE "confirmations" DROP CONSTRAINT "FK_b75d86ea0c798f196ac3df0d161"',
    );
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TABLE "sessions"');
    await queryRunner.query(
      'DROP INDEX "public"."IDX_7d1a1130c8184b69878e356614"',
    );
    await queryRunner.query('DROP TABLE "confirmations"');
    await queryRunner.query('DROP TYPE "public"."confirmations_type_enum"');
  }
}
