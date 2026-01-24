import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateShowImagesApproach1768342994407 implements MigrationInterface {
    name = 'UpdateShowImagesApproach1768342994407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "countryCode" character varying NOT NULL, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group-members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "groupId" uuid, "artistId" uuid, CONSTRAINT "PK_6cf00d81f0f4855a513ac2b8e3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "imgPath" character varying, "socialId" uuid, CONSTRAINT "REL_7a539a1aa08caa4961ae168c70" UNIQUE ("socialId"), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "venues" DROP COLUMN "countryCode"`);
        await queryRunner.query(`ALTER TABLE "venues" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "festivals" ADD "imgPaths" character varying array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "venues" ADD "cityId" uuid`);
        await queryRunner.query(`ALTER TABLE "songs" ADD "groupId" uuid`);
        await queryRunner.query(`ALTER TABLE "songs" ALTER COLUMN "album" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venues" ADD CONSTRAINT "FK_dff93f57c684c920ca09175d1ad" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group-members" ADD CONSTRAINT "FK_41baa2a552166436d8e2a037a7a" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group-members" ADD CONSTRAINT "FK_1f0b355f60e019e32c1404a837b" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_7a539a1aa08caa4961ae168c700" FOREIGN KEY ("socialId") REFERENCES "socials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_348ceef2165d4fcb592a77acb41" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_348ceef2165d4fcb592a77acb41"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_7a539a1aa08caa4961ae168c700"`);
        await queryRunner.query(`ALTER TABLE "group-members" DROP CONSTRAINT "FK_1f0b355f60e019e32c1404a837b"`);
        await queryRunner.query(`ALTER TABLE "group-members" DROP CONSTRAINT "FK_41baa2a552166436d8e2a037a7a"`);
        await queryRunner.query(`ALTER TABLE "venues" DROP CONSTRAINT "FK_dff93f57c684c920ca09175d1ad"`);
        await queryRunner.query(`ALTER TABLE "songs" ALTER COLUMN "album" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "groupId"`);
        await queryRunner.query(`ALTER TABLE "venues" DROP COLUMN "cityId"`);
        await queryRunner.query(`ALTER TABLE "festivals" DROP COLUMN "imgPaths"`);
        await queryRunner.query(`ALTER TABLE "venues" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venues" ADD "countryCode" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "group-members"`);
        await queryRunner.query(`DROP TABLE "cities"`);
    }

}
