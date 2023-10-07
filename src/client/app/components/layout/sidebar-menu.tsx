import { type Component, For, createMemo, Show } from 'solid-js';
import { Link, useLocation } from '@solidjs/router';
import {
  HiOutlineArrowLeftOnRectangle,
  HiOutlineChartPie,
  HiOutlineUser,
} from 'solid-icons/hi';
import clsx from 'clsx';

import { SIGN_OUT_PATH } from '../../constants/routes';

import { useUI } from '../../stores/ui';
import { useAuth } from '../../stores/auth';
import { type MenuItem } from '../../entities/ui';

export const SidebarMenu: Component = () => {
  let element: HTMLDivElement;

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

  const sidebarMenuOpen = createMemo(() => {
    return ui.state.sidebarMenuOpen;
  });

  const onClickOutside = (): void => {
    ui.actions.setSidebarMenuOpen(false);
  };

  return (
    <div
      class="absolute md:relative"
      classList={{
        'dark:bg-soft-gray z-20 inset-0 flex h-screen w-screen bg-black bg-opacity-50 dark:bg-opacity-25 md:h-fit md:w-fit':
          sidebarMenuOpen(),
      }}
    >
      <aside
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ref={element!}
        class="relative z-30 flex h-screen flex-col overflow-y-auto overflow-x-hidden border-r-black bg-white transition-all dark:border-r-white dark:bg-black md:w-fit md:max-w-[16rem] md:border-r"
        classList={{
          'w-0': !sidebarMenuOpen(),
          'w-4/5': sidebarMenuOpen(),
        }}
      >
        <img
          class="mx-auto w-32 p-4"
          src="/assets/images/isotype.svg"
          alt="application isotype"
        />

        <div class="flex flex-1 flex-col justify-between">
          <nav class="flex flex-col gap-4 overflow-x-hidden p-4">
            <ul class="flex flex-col gap-2">
              <For each={items()}>
                {(item) => (
                  <li class={clsx('flex w-full items-center', item.extraClass)}>
                    <Link
                      href={`${item.link}?${item.queryParams ?? ''}`}
                      class="sidebar-menu-item flex w-full items-center rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black md:gap-2"
                      classList={{
                        'sidebar-menu-item-active bg-slate-900 !text-white':
                          location.pathname === item.link,
                      }}
                      onClick={onClickOutside}
                    >
                      <item.icon
                        class={clsx('w-8', item.iconClass)}
                        classList={{
                          'mr-2': sidebarMenuOpen(),
                        }}
                      />

                      <span
                        class="overflow-hidden transition-all"
                        classList={{
                          'h-0 md:h-fit': !sidebarMenuOpen(),
                        }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                )}
              </For>
            </ul>
          </nav>

          <nav class="flex flex-col p-4">
            <ul>
              <li
                class="flex items-center"
                classList={{
                  'md:justify-center': sidebarMenuOpen(),
                }}
              >
                <a class="flex items-center gap-2 p-2">
                  <HiOutlineUser class="h-8 w-8" />

                  <div class="overflow-hidden">
                    <div class="font-bold">{auth.state.user}</div>
                  </div>
                </a>
              </li>

              <li
                class="flex items-center"
                classList={{
                  'md:justify-center': sidebarMenuOpen(),
                }}
              >
                <Link
                  class="flex items-center gap-2 p-2"
                  href={SIGN_OUT_PATH}
                  onClick={onClickOutside}
                >
                  <HiOutlineArrowLeftOnRectangle class="h-8 w-8" />

                  <span
                    class="overflow-hidden transition-all"
                    classList={{
                      'h-0 md:h-fit': !sidebarMenuOpen(),
                    }}
                  >
                    Sign Out
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <Show when={sidebarMenuOpen()}>
        <div
          class="h-full w-1/5 opacity-0 md:hidden"
          onClick={() => {
            onClickOutside();
          }}
        />
      </Show>
    </div>
  );
};
