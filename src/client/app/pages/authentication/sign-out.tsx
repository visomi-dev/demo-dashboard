import type { Component } from 'solid-js';
import { Navigate } from '@solidjs/router';

import { SIGN_IN_PATH } from '../../constants/routes';

import { useAuth } from '../../stores/auth';

const SignOut: Component = () => {
  const auth = useAuth();

  auth.actions.signOut();

  return <Navigate href={SIGN_IN_PATH} />;
};

export default SignOut;
