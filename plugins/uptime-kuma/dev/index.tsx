import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { uptimeKumaPlugin, UptimeKumaPage } from '../src/plugin';

createDevApp()
  .registerPlugin(uptimeKumaPlugin)
  .addPage({
    element: <UptimeKumaPage />,
    title: 'Root Page',
    path: '/uptime-kuma',
  })
  .render();
