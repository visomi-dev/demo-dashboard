import { type Store, createStore, type SetStoreFunction } from 'solid-js/store';

import { type Notification } from '../entities/notifications';

export interface State {
  list: Notification[];
}

export interface Actions {
  add: (
    notification: Partial<Notification> & Pick<Notification, 'title'>,
  ) => void;
  delete: (timestamp: number) => void;
}

const [store, update] = createStore<State>({
  list: [],
});

const actions: Actions = {
  add: ({
    timestamp = new Date().getTime(),
    canClose = true,
    duration,
    ...notification
  }: Partial<Notification> & Pick<Notification, 'title'>) => {
    update((state) => {
      if (duration) {
        setTimeout(() => {
          update((state) => {
            const list = [...state.list];

            const itemIndex = list.findIndex(
              (notification) => notification.timestamp === timestamp,
            );

            if (itemIndex > -1) {
              list.splice(itemIndex, 1);
            }

            return {
              list: [...list],
            };
          });
        }, duration);
      }

      return {
        list: [
          ...state.list,
          {
            ...notification,
            timestamp,
            canClose,
          },
        ],
      };
    });
  },
  delete: (timestamp: number) => {
    update((state) => {
      const list = [...state.list];

      const itemIndex = list.findIndex(
        (notification) => notification.timestamp === timestamp,
      );

      if (itemIndex > -1) {
        list.splice(itemIndex, 1);
      }

      return { list: [...list] };
    });
  },
};

export const useNotifications = (): {
  state: Store<State>;
  update: SetStoreFunction<State>;
  actions: Actions;
} => {
  return {
    state: store,
    update,
    actions,
  };
};
