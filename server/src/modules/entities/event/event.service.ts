import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import { I18nService } from 'nestjs-i18n';
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

import {
  BadRequestException,
  InternalServerException,
  NotFoundException,
} from '$exceptions';
import { PaginationService } from '$modules/pagination/pagination.service';
import { EventI18nKey } from '$i18n/keys/event';
import { EventEntity } from './event.entity';
import { LocalizedEntityService } from '$i18n/base/entity-i18n.service';
import { EmbeddingService } from '$modules/embedding/embedding.service';

@Injectable()
export class EventService extends LocalizedEntityService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly paginationService: PaginationService,
    private readonly embeddingService: EmbeddingService,
    i18n: I18nService,
  ) {
    super(i18n);
  }

  protected localizedEntityKey(): string {
    return EventI18nKey.EVENT;
  }

  async findOne(
    where: FindOptionsWhere<EventEntity>,
    select?: FindOptionsSelect<EventEntity>,
  ): Promise<Either<NotFoundException, Event>> {
    const event = await this.eventRepository.findOne({
      where,
      select,
    });

    if (!event) {
      return left(this.notFound());
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
  ): Promise<
    Either<BadRequestException | InternalServerException, CreateEventOutput>
  > {
    const embeddingResult = await this.embeddingService.embed(
      input.description,
    );

    if (embeddingResult.isLeft()) {
      return left(embeddingResult.value);
    }

    try {
      const savedEvent = await this.eventRepository.save({
        ...input,
        descriptionEmbedding: embeddingResult.value,
      });

      return right(savedEvent);
    } catch (error) {
      console.error(error);
      return left(this.cannotCreate());
    }
  }

  async list(
    input: PaginationInput,
  ): Promise<Either<NotFoundException, ListEventsOutput>> {
    try {
      const events = await this.eventRepository.find();

      return right(
        this.paginationService.paginate({ items: events, ...input }),
      );
    } catch (error) {
      console.error(error);
      return left(this.notFound());
    }
  }
}
