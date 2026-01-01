import { z } from 'zod';
import { GroupMember } from '../../types';
import { artistSchema } from '../artist';
import { baseSchema } from '../database';
import { groupSchema } from '../group';

export const groupMemberSchema = baseSchema.extend({
  group: groupSchema,
  artist: artistSchema,
}) satisfies z.ZodType<GroupMember>;
