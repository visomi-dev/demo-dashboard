import { edenTreaty } from '@elysiajs/eden';

import type { App } from '../../../server/app';

const url = import.meta.env.VITE_API_URL ?? '/';

const client = edenTreaty<App>(url.replace(/\/$/, ''));

export default client;
