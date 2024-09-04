import {
  HomePageStarredEntities,
  HomePageRandomJoke,
  CustomHomepageGrid,
} from '@backstage/plugin-home';
import {
  starredEntitiesApiRef,
  MockStarredEntitiesApi,
  entityRouteRef,
  catalogApiRef,
} from '@backstage/plugin-catalog-react';
import { wrapInTestApp, TestApiProvider } from '@backstage/test-utils';
import { configApiRef } from '@backstage/core-plugin-api';
import { ConfigReader } from '@backstage/config';
import { searchApiRef } from '@backstage/plugin-search-react';
import { HomePageSearchBar, searchPlugin } from '@backstage/plugin-search';
import React, { ComponentType } from 'react';
import { HomeHeader } from './Header';

const entities = [
  { apiVersion: '1', kind: 'Component', metadata: { name: 'mock-starred-entity', title: 'Mock Starred Entity!' } },
  { apiVersion: '1', kind: 'Component', metadata: { name: 'mock-starred-entity-2', title: 'Mock Starred Entity 2!' } },
  { apiVersion: '1', kind: 'Component', metadata: { name: 'mock-starred-entity-3', title: 'Mock Starred Entity 3!' } },
  { apiVersion: '1', kind: 'Component', metadata: { name: 'mock-starred-entity-4', title: 'Mock Starred Entity 4!' } },
];

const mockCatalogApi = {
  getEntities: async () => ({ items: entities }),
};

const starredEntitiesApi = new MockStarredEntitiesApi();
starredEntitiesApi.toggleStarred('component:default/example-starred-entity');
starredEntitiesApi.toggleStarred('component:default/example-starred-entity-2');
starredEntitiesApi.toggleStarred('component:default/example-starred-entity-3');
starredEntitiesApi.toggleStarred('component:default/example-starred-entity-4');

export default {
  title: 'Plugins/Home/Templates',
  decorators: [
    (Story: ComponentType<{}>) =>
      wrapInTestApp(
        <TestApiProvider
          apis={[
            [catalogApiRef, mockCatalogApi],
            [starredEntitiesApiRef, starredEntitiesApi],
            [searchApiRef, { query: () => Promise.resolve({ results: [] }) }],
            [
              configApiRef,
              new ConfigReader({
                backend: { baseUrl: 'https://localhost:7007' },
              }),
            ],
          ]}
        >
          <Story />
        </TestApiProvider>,
        {
          mountedRoutes: {
            '/hello-company': searchPlugin.routes.root,
            '/catalog/:namespace/:kind/:name': entityRouteRef,
          },
        },
      ),
  ],
};

import { WebTerminalPage } from '@internal/backstage-plugin-web-terminal';

export const HomePage = () => {
  const defaultConfig = [
    { component: 'HomePageSearchBar', x: 0, y: 0, width: 12, height: 5 },
    { component: 'HomePageRandomJoke', x: 0, y: 2, width: 6, height: 16 },
    { component: 'HomePageStarredEntities', x: 6, y: 2, width: 6, height: 12 },
    { component: 'WebTerminalPage', x: 6, y: 2, width: 6, height: 50 },
  ];

  return (
    <><HomeHeader />
    <CustomHomepageGrid config={defaultConfig} rowHeight={10}>
      <WebTerminalPage />
      <HomePageSearchBar />
      <HomePageRandomJoke />
      <HomePageStarredEntities />
    </CustomHomepageGrid></>
  );
};
