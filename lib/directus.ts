// lib/directus.ts

import { createDirectus, rest } from '@directus/sdk';

export const directus = createDirectus('https://directus-protel.onrender.com').with(rest());
