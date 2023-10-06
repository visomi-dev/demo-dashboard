import { type Component, Show, createMemo } from 'solid-js';
import { Motion, Presence } from '@motionone/solid';
import { useIsRouting } from '@solidjs/router';

import { useUI } from '../../stores/ui';

export const PageNavigationLoader: Component = () => {
  const ui = useUI();

  const isRouting = useIsRouting();

  const loading = createMemo(() => {
    return ui.state.loading && isRouting();
  });

  return (
    <Presence>
      <Show when={loading()}>
        <Motion.div
          class="fixed left-0 top-0 z-40 h-screen w-screen bg-white bg-opacity-50"
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        />

        <Motion
          class="fixed top-0 z-50 h-1 w-1/4 rounded bg-slate-900"
          initial={{ x: '-100%' }}
          animate={{ x: '100vw' }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </Show>
    </Presence>
  );
};
