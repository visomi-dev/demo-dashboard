import type { Component } from 'solid-js';

import { Button } from '@/client/components/ui/button';

import { useNotifications } from '@/client/stores/notifications';

const SignIn: Component = () => {
  const notifications = useNotifications();

  return (
    <div>
      sign in
      <Button
        onClick={() => {
          notifications.actions.add({
            title: 'test',
          });
        }}
      >
        add notification
      </Button>
    </div>
  );
};

export default SignIn;
