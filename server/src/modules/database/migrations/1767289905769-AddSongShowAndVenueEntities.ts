import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSongShowAndVenueEntities1767289905769 implements MigrationInterface {
    name = 'AddSongShowAndVenueEntities1767289905769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "festivals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "dateStart" TIMESTAMP NOT NULL, "dateEnd" TIMESTAMP NOT NULL, CONSTRAINT "PK_6d4d298db683d281bcaed953a46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shows" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "venueId" uuid, "festivalId" uuid, CONSTRAINT "PK_db2b12161dbc5081c4f50025669" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "venues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "countryCode" character varying NOT NULL, "city" character varying NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, CONSTRAINT "PK_cb0f885278d12384eb7a81818be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "song-writers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "songId" uuid, "artistId" uuid, CONSTRAINT "PK_63ebfd441603294a09d867efbb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "song-performers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "songId" uuid, "artistId" uuid, CONSTRAINT "PK_0ae0a25c657909e2892c453454c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shows" ADD CONSTRAINT "FK_5fa1e0b256a41ed68d40521fabb" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shows" ADD CONSTRAINT "FK_4161468060bc6443aa754479667" FOREIGN KEY ("festivalId") REFERENCES "festivals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "song-writers" ADD CONSTRAINT "FK_9554aa6b8f2c9abc2613f7fcd9e" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "song-writers" ADD CONSTRAINT "FK_de264c268b61ea74b74066eb4d6" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "song-performers" ADD CONSTRAINT "FK_2a2f49793779d4d8aae1db00320" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "song-performers" ADD CONSTRAINT "FK_5d03c24cf83a025d6c14c20fdb1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song-performers" DROP CONSTRAINT "FK_5d03c24cf83a025d6c14c20fdb1"`);
        await queryRunner.query(`ALTER TABLE "song-performers" DROP CONSTRAINT "FK_2a2f49793779d4d8aae1db00320"`);
        await queryRunner.query(`ALTER TABLE "song-writers" DROP CONSTRAINT "FK_de264c268b61ea74b74066eb4d6"`);
        await queryRunner.query(`ALTER TABLE "song-writers" DROP CONSTRAINT "FK_9554aa6b8f2c9abc2613f7fcd9e"`);
        await queryRunner.query(`ALTER TABLE "shows" DROP CONSTRAINT "FK_4161468060bc6443aa754479667"`);
        await queryRunner.query(`ALTER TABLE "shows" DROP CONSTRAINT "FK_5fa1e0b256a41ed68d40521fabb"`);
        await queryRunner.query(`DROP TABLE "song-performers"`);
        await queryRunner.query(`DROP TABLE "song-writers"`);
        await queryRunner.query(`DROP TABLE "venues"`);
        await queryRunner.query(`DROP TABLE "shows"`);
        await queryRunner.query(`DROP TABLE "festivals"`);
    }

}
