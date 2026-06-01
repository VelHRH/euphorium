import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import {
  City,
  CreateCityInput,
  CreateCityOutput,
  GetCityOutput,
  GetLocationInput,
  ListCitiesOutput,
  PaginationInput,
} from 'shared';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import { BadRequestException, NotFoundException } from '$exceptions';
import { CityEntity } from './city.entity';
import { PaginationService } from '$modules/pagination/pagination.service';
import { CityExceptionMessage } from './city.exceptions';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly paginationService: PaginationService,
  ) {}

  async findOne(
    where: FindOptionsWhere<CityEntity>,
    select?: FindOptionsSelect<CityEntity>,
  ): Promise<Either<NotFoundException, City>> {
    const city = await this.cityRepository.findOne({
      where,
      select,
    });

    if (!city) {
      return left(new NotFoundException(CityExceptionMessage.CITY_NOT_FOUND));
    }

    return right(city);
  }

  get(
    input: GetLocationInput,
  ): Promise<Either<NotFoundException, GetCityOutput>> {
    return this.findOne({ id: input.id });
  }

  async create(
    input: CreateCityInput,
  ): Promise<Either<BadRequestException, CreateCityOutput>> {
    try {
      const savedCity = await this.cityRepository.save(input);

      return right(savedCity);
    } catch (error) {
      console.error(error);
      return left(
        new BadRequestException(CityExceptionMessage.CANNOT_CREATE_CITY),
      );
    }
  }

  async list(
    input: PaginationInput,
  ): Promise<Either<BadRequestException, ListCitiesOutput>> {
    try {
      const cities = await this.cityRepository.find();

      return right(
        this.paginationService.paginate({ items: cities, ...input }),
      );
    } catch (error) {
      console.error(error);
      return left(
        new BadRequestException(CityExceptionMessage.CANNOT_CREATE_CITY),
      );
    }
  }
}
