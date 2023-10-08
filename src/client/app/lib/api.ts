import { edenTreaty } from '@elysiajs/eden';

import type { App } from '../../../server/app';

const url = import.meta.env.VITE_API_URL ?? '/';

console.log('API URL:', url);

const client = edenTreaty<App>(url.replace(/\/$/, ''));

export default client;
