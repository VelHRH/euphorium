import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { StrategyName } from '../constants';

@Injectable()
export class GoogleAuthGuard extends AuthGuard(StrategyName.GOOGLE) {}
