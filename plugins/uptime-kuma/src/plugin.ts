import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const uptimeKumaPlugin = createPlugin({
  id: 'uptime-kuma',
  routes: {
    root: rootRouteRef,
  },
});

export const UptimeKumaPage = uptimeKumaPlugin.provide(
  createRoutableExtension({
    name: 'UptimeKumaPage',
    component: () =>
      import('./components/Page').then(m => m.MainPage),
    mountPoint: rootRouteRef,
  }),
);

export const UptimeKumaComponent = uptimeKumaPlugin.provide(
  createRoutableExtension({
    name: 'UptimeKumaComponent',
    component: () =>
      import('./components/Page').then(m => m.ComponentPage),
    mountPoint: rootRouteRef,
  }),
);
