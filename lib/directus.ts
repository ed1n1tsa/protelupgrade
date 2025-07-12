import { createDirectus, rest, DirectusClient } from '@directus/sdk';

// если у тебя нет кастомной схемы:
type Schema = any;

export const client: DirectusClient<Schema> = createDirectus<Schema>('https://directus-protel.onrender.com').with(rest());
