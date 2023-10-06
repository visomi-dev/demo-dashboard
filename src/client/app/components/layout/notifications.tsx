import { type Component, For } from 'solid-js';
import clsx from 'clsx';
import { useNotifications } from '../../stores/notifications';
import { Button } from '../ui/button';
import { HiOutlineXMark } from 'solid-icons/hi';

export const Notifications: Component = () => {
  const notifications = useNotifications();

  return (
    <div class="fixed bottom-16 right-0 z-20 flex w-full items-center md:absolute md:bottom-auto md:top-0 md:w-fit">
      <ul
        class={clsx('w-full space-y-2 md:w-fit', {
          'p-4': notifications.state.list.length,
        })}
      >
        <For each={notifications.state.list}>
          {(notification) => (
            <li class="pointer-events-auto flex w-full items-start gap-2 rounded-lg bg-white p-2 pl-4 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-black dark:ring-white md:w-fit">
              {notification.icon && (
                <notification.icon class="w-8 flex-shrink-0 p-0.5" />
              )}

              <div class="flex w-0 flex-1 flex-col flex-wrap gap-2 pt-0.5 md:w-fit md:max-w-xs">
                <p class="flex-wrap text-lg font-semibold">
                  {notification.title}
                </p>

                {notification.description && (
                  <p class="mt-1 text-sm">{notification.description}</p>
                )}

                {notification.actions && (
                  <div class="flex gap-2">
                    <For each={notification.actions}>
                      {(action) => (
                        <Button
                          type="button"
                          variant={action.variant}
                          onClick={action.callback}
                        >
                          {action.label}
                        </Button>
                      )}
                    </For>
                  </div>
                )}
              </div>

              <div class="flex flex-shrink-0">
                {notification.canClose && (
                  <button
                    type="button"
                    class="h-8 w-8 rounded-lg p-1"
                    onClick={() => {
                      notifications.actions.delete(notification.timestamp);
                    }}
                  >
                    <span class="sr-only">Close Notification</span>

                    <HiOutlineXMark class="w-6" />
                  </button>
                )}
              </div>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};
