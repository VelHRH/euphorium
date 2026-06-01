import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import {
  CreateEventInput,
  CreateEventOutput,
  Event,
  GetEventInput,
  GetEventOutput,
  ListEventsOutput,
  PaginationInput,
} from 'shared';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import { BadRequestException, NotFoundException } from '$exceptions';
import { PaginationService } from '$modules/pagination/pagination.service';
import { EventExceptionMessage } from './event.exceptions';
import { EventEntity } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly paginationService: PaginationService,
  ) {}

  async findOne(
    where: FindOptionsWhere<EventEntity>,
    select?: FindOptionsSelect<EventEntity>,
  ): Promise<Either<NotFoundException, Event>> {
    const event = await this.eventRepository.findOne({
      where,
      select,
    });

    if (!event) {
      return left(new NotFoundException(EventExceptionMessage.EVENT_NOT_FOUND));
    }

    return right(event);
  }

  get(
    input: GetEventInput,
  ): Promise<Either<NotFoundException, GetEventOutput>> {
    return this.findOne({ id: input.id });
  }

  async create(
    input: CreateEventInput,
  ): Promise<Either<BadRequestException, CreateEventOutput>> {
    try {
      const savedEvent = await this.eventRepository.save(input);

      return right(savedEvent);
    } catch (error) {
      console.error(error);
      return left(
        new BadRequestException(EventExceptionMessage.CANNOT_CREATE_EVENT),
      );
    }
  }

  async list(
    input: PaginationInput,
  ): Promise<Either<BadRequestException, ListEventsOutput>> {
    try {
      const events = await this.eventRepository.find();

      return right(
        this.paginationService.paginate({ items: events, ...input }),
      );
    } catch (error) {
      console.error(error);
      return left(
        new BadRequestException(EventExceptionMessage.EVENT_NOT_FOUND),
      );
    }
  }
}
