import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import {
  CreateVenueInput,
  CreateVenueOutput,
  GetVenueInput,
  GetVenueOutput,
  ListVenuesOutput,
  PaginationInput,
  Venue,
} from 'shared';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import { BadRequestException, NotFoundException } from '$exceptions';
import { VenueEntity } from './venue.entity';
import { VenueExceptionMessage } from '$exceptions/constants/venue';
import { PaginationService } from '$modules/pagination/pagination.service';

@Injectable()
export class VenueService {
  constructor(
    @InjectRepository(VenueEntity)
    private readonly venueRepository: Repository<VenueEntity>,
    private readonly paginationService: PaginationService,
  ) {}

  async findOne(
    where: FindOptionsWhere<VenueEntity>,
    select?: FindOptionsSelect<VenueEntity>,
  ): Promise<Either<NotFoundException, Venue>> {
    const venue = await this.venueRepository.findOne({
      where,
      select,
    });

    if (!venue) {
      return left(new NotFoundException(VenueExceptionMessage.VENUE_NOT_FOUND));
    }

    return right(venue);
  }

  get(
    input: GetVenueInput,
  ): Promise<Either<NotFoundException, GetVenueOutput>> {
    return this.findOne({ id: input.id });
  }

  async create(
    input: CreateVenueInput,
  ): Promise<Either<BadRequestException, CreateVenueOutput>> {
    try {
      const { cityId, ...venueData } = input;
      const savedVenue = await this.venueRepository.save({
        ...venueData,
        city: { id: cityId },
      });

      return right(savedVenue);
    } catch (error) {
      console.error(error);
      return left(
        new BadRequestException(VenueExceptionMessage.CANNOT_CREATE_VENUE),
      );
    }
  }

  async list(
    input: PaginationInput,
  ): Promise<Either<BadRequestException, ListVenuesOutput>> {
    try {
      const venues = await this.venueRepository.find();

      return right(
        this.paginationService.paginate({ items: venues, ...input }),
      );
    } catch (error) {
      console.error(error);
      return left(
        new BadRequestException(VenueExceptionMessage.VENUE_NOT_FOUND),
      );
    }
  }
}
