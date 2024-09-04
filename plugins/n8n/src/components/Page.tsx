import React from 'react';
import { Page, Content } from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';

export const MainPage = () => {
  const configApi = useApi(configApiRef);
  const BaseUrl = configApi.getString('n8n.baseUrl');
  
  return (
    <Page themeId="tool">
      <Content>
        <iframe
          src={BaseUrl}
          title="n8n"
          width="100%"
          height="100%"
          style={{ border: 0 }}
        />
      </Content>
    </Page>
  );
};