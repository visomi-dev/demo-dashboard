import { For, type Component } from 'solid-js';
import { Navigate, Route, Router, Routes } from '@solidjs/router';

import { SIGN_IN_PATH, SIGN_OUT_PATH } from './constants/routes';

import { routes } from './routes';

import { Anonymous } from './guards/anonymous';
import { Authenticated } from './guards/authenticated';

import { Layout } from './components/layout';

import SignOut from './pages/authentication/sign-out';

export const App: Component = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate href={SIGN_IN_PATH} />} />
          <Route path={SIGN_OUT_PATH} element={<SignOut />} />

          <For each={routes}>
            {({ path, component: Component, anonymous }) => {
              if (anonymous) {
                return (
                  <Route
                    path={path}
                    element={
                      <Anonymous>
                        <Component />
                      </Anonymous>
                    }
                  />
                );
              }

              return (
                <Route
                  path={path}
                  element={
                    <Authenticated>
                      <Component />
                    </Authenticated>
                  }
                />
              );
            }}
          </For>
        </Routes>
      </Layout>
    </Router>
  );
};
