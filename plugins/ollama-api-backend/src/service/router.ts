import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import { LoggerService } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';

export interface RouterOptions {
  logger: LoggerService;
  config: Config;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/status', async (_, response) => {
    logger.info('確認Ollama服務狀態...');
    const apiStatus = await checkApiStatus();
    response.json({ apiStatus: apiStatus ? 'ok' : 'error' });
  });

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());
  return router;
}

async function checkApiStatus(): Promise<boolean> {
  try {
    const response = await fetch('https://ollama.kubic.cool', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      console.log('API 可用且有回應。');
      return true;
    } else {
      console.log(`API 有回應，但狀態碼為: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error('檢查 API 狀態時發生錯誤:', error);
    return false;
  }
}