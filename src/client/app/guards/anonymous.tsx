import {
  createSignal,
  type Component,
  type JSXElement,
  createMemo,
  onMount,
  createEffect,
  Show,
} from 'solid-js';
import { useNavigate } from '@solidjs/router';

import { DASHBOARD_PATH } from '@/client/constants/routes';

import { useAuth } from '@/client/stores/auth';

export const Anonymous: Component<{ children: JSXElement }> = (props) => {
  const navigate = useNavigate();

  const auth = useAuth();

  const [validating, setValidating] = createSignal(true);

  const authenticated = createMemo(() => {
    return auth.state.user != null && auth.state.token != null;
  });

  onMount(() => {
    const needToValidate = auth.state.user == null && auth.state.token != null;

    if (needToValidate) {
      setValidating(true);

      auth.actions
        .getUser()
        .then(() => {
          setValidating(false);
        })
        .catch(() => {
          setValidating(false);
        });
    } else {
      setValidating(false);
    }
  });

  createEffect(() => {
    const logged = authenticated() && !validating();

    if (logged) {
      navigate(DASHBOARD_PATH);
    }
  });

  return <Show when={!validating() && !authenticated()}>{props.children}</Show>;
};
