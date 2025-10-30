import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSongEntity1761832657218 implements MigrationInterface {
  name = 'UpdateSongEntity1761832657218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "songs" DROP COLUMN "year"');
    await queryRunner.query('ALTER TABLE "songs" DROP COLUMN "postedAt"');
    await queryRunner.query(
      'ALTER TABLE "songs" ADD "postedAt" TIME WITH TIME ZONE NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "songs" DROP COLUMN "postedAt"');
    await queryRunner.query('ALTER TABLE "songs" ADD "postedAt" date NOT NULL');
    await queryRunner.query('ALTER TABLE "songs" ADD "year" integer NOT NULL');
  }
}
