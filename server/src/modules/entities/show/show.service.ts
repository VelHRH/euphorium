import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import {
  CreateShowInput,
  CreateShowOutput,
  GetShowInput,
  GetShowOutput,
  ListShowsOutput,
  PaginationInput,
  Show,
} from 'shared';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import { BadRequestException, NotFoundException } from '$exceptions';
import { PaginationService } from '$modules/pagination/pagination.service';
import { ShowEntity } from './show.entity';
import { ShowExceptionMessage } from '$exceptions/constants/show';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(ShowEntity)
    private readonly showRepository: Repository<ShowEntity>,
    private readonly paginationService: PaginationService,
  ) {}

  async findOne(
    where: FindOptionsWhere<ShowEntity>,
    select?: FindOptionsSelect<ShowEntity>,
  ): Promise<Either<NotFoundException, Show>> {
    const show = await this.showRepository.findOne({
      where,
      select,
    });

    if (!show) {
      return left(new NotFoundException(ShowExceptionMessage.SHOW_NOT_FOUND));
    }

    return right(show);
  }

  get(input: GetShowInput): Promise<Either<NotFoundException, GetShowOutput>> {
    return this.findOne({ id: input.id });
  }

  async create(
    input: CreateShowInput,
  ): Promise<Either<BadRequestException, CreateShowOutput>> {
    try {
      const savedShow = await this.showRepository.save(input);

      return right(savedShow);
    } catch (error) {
      console.error(error);
      return left(
        new BadRequestException(ShowExceptionMessage.CANNOT_CREATE_SHOW),
      );
    }
  }

  async list(
    input: PaginationInput,
  ): Promise<Either<BadRequestException, ListShowsOutput>> {
    try {
      const shows = await this.showRepository.find();

      return right(this.paginationService.paginate({ items: shows, ...input }));
    } catch (error) {
      console.error(error);
      return left(new BadRequestException(ShowExceptionMessage.SHOW_NOT_FOUND));
    }
  }
}
