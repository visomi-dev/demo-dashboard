import { lazy, type Component } from 'solid-js';
import {
  type RouteDefinition,
  Router as SolidRouter,
  useRoutes,
} from '@solidjs/router';

import { useAuth } from './stores/auth';

const anonymousRoutes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(async () => await import('./pages/authentication/sign-in')),
  },
  {
    path: '/sign-up',
    component: lazy(async () => await import('./pages/authentication/sign-in')),
  },
  {
    path: '/sign-in',
    component: lazy(async () => await import('./pages/authentication/sign-in')),
  },
];

const authenticatedRoutes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(async () => await import('./pages/dashboard')),
  },
];

export const Router: Component = () => {
  const [auth] = useAuth();

  const AuthenticatedRoutes = useRoutes(authenticatedRoutes);
  const AnonymousRoutes = useRoutes(anonymousRoutes);

  return (
    <SolidRouter>
      {auth.user == null ? <AnonymousRoutes /> : <AuthenticatedRoutes />}
    </SolidRouter>
  );
};
