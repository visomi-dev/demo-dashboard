import { type Store, createStore, type SetStoreFunction } from 'solid-js/store';

interface State {
  user: string | null;
}

export const [store, update] = createStore<State>({
  user: null,
});

export const useAuth = (): [
  get: Store<State>,
  set: SetStoreFunction<State>,
] => {
  return [store, update];
};
