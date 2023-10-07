import { type Component, createMemo, For } from 'solid-js';
import { Link, useLocation } from '@solidjs/router';
import { HiOutlineBars3, HiOutlineChartPie } from 'solid-icons/hi';

import { type MenuItem } from '../../entities/ui';

import { useAuth } from '../../stores/auth';
import { useUI } from '../../stores/ui';

export const NavbarMenu: Component = () => {
  const location = useLocation();

  const auth = useAuth();
  const ui = useUI();

  const items = createMemo<MenuItem[]>(() => {
    if (auth.state.user == null) {
      return [];
    }

    return [
      {
        label: 'Dashboard',
        icon: HiOutlineChartPie,
        link: '/dashboard',
      },
    ];
  });

  return (
    <nav class="w-full overflow-x-auto md:hidden">
      <ul class="grid grid-cols-4 grid-rows-1 gap-4 p-2">
        <For each={items()}>
          {(item) => (
            <li class="flex h-full flex-1 items-center justify-center">
              <Link
                href={item.link}
                class="navbar-menu-item focus:ring-primary flex items-center justify-center rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
                classList={{
                  'bg-slate-900 !text-white': location.pathname === item.link,
                }}
              >
                <item.icon class="h-8 w-8" />
              </Link>
            </li>
          )}
        </For>

        <li class="col-start-4 flex h-full flex-1 items-center justify-center">
          <button
            class="flex items-center justify-center rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();

              ui.actions.toggleSidebarMenuOpen();
            }}
          >
            <HiOutlineBars3 class="h-8 w-8" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
