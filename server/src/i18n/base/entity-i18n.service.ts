import { I18nService } from 'nestjs-i18n';

import { ExceptionsI18nKey } from '$i18n/keys/exceptions';
import { BadRequestException } from '$exceptions';
import { NotFoundException } from '$exceptions';

export abstract class LocalizedEntityService {
  constructor(protected readonly i18n: I18nService) {}

  protected abstract localizedEntityKey(): string;

  protected entityName(): string {
    return this.i18n.t(this.localizedEntityKey());
  }

  private notFoundMessage(): string {
    return this.i18n.t(ExceptionsI18nKey.NOT_FOUND, {
      args: { entity: this.entityName() },
    });
  }

  private cannotCreateMessage(): string {
    return this.i18n.t(ExceptionsI18nKey.CANNOT_CREATE, {
      args: { entity: this.entityName() },
    });
  }

  protected notFound(): NotFoundException {
    return new NotFoundException(this.notFoundMessage());
  }

  protected cannotCreate(): BadRequestException {
    return new BadRequestException(this.cannotCreateMessage());
  }
}
