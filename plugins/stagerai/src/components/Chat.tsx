import React, { useEffect, useState } from 'react';
import { addResponseMessage, Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { useApiService } from './api';

export const StageraiChat = () => {
  const [isOnline, setIsOnline] = useState(false);
  const { checkApiStatus } = useApiService();

  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkApiStatus();
      setIsOnline(status === 'ok');
      addResponseMessage(status === 'ok' ? '嗨! 我隨時都在' : '🔴 StagerAi 目前離線，請稍後再試。');
    };

    checkStatus();
  }, [checkApiStatus]);

  return (
    <Widget
      title="StagerAI 幫手"
      subtitle={isOnline ? '🟢 在線中' : '🔴 離線'}
      profileAvatar="https://i.imgur.com/SOfTFg7.png"
      senderPlaceHolder="目前尚未支援傳送訊息"
      showCloseButton={true}
      emojis={true}
    />
  );
};