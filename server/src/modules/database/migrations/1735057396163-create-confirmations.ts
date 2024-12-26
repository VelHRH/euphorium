import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateConfirmations1735057396163 implements MigrationInterface {
  name = 'CreateConfirmations1735057396163';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TYPE "public"."confirmations_type_enum" AS ENUM(\'email\', \'password\')',
    );
    await queryRunner.query(
      'CREATE TABLE "confirmations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."confirmations_type_enum" NOT NULL, "expires" TIMESTAMP NOT NULL, "token" character varying NOT NULL, "userId" integer, CONSTRAINT "UQ_896ed64bde1cef05ea113698a3a" UNIQUE ("token"), CONSTRAINT "PK_8a3991e9a203e6460dcb9048746" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX "IDX_7d1a1130c8184b69878e356614" ON "confirmations" ("userId", "type") ',
    );
    await queryRunner.query(
      'ALTER TABLE "confirmations" ADD CONSTRAINT "FK_b75d86ea0c798f196ac3df0d161" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "confirmations" DROP CONSTRAINT "FK_b75d86ea0c798f196ac3df0d161"',
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_7d1a1130c8184b69878e356614"',
    );
    await queryRunner.query('DROP TABLE "confirmations"');
    await queryRunner.query('DROP TYPE "public"."confirmations_type_enum"');
  }
}
