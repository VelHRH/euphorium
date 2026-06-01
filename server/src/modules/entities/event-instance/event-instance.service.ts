import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import {
  CreateEventInstanceInput,
  CreateEventInstanceOutput,
  GetEventInstanceInput,
  GetEventInstanceOutput,
  ListEventInstancesOutput,
  PaginationInput,
} from 'shared';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import { BadRequestException, NotFoundException } from '$exceptions';
import { PaginationService } from '$modules/pagination/pagination.service';
import { EventInstanceEntity } from './event-instance.entity';
import { EventInstanceExceptionMessage } from './event-instance.exceptions';

@Injectable()
export class EventInstanceService {
  constructor(
    @InjectRepository(EventInstanceEntity)
    private readonly eventInstanceRepository: Repository<EventInstanceEntity>,
    private readonly paginationService: PaginationService,
  ) {}

  async findOne(
    where: FindOptionsWhere<EventInstanceEntity>,
    select?: FindOptionsSelect<EventInstanceEntity>,
  ): Promise<Either<NotFoundException, EventInstanceEntity>> {
    const eventInstance = await this.eventInstanceRepository.findOne({
      where,
      select,
    });

    if (!eventInstance) {
      return left(
        new NotFoundException(
          EventInstanceExceptionMessage.EVENT_INSTANCE_NOT_FOUND,
        ),
      );
    }

    return right(eventInstance);
  }

  get(
    input: GetEventInstanceInput,
  ): Promise<Either<NotFoundException, GetEventInstanceOutput>> {
    return this.findOne({ id: input.id });
  }

  async create(
    input: CreateEventInstanceInput,
  ): Promise<Either<BadRequestException, CreateEventInstanceOutput>> {
    try {
      const savedEventInstance = await this.eventInstanceRepository.save(input);

      return right(savedEventInstance);
    } catch (error) {
      console.error(error);
      return left(
        new BadRequestException(
          EventInstanceExceptionMessage.CANNOT_CREATE_EVENT_INSTANCE,
        ),
      );
    }
  }

  async list(
    input: PaginationInput,
  ): Promise<Either<BadRequestException, ListEventInstancesOutput>> {
    try {
      const eventInstances = await this.eventInstanceRepository.find();

      return right(
        this.paginationService.paginate({ items: eventInstances, ...input }),
      );
    } catch (error) {
      console.error(error);
      return left(
        new BadRequestException(
          EventInstanceExceptionMessage.EVENT_INSTANCE_NOT_FOUND,
        ),
      );
    }
  }
}
