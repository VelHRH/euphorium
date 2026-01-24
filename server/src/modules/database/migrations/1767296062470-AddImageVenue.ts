import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageVenue1767296062470 implements MigrationInterface {
    name = 'AddImageVenue1767296062470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venues" ADD "imgPath" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venues" DROP COLUMN "imgPath"`);
    }

}
