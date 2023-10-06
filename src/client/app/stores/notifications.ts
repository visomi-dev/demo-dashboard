import { type Store, createStore, type SetStoreFunction } from 'solid-js/store';

import { type Notification } from '../entities/notifications';

export interface State {
  list: Notification[];
}

export interface Actions {
  add: (notification: Notification) => void;
  delete: (timestamp: number) => void;
}

export const [store, update] = createStore<State>({
  list: [],
});

export const actions: Actions = {
  add: ({
    timestamp = new Date().getTime(),
    canClose = true,
    duration,
    ...notification
  }: Partial<Notification> & Pick<Notification, 'title'>) => {
    update((state) => {
      if (duration) {
        setTimeout(() => {
          const itemIndex = state.list.findIndex(
            (notification) => notification.timestamp === timestamp,
          );

          if (itemIndex > 0) {
            state.list.splice(itemIndex, 1);
          }

          update((state) => ({
            list: [...state.list],
          }));
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
      const itemIndex = state.list.findIndex(
        (notification) => notification.timestamp === timestamp,
      );

      if (itemIndex > 0) {
        state.list.splice(itemIndex, 1);
      }

      return { list: [...state.list] };
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
