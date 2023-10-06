import { type Store, createStore, type SetStoreFunction } from 'solid-js/store';

type Theme = 'light' | 'dark';

interface State {
  theme: Theme;
  loading: boolean;
  sidebarMenuOpen: boolean;
  sidebarWorkspaceOpen: boolean;
  navigating: boolean;
  isDarkTheme: boolean;
}

interface Actions {
  toggleTheme: () => void;
  toggleSidebarMenuOpen: () => void;
  toggleSidebarWorkspaceOpen: () => void;
  toggleLoading: () => void;
  setTheme: (value: Theme) => void;
  setSidebarMenuOpen: (value: boolean) => void;
  setSidebarWorkspaceOpen: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

export const [store, update] = createStore<State>({
  theme: 'light',
  loading: false,
  sidebarMenuOpen: false,
  sidebarWorkspaceOpen: false,
  navigating: false,

  get isDarkTheme() {
    return this.theme === 'dark';
  },
});

export const actions: Actions = {
  toggleTheme: () => {
    update((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    }));
  },
  toggleSidebarMenuOpen: () => {
    update((state) => ({
      sidebarMenuOpen: !state.sidebarMenuOpen,
    }));
  },
  toggleSidebarWorkspaceOpen: () => {
    update((state) => ({
      sidebarWorkspaceOpen: !state.sidebarWorkspaceOpen,
    }));
  },
  toggleLoading: () => {
    update((state) => ({
      loading: !state.loading,
    }));
  },
  setTheme: (value) => {
    update({ theme: value });
  },
  setSidebarMenuOpen: (value) => {
    update({ sidebarMenuOpen: value });
  },
  setSidebarWorkspaceOpen: (value) => {
    update({ sidebarWorkspaceOpen: value });
  },
  setLoading: (value) => {
    update({ loading: value });
  },
};

export const useUI = (): {
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
