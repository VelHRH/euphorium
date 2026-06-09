import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import {
  CreateLocationInput,
  CreateLocationOutput,
  GetLocationInput,
  GetLocationOutput,
  ListLocationsOutput,
  PaginationInput,
  Location,
} from 'shared';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import { BadRequestException, NotFoundException } from '$exceptions';
import { PaginationService } from '$modules/pagination/pagination.service';
import { LocationEntity } from './location.entity';
import { I18nService } from 'nestjs-i18n';
import { LocalizedEntityService } from '$i18n/base/entity-i18n.service';
import { LocationI18nKey } from '$i18n/keys/location';

@Injectable()
export class LocationService extends LocalizedEntityService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
    private readonly paginationService: PaginationService,
    i18n: I18nService,
  ) {
    super(i18n);
  }

  protected localizedEntityKey(): string {
    return LocationI18nKey.LOCATION;
  }

  async findOne(
    where: FindOptionsWhere<LocationEntity>,
    select?: FindOptionsSelect<LocationEntity>,
  ): Promise<Either<NotFoundException, Location>> {
    const location = await this.locationRepository.findOne({
      where,
      select,
      relations: ['city'],
    });

    if (!location) {
      return left(this.notFound());
    }

    return right(location);
  }

  get(
    input: GetLocationInput,
  ): Promise<Either<NotFoundException, GetLocationOutput>> {
    return this.findOne({ id: input.id });
  }

  async create(
    input: CreateLocationInput,
  ): Promise<Either<BadRequestException, CreateLocationOutput>> {
    try {
      const { cityId, ...locationData } = input;
      const savedLocation = await this.locationRepository.save({
        ...locationData,
        city: { id: cityId },
      });

      const location = await this.locationRepository.findOne({
        where: { id: savedLocation.id },
        relations: ['city'],
      });

      if (!location) {
        return left(this.cannotCreate());
      }

      return right(location);
    } catch (error) {
      console.error(error);
      return left(this.cannotCreate());
    }
  }

  async list(
    input: PaginationInput,
  ): Promise<Either<BadRequestException, ListLocationsOutput>> {
    try {
      const locations = await this.locationRepository.find({
        relations: ['city'],
      });

      return right(
        this.paginationService.paginate({ items: locations, ...input }),
      );
    } catch (error) {
      console.error(error);
      return left(this.notFound());
    }
  }
}
