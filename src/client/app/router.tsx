import { lazy, type Component } from 'solid-js';
import {
  type RouteDefinition,
  Router as SolidRouter,
  useRoutes,
} from '@solidjs/router';
import { Layout } from './components/layout';

const routes: RouteDefinition[] = [
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
  {
    path: '/',
    component: lazy(async () => await import('./pages/dashboard')),
  },
];

export const Router: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <SolidRouter>
      <Layout>
        <Routes />
      </Layout>
    </SolidRouter>
  );
};
