import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { stageraiPlugin, StageraiPage } from '../src/plugin';

createDevApp()
  .registerPlugin(stageraiPlugin)
  .addPage({
    element: <StageraiPage />,
    title: 'Root Page',
    path: '/stagerai',
  })
  .render();
