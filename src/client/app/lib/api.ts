import { edenTreaty } from '@elysiajs/eden';

import type { App } from '../../../server/app';

const url = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const client = edenTreaty<App>(url);

export default client;
