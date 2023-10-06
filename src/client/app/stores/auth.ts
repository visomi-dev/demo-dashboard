import { type Store, createStore, type SetStoreFunction } from 'solid-js/store';

interface State {
  user: string | null;
}

interface Actions {
  signIn: (user: string, password: string) => void;
}

export const [store, update] = createStore<State>({
  user: null,
});

export const actions: Actions = {
  signIn: (user, password) => {
    if (user === 'admin' && password === 'admin') {
      update({ user });
    }
  },
};

export const useAuth = (): {
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
