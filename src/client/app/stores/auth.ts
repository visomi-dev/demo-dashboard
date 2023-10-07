import { type Store, createStore, type SetStoreFunction } from 'solid-js/store';

import { ACCESS_TOKEN_KEY } from '@/client/constants/storage';

import server from '@/client/lib/api';

interface State {
  loading: boolean;
  user: string | null;
  token: string | null;
}

interface Actions {
  signUp: (user: string, password: string) => Promise<void>;
  signIn: (user: string, password: string) => Promise<void>;
  getUser: () => Promise<void>;
  signOut: () => void;
}

const [store, update] = createStore<State>({
  loading: false,
  user: null,
  get token() {
    return (
      localStorage.getItem(ACCESS_TOKEN_KEY) ??
      sessionStorage.getItem(ACCESS_TOKEN_KEY)
    );
  },
});

const actions: Actions = {
  signUp: async (user, password) => {
    update({ loading: true });

    try {
      const { data } = await server.api.auth['sign-up'].post({
        username: user,
        password,
      });

      if (data == null || data.error != null) {
        throw new Error(data?.error ?? 'Some error occurred.');
      }

      update({ user: data.username, loading: false });

      sessionStorage.setItem(ACCESS_TOKEN_KEY, data.token);
    } catch (error) {
      update({ loading: false });

      throw error;
    }
  },
  signIn: async (user, password) => {
    update({ loading: true });

    try {
      const { data } = await server.api.auth['sign-in'].post({
        username: user,
        password,
      });

      if (data == null || data.error != null) {
        throw new Error(data?.error ?? 'Some error occurred.');
      }

      update({ user: data.username, loading: false });

      sessionStorage.setItem(ACCESS_TOKEN_KEY, data.token);
    } catch (error) {
      update({ loading: false });

      throw error;
    }
  },
  getUser: async () => {
    const token = store.token;

    if (token == null) {
      return;
    }

    try {
      const { data } = await server.api.auth.me.get({
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data == null || data.error != null) {
        throw new Error(data?.error ?? 'Some error occurred.');
      }

      update({ user: data?.username, loading: false });
    } catch (error) {
      update({ loading: false });

      throw error;
    }
  },
  signOut: () => {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);

    update({ user: null, loading: false });
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
