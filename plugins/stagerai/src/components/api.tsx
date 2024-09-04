import { useApi, configApiRef } from '@backstage/core-plugin-api';

export const useApiService = () => {
  const config = useApi(configApiRef);
  const baseUrl = config.getString('backend.baseUrl');

  const checkApiStatus = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/ollama-api/status`);
      const data = await response.json();

      if (response.ok && data && data.apiStatus === 'ok') {
        return 'ok';
      } else {
        return 'error';
      }
    } catch (error) {
      console.error('檢查 API 狀態時發生錯誤:', error);
      return 'error';
    }
  };

  return {
    checkApiStatus,
  };
};
