import { z } from 'zod';
import { GroupMembers } from '../../types';
import { artistSchema } from '../artist';
import { baseSchema } from '../database';
import { groupSchema } from '../group';

export const groupMembersSchema = baseSchema.extend({
  group: groupSchema,
  artist: artistSchema,
}) satisfies z.ZodType<GroupMembers>;
