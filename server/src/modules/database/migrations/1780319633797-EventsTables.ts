import { MigrationInterface, QueryRunner } from "typeorm";

export class EventsTables1780319633797 implements MigrationInterface {
    name = 'EventsTables1780319633797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "description_embedding" double precision array NOT NULL DEFAULT '{}', CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "type" character varying NOT NULL, "city_id" uuid, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event-instances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "time_start" TIMESTAMP NOT NULL, "time_end" TIMESTAMP NOT NULL, "special_name" character varying, "rating" double precision, "event_id" uuid, "location_id" uuid, CONSTRAINT "PK_60813fab3e8ed2bb6862da57f28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event-reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "rating" double precision NOT NULL, "comment" character varying NOT NULL, "comment_embedding" double precision array NOT NULL DEFAULT '{}', "event_instance_id" uuid, CONSTRAINT "PK_2f522669eac98fa238ba0d60aa1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "locations" ADD CONSTRAINT "FK_6793ebdac5c08faf9f8d48a2b99" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event-instances" ADD CONSTRAINT "FK_36ac23d424e1981fb0958ae61a4" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event-instances" ADD CONSTRAINT "FK_e2634fad1c7332e51024cf6d5d2" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event-reviews" ADD CONSTRAINT "FK_b38c22cbe8261af29f877058004" FOREIGN KEY ("event_instance_id") REFERENCES "event-instances"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event-reviews" DROP CONSTRAINT "FK_b38c22cbe8261af29f877058004"`);
        await queryRunner.query(`ALTER TABLE "event-instances" DROP CONSTRAINT "FK_e2634fad1c7332e51024cf6d5d2"`);
        await queryRunner.query(`ALTER TABLE "event-instances" DROP CONSTRAINT "FK_36ac23d424e1981fb0958ae61a4"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP CONSTRAINT "FK_6793ebdac5c08faf9f8d48a2b99"`);
        await queryRunner.query(`DROP TABLE "event-reviews"`);
        await queryRunner.query(`DROP TABLE "event-instances"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "events"`);
    }

}
