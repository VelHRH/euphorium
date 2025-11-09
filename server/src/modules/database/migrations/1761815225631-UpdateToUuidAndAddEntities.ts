import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateToUuidAndAddEntities1761815225631
  implements MigrationInterface
{
  name = 'UpdateToUuidAndAddEntities1761815225631';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "socials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "instagram" character varying, "x" character varying, "youtube" character varying, "facebook" character varying, CONSTRAINT "PK_5e3ee018e1b66c619ae3d3b3309" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "imgPath" character varying, "label" character varying, "socialId" uuid, CONSTRAINT "REL_074087a27dd062b96697e84bea" UNIQUE ("socialId"), CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "song-artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "songId" uuid, "artistId" uuid, CONSTRAINT "PK_0937a7898af7d0a17413a56e265" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "songs" ADD "album" character varying NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "songs" ADD "year" integer NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "songs" ADD "youtubeUrls" text array NOT NULL DEFAULT \'{}\'',
    );
    await queryRunner.query('ALTER TABLE "songs" ADD "postedAt" date NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "confirmations" DROP CONSTRAINT "FK_b75d86ea0c798f196ac3df0d161"',
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_7d1a1130c8184b69878e356614"',
    );
    await queryRunner.query(
      'ALTER TABLE "confirmations" DROP CONSTRAINT "PK_8a3991e9a203e6460dcb9048746"',
    );
    await queryRunner.query('ALTER TABLE "confirmations" DROP COLUMN "id"');
    await queryRunner.query(
      'ALTER TABLE "confirmations" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()',
    );
    await queryRunner.query(
      'ALTER TABLE "confirmations" ADD CONSTRAINT "PK_8a3991e9a203e6460dcb9048746" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "confirmations" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "confirmations" ADD "userId" uuid');
    await queryRunner.query(
      'ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"',
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "id"');
    await queryRunner.query(
      'ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")',
    );
    await queryRunner.query(
      'ALTER TABLE "sessions" DROP CONSTRAINT "PK_3238ef96f18b355b671619111bc"',
    );
    await queryRunner.query('ALTER TABLE "sessions" DROP COLUMN "id"');
    await queryRunner.query(
      'ALTER TABLE "sessions" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()',
    );
    await queryRunner.query(
      'ALTER TABLE "sessions" ADD CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "sessions" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "sessions" ADD "userId" uuid');
    await queryRunner.query(
      'ALTER TABLE "songs" DROP CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4"',
    );
    await queryRunner.query('ALTER TABLE "songs" DROP COLUMN "id"');
    await queryRunner.query(
      'ALTER TABLE "songs" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()',
    );
    await queryRunner.query(
      'ALTER TABLE "songs" ADD CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id")',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX "IDX_7d1a1130c8184b69878e356614" ON "confirmations" ("userId", "type") ',
    );
    await queryRunner.query(
      'ALTER TABLE "confirmations" ADD CONSTRAINT "FK_b75d86ea0c798f196ac3df0d161" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "artists" ADD CONSTRAINT "FK_074087a27dd062b96697e84beac" FOREIGN KEY ("socialId") REFERENCES "socials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "song-artists" ADD CONSTRAINT "FK_5810bf5dca2c85a1aa9756082a9" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "song-artists" ADD CONSTRAINT "FK_07e30b3ff09437188976b2e104f" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "song-artists" DROP CONSTRAINT "FK_07e30b3ff09437188976b2e104f"',
    );
    await queryRunner.query(
      'ALTER TABLE "song-artists" DROP CONSTRAINT "FK_5810bf5dca2c85a1aa9756082a9"',
    );
    await queryRunner.query(
      'ALTER TABLE "artists" DROP CONSTRAINT "FK_074087a27dd062b96697e84beac"',
    );
    await queryRunner.query(
      'ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"',
    );
    await queryRunner.query(
      'ALTER TABLE "confirmations" DROP CONSTRAINT "FK_b75d86ea0c798f196ac3df0d161"',
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_7d1a1130c8184b69878e356614"',
    );
    await queryRunner.query(
      'ALTER TABLE "songs" DROP CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4"',
    );
    await queryRunner.query('ALTER TABLE "songs" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "songs" ADD "id" SERIAL NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "songs" ADD CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "sessions" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "sessions" ADD "userId" integer');
    await queryRunner.query(
      'ALTER TABLE "sessions" DROP CONSTRAINT "PK_3238ef96f18b355b671619111bc"',
    );
    await queryRunner.query('ALTER TABLE "sessions" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "sessions" ADD "id" SERIAL NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "sessions" ADD CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id")',
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "users" ADD "id" SERIAL NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")',
    );
    await queryRunner.query(
      'ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE "confirmations" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "confirmations" ADD "userId" integer');
    await queryRunner.query(
      'ALTER TABLE "confirmations" DROP CONSTRAINT "PK_8a3991e9a203e6460dcb9048746"',
    );
    await queryRunner.query('ALTER TABLE "confirmations" DROP COLUMN "id"');
    await queryRunner.query(
      'ALTER TABLE "confirmations" ADD "id" SERIAL NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "confirmations" ADD CONSTRAINT "PK_8a3991e9a203e6460dcb9048746" PRIMARY KEY ("id")',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX "IDX_7d1a1130c8184b69878e356614" ON "confirmations" ("type", "userId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "confirmations" ADD CONSTRAINT "FK_b75d86ea0c798f196ac3df0d161" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE "songs" DROP COLUMN "postedAt"');
    await queryRunner.query('ALTER TABLE "songs" DROP COLUMN "youtubeUrls"');
    await queryRunner.query('ALTER TABLE "songs" DROP COLUMN "year"');
    await queryRunner.query('ALTER TABLE "songs" DROP COLUMN "album"');
    await queryRunner.query('DROP TABLE "song-artists"');
    await queryRunner.query('DROP TABLE "artists"');
    await queryRunner.query('DROP TABLE "socials"');
  }
}
