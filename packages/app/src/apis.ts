import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  ScmAuth,
} from '@backstage/integration-react';
import {
  AnyApiFactory,
  ApiRef, //new
  BackstageIdentityApi, // new
  configApiRef,
  createApiFactory,
  createApiRef, discoveryApiRef, oauthRequestApiRef, // new
  OpenIdConnectApi, // new
  ProfileInfoApi, // new
  SessionApi, // new
} from '@backstage/core-plugin-api';
import { OAuth2 } from '@backstage/core-app-api'; // new

export const identityserverOIDCAuthApiRef: ApiRef<
  OpenIdConnectApi & ProfileInfoApi & BackstageIdentityApi & SessionApi
> = createApiRef({
  id: 'auth.sso-auth-provider',
});

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  createApiFactory({
    api: identityserverOIDCAuthApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
      oauthRequestApi: oauthRequestApiRef,
      configApi: configApiRef,
    },
    factory: ({ discoveryApi, oauthRequestApi, configApi }) => OAuth2.create({
      configApi,
      discoveryApi,
      oauthRequestApi,
      provider: {
        id: 'sso-auth-provider',
        title: 'SSO auth provider',
        icon: () => null,
      },
      environment: configApi.getOptionalString('auth.environment'),
      defaultScopes: ['openid', 'profile', 'offline_access', 'email'],
      popupOptions: {
        // optional, used to customize login in popup size
        size: {
          fullscreen: true,
        },
        /**
         * or specify popup width and height
         * size: {
            width: 1000,
            height: 1000,
          }
         */
      },
    }),
  }),
  ScmAuth.createDefaultApiFactory(),
];
