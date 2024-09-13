import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';

import { 
  PermissionPolicy,
  PolicyQuery,
} from '@backstage/plugin-permission-node';

import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';
import { BackstageIdentityResponse } from '@backstage/plugin-auth-node';

import {
  AuthorizeResult,
  PolicyDecision,
  isPermission,
} from '@backstage/plugin-permission-common';
import {
  PermissionCondition,
  PermissionRuleParams,
} from '@backstage/plugin-permission-common';

import {
  catalogConditions,
  createCatalogConditionalDecision,
} from '@backstage/plugin-catalog-backend/alpha';
import {
  catalogEntityReadPermission,
  catalogEntityCreatePermission,
} from '@backstage/plugin-catalog-common/alpha';

class CheckKindPermissionPolicy implements CheckKindPermissionPolicy {
  constructor(private readonly logger: any) {}
  async handle(
    request: PolicyQuery,
    user?: BackstageIdentityResponse,
   ): Promise<PolicyDecision> {

        // 只有 backstage-developer 群組才能訪問插件
        if (isPermission(request.permission, catalogEntityCreatePermission)) {
          if (user?.identity.ownershipEntityRefs.includes("group:default/backstage-developer")) {
            return { result: AuthorizeResult.ALLOW };
          }
          return { result: AuthorizeResult.DENY };
        }

        // 如果請求的權限是讀取 catalog-entity
        if (isPermission(request.permission, catalogEntityReadPermission)) {

          // 創建條件來檢查資源類型是否為 'API' 'Component'
          const apiKindCondition: PermissionCondition<'catalog-entity', PermissionRuleParams> = catalogConditions.isEntityKind({
            kinds: ['API', 'Component'],
          });
    
          // 創建條件來檢查用戶是否為資源的擁有者
          const ownerCondition: PermissionCondition<'catalog-entity', PermissionRuleParams> = catalogConditions.isEntityOwner({
            claims: user?.identity.ownershipEntityRefs ?? [],
          });
    
          // 資源 Kind 不等於 API、Component 直接允許、否則檢查擁有者
          return createCatalogConditionalDecision(
            request.permission,
            {
              anyOf: [
                {
                  not:
                    apiKindCondition,
                },
                {
                  allOf: [
                    apiKindCondition, ownerCondition
                  ]
                }
              ]
            }
          );
        }
        
     return { result: AuthorizeResult.ALLOW };
  }
}

class OnlyOwnerPermissionPolicy implements OnlyOwnerPermissionPolicy {
  async handle(
    request: PolicyQuery,
    user?: BackstageIdentityResponse,
   ): Promise<PolicyDecision> {
    if (isPermission(request.permission, catalogEntityReadPermission)) {
      return createCatalogConditionalDecision(
        request.permission,
        catalogConditions.isEntityOwner({
          claims: user?.identity.ownershipEntityRefs ?? [],
        }),
      );
    }
     return { result: AuthorizeResult.ALLOW };
  }
}

class MyPermissionPolicy implements MyPermissionPolicy {
  async handle(
    request: PolicyQuery,
    _user?: BackstageIdentityResponse,
  ): Promise<PolicyDecision> {
    if (request.permission.name === 'catalog.entity.read') {
      return {
        result: AuthorizeResult.DENY,
      };
    }

    return { result: AuthorizeResult.ALLOW };
  }
}

export const permissionModuleCustom = createBackendModule({
  pluginId: 'permission',
  moduleId: 'custom',
  register(reg) {
    reg.registerInit({
      deps: {
        policy: policyExtensionPoint,
        logger: coreServices.logger,
      },
      async init({ logger, policy }) {
        logger.info('自定義權限策略啟用中');
        policy.setPolicy(new CheckKindPermissionPolicy(logger));
      },
    });
  },
});
