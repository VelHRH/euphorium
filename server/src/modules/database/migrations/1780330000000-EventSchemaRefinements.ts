import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventSchemaRefinements1780330000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "locations"
      ALTER COLUMN "name" DROP NOT NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "locations"
      ALTER COLUMN "latitude" TYPE double precision
      USING "latitude"::double precision;
    `);

    await queryRunner.query(`
      ALTER TABLE "locations"
      ALTER COLUMN "longitude" TYPE double precision
      USING "longitude"::double precision;
    `);

    await queryRunner.query(`
      ALTER TABLE "event-reviews"
      ALTER COLUMN "rating" TYPE smallint
      USING GREATEST(1, LEAST(10, ROUND("rating")::integer))::smallint;
    `);

    await queryRunner.query(`
      ALTER TABLE "event-reviews"
      ADD CONSTRAINT "CHK_event_reviews_rating_range"
      CHECK ("rating" >= 1 AND "rating" <= 10);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "event-reviews"
      DROP CONSTRAINT "CHK_event_reviews_rating_range";
    `);

    await queryRunner.query(`
      ALTER TABLE "event-reviews"
      ALTER COLUMN "rating" TYPE double precision
      USING "rating"::double precision;
    `);

    await queryRunner.query(`
      ALTER TABLE "locations"
      ALTER COLUMN "longitude" TYPE integer
      USING ROUND("longitude")::integer;
    `);

    await queryRunner.query(`
      ALTER TABLE "locations"
      ALTER COLUMN "latitude" TYPE integer
      USING ROUND("latitude")::integer;
    `);

    await queryRunner.query(`
      ALTER TABLE "locations"
      ALTER COLUMN "name" SET NOT NULL;
    `);
  }
}
