import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const n8NPlugin = createPlugin({
  id: 'n8n',
  routes: {
    root: rootRouteRef,
  },
});

export const N8NPage = n8NPlugin.provide(
  createRoutableExtension({
    name: 'N8NPage',
    component: () =>
      import('./components/Page').then(m => m.MainPage),
    mountPoint: rootRouteRef,
  }),
);
