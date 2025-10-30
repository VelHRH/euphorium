import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSongEntityPostedAt1761834337531 implements MigrationInterface {
    name = 'UpdateSongEntityPostedAt1761834337531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "postedAt"`);
        await queryRunner.query(`ALTER TABLE "songs" ADD "postedAt" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "postedAt"`);
        await queryRunner.query(`ALTER TABLE "songs" ADD "postedAt" TIME WITH TIME ZONE NOT NULL`);
    }

}
