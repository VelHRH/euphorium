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
import { LocalizedEntityService } from '$i18n/base/entity-i18n.service';
import { I18nService } from 'nestjs-i18n';
import { EventI18nKey } from '$i18n/keys/event';

@Injectable()
export class EventInstanceService extends LocalizedEntityService {
  constructor(
    @InjectRepository(EventInstanceEntity)
    private readonly eventInstanceRepository: Repository<EventInstanceEntity>,
    private readonly paginationService: PaginationService,
    i18n: I18nService,
  ) {
    super(i18n);
  }

  protected localizedEntityKey(): string {
    return EventI18nKey.EVENT_INSTANCE;
  }

  async findOne(
    where: FindOptionsWhere<EventInstanceEntity>,
    select?: FindOptionsSelect<EventInstanceEntity>,
  ): Promise<Either<NotFoundException, EventInstanceEntity>> {
    const eventInstance = await this.eventInstanceRepository.findOne({
      where,
      select,
    });

    if (!eventInstance) {
      return left(this.notFound());
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
      const { eventId, locationId, ...instanceData } = input;
      const savedEventInstance = await this.eventInstanceRepository.save({
        ...instanceData,
        event: { id: eventId },
        location: { id: locationId },
      });

      return right(savedEventInstance);
    } catch (error) {
      console.error(error);
      return left(this.cannotCreate());
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
      return left(this.notFound());
    }
  }
}
