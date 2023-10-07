import { lazy } from 'solid-js';

import { DASHBOARD_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from './constants/routes';

export const routes = [
  {
    path: SIGN_UP_PATH,
    component: lazy(async () => await import('./pages/authentication/sign-up')),
    anonymous: true,
  },
  {
    path: SIGN_IN_PATH,
    component: lazy(async () => await import('./pages/authentication/sign-in')),
    anonymous: true,
  },
  {
    path: DASHBOARD_PATH,
    component: lazy(async () => await import('./pages/dashboard')),
  },
];
