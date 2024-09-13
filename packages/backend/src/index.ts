/*
 * Hi!
 *
 * Note that this is an EXAMPLE Backstage backend. Please check the README.
 *
 * Happy hacking!
 */

import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));

// auth plugin
backend.add(import('@backstage/plugin-auth-backend'));
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));
backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));
backend.add(import('@backstage/plugin-auth-backend-module-oidc-provider'));
backend.add(import('@internal/backstage-plugin-auth-backend-module-oidc'));

// catalog plugin
backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),);
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
backend.add(import('@backstage/plugin-catalog-backend-module-ldap'));

// See https://backstage.io/docs/features/software-catalog/configuration#subscribing-to-catalog-errors
backend.add(import('@backstage/plugin-catalog-backend-module-logs'));

// permission plugin
backend.add(import('@backstage/plugin-permission-backend/alpha'));
backend.add(
  // import('@backstage/plugin-permission-backend-module-allow-all-policy'),
  import('@internal/backstage-plugin-permission-backend-module-custom'),
);

// search plugin
backend.add(import('@backstage/plugin-search-backend/alpha'));

// search engine
// See https://backstage.io/docs/features/search/search-engines
backend.add(import('@backstage/plugin-search-backend-module-pg/alpha'));

backend.add(import('@backstage/plugin-search-backend-module-catalog/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs/alpha'));

backend.add(import('@backstage-community/plugin-azure-devops-backend'));
backend.add(import('@janus-idp/backstage-plugin-feedback-backend'));

backend.add(import('@internal/backstage-plugin-ollama-api-backend'));
backend.start();