import { MigrationInterface, QueryRunner } from "typeorm";

export class NonNullableEmbeddings1780619572547 implements MigrationInterface {
    name = 'NonNullableEmbeddings1780619572547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "description_embedding" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event-reviews" ALTER COLUMN "comment_embedding" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event-reviews" ALTER COLUMN "comment_embedding" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "description_embedding" DROP NOT NULL`);
    }

}
