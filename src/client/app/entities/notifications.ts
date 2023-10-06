import { type Component } from 'solid-js';

export interface Notification {
  icon?: Component<{ class?: string }>;
  title: string;
  description?: string;
  duration?: number;
  timestamp: number;
  canClose?: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  variant:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  class?: string;
  callback: () => void;
}
