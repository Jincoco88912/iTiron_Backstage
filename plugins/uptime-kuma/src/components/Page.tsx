import React from 'react';
import { Page, Content, InfoCard } from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';

import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { Grid } from '@material-ui/core';

export const MainPage = () => {
  const configApi = useApi(configApiRef);
  const BaseUrl = configApi.getString('uptimekuma.baseUrl');
  
  return (
    <Page themeId="tool">
      <Content>
        <iframe
          src={BaseUrl}
          title="Uptime Kuma"
          width="100%"
          height="100%"
          style={{ border: 0 }}
        />
      </Content>
    </Page>
  );
};

export const UPTIMEKUMA_ANNOTATION_URL = 'uptimekuma/status-url';
const getStatusUrl = (entity: Entity): string => {
  return entity?.metadata.annotations?.[UPTIMEKUMA_ANNOTATION_URL] || '';
};

export const ComponentPage = () => {
  const { entity } = useEntity();
  const PageUrl = getStatusUrl(entity);

  return (
    <Grid container spacing={3} direction="column" style={{ height: '100%' }}>
      <Grid item>
        <InfoCard>
          <iframe
            src={PageUrl}
            title="Uptime Kuma"
            width="100%"
            height="500px"
            style={{ border: 0 }}
          />
        </InfoCard>
      </Grid>
    </Grid>
  );
};
