import { type JSX, type Component } from 'solid-js';
import { Outlet } from '@solidjs/router';

import { useAuth } from '../../stores/auth';
import { SidebarMenu } from './sidebar-menu';
import { NavbarMenu } from './navbar-menu';
import { PageNavigationLoader } from './page-navigation-loader';
import { Notifications } from './notifications';

export const Layout: Component<{ children: JSX.Element }> = (props) => {
  const auth = useAuth();

  return (
    <div class="flex h-screen w-full flex-col md:flex-row">
      {auth.state.user && <SidebarMenu />}

      <main class="relative flex flex-1 flex-col items-center justify-center overflow-y-auto overflow-x-hidden md:p-0">
        <Notifications />

        <Outlet />

        {props.children}
      </main>

      {auth.state.user && <NavbarMenu />}

      <PageNavigationLoader />
    </div>
  );
};
