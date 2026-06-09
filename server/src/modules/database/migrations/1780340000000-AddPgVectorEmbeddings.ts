import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPgVectorEmbeddings1780340000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector`);

    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_events_description_embedding_hnsw"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_event_reviews_comment_embedding_hnsw"`,
    );

    await queryRunner.query(`
      ALTER TABLE "events"
      ALTER COLUMN "description_embedding" DROP DEFAULT,
      ALTER COLUMN "description_embedding" DROP NOT NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "event-reviews"
      ALTER COLUMN "comment_embedding" DROP DEFAULT,
      ALTER COLUMN "comment_embedding" DROP NOT NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "events"
      ALTER COLUMN "description_embedding" TYPE vector(768);
    `);

    await queryRunner.query(`
      ALTER TABLE "event-reviews"
      ALTER COLUMN "comment_embedding" TYPE vector(768);
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_events_description_embedding_hnsw"
      ON "events" USING hnsw ("description_embedding" vector_cosine_ops);
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_event_reviews_comment_embedding_hnsw"
      ON "event-reviews" USING hnsw ("comment_embedding" vector_cosine_ops);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_events_description_embedding_hnsw"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_event_reviews_comment_embedding_hnsw"`,
    );

    await queryRunner.query(`
      ALTER TABLE "events"
      ALTER COLUMN "description_embedding" TYPE double precision[]
      USING CASE
        WHEN "description_embedding" IS NULL THEN '{}'::double precision[]
        ELSE "description_embedding"::double precision[]
      END;
    `);

    await queryRunner.query(`
      ALTER TABLE "event-reviews"
      ALTER COLUMN "comment_embedding" TYPE double precision[]
      USING CASE
        WHEN "comment_embedding" IS NULL THEN '{}'::double precision[]
        ELSE "comment_embedding"::double precision[]
      END;
    `);

    await queryRunner.query(`
      ALTER TABLE "events"
      ALTER COLUMN "description_embedding" SET DEFAULT '{}',
      ALTER COLUMN "description_embedding" SET NOT NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "event-reviews"
      ALTER COLUMN "comment_embedding" SET DEFAULT '{}',
      ALTER COLUMN "comment_embedding" SET NOT NULL;
    `);
  }
}
