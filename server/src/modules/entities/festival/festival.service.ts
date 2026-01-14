import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import {
  CreateFestivalInput,
  CreateFestivalOutput,
  Festival,
  GetFestivalInput,
  GetFestivalOutput,
  ListFestivalsOutput,
  PaginationInput,
} from 'shared';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import { BadRequestException, NotFoundException } from '$exceptions';
import { PaginationService } from '$modules/pagination/pagination.service';
import { FestivalEntity } from './festival.entity';
import { FestivalExceptionMessage } from '$exceptions/constants/festival';

@Injectable()
export class FestivalService {
  constructor(
    @InjectRepository(FestivalEntity)
    private readonly festivalRepository: Repository<FestivalEntity>,
    private readonly paginationService: PaginationService,
  ) {}

  async findOne(
    where: FindOptionsWhere<FestivalEntity>,
    select?: FindOptionsSelect<FestivalEntity>,
  ): Promise<Either<NotFoundException, Festival>> {
    const festival = await this.festivalRepository.findOne({
      where,
      select,
    });

    if (!festival) {
      return left(
        new NotFoundException(FestivalExceptionMessage.FESTIVAL_NOT_FOUND),
      );
    }

    return right(festival);
  }

  get(
    input: GetFestivalInput,
  ): Promise<Either<NotFoundException, GetFestivalOutput>> {
    return this.findOne({ id: input.id });
  }

  async create(
    input: CreateFestivalInput,
  ): Promise<Either<BadRequestException, CreateFestivalOutput>> {
    try {
      const savedFestival = await this.festivalRepository.save(input);

      return right(savedFestival);
    } catch (error) {
      console.error(error);
      return left(
        new BadRequestException(
          FestivalExceptionMessage.CANNOT_CREATE_FESTIVAL,
        ),
      );
    }
  }

  async list(
    input: PaginationInput,
  ): Promise<Either<BadRequestException, ListFestivalsOutput>> {
    try {
      const festivals = await this.festivalRepository.find({
        relations: {
          shows: {
            venue: {
              city: true,
            },
          },
        },
      });

      return right(
        this.paginationService.paginate({ items: festivals, ...input }),
      );
    } catch (error) {
      console.error(error);
      return left(
        new BadRequestException(FestivalExceptionMessage.FESTIVAL_NOT_FOUND),
      );
    }
  }
}
