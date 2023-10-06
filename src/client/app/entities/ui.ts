import { type Component } from 'solid-js';

export interface MenuItem {
  icon: Component<{ class: string; classList?: Record<string, boolean> }>;
  iconClass?: string;
  label: string;
  link: string;
  extraClass?: string;
  queryParams?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}
