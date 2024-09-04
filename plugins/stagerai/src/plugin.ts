import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const stageraiPlugin = createPlugin({
  id: 'stagerai',
  routes: {
    root: rootRouteRef,
  },
});

// export const StageraiPage = stageraiPlugin.provide(
//   createRoutableExtension({
//     name: 'StageraiPage',
//     component: () =>
//       import('./components/Chat').then(m => m.StageraiChat),
//     mountPoint: rootRouteRef,
//   }),
// );
