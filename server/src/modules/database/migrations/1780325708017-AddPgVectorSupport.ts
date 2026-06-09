import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPgVectorSupport1780325708017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable pgvector extension
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector;`);

    // Convert description_embedding from double precision[] to vector(768)
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "description_embedding" TYPE vector(768) USING "description_embedding"::vector(768);`,
    );

    // Convert comment_embedding from double precision[] to vector(768)
    await queryRunner.query(
      `ALTER TABLE "event-reviews" ALTER COLUMN "comment_embedding" TYPE vector(768) USING "comment_embedding"::vector(768);`,
    );

    // Create HNSW indexes for fast similarity search
    await queryRunner.query(
      `CREATE INDEX "idx_events_description_embedding_hnsw" ON "events" USING hnsw ("description_embedding" vector_cosine_ops);`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_event_reviews_comment_embedding_hnsw" ON "event-reviews" USING hnsw ("comment_embedding" vector_cosine_ops);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_events_description_embedding_hnsw";`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_event_reviews_comment_embedding_hnsw";`,
    );

    // Convert back to double precision arrays
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "description_embedding" TYPE double precision[] USING "description_embedding"::double precision[];`,
    );
    await queryRunner.query(
      `ALTER TABLE "event-reviews" ALTER COLUMN "comment_embedding" TYPE double precision[] USING "comment_embedding"::double precision[];`,
    );

    // Note: We don't drop the vector extension as it might be used elsewhere
  }
}
