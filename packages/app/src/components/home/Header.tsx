import { Header } from '@backstage/core-components';
import { ClockConfig, HeaderWorldClock } from '@backstage/plugin-home';
import { wrapInTestApp } from '@backstage/test-utils';
import React, { ComponentType, PropsWithChildren } from 'react';


export default {
  title: 'Plugins/Home/Components/HeaderWorldClock',
  decorators: [
    (Story: ComponentType<PropsWithChildren<{}>>) => wrapInTestApp(<Story />),
  ],
};

const clockConfigs: ClockConfig[] = [
  { label: 'NYC', timeZone: 'America/New_York' },
  { label: 'UTC', timeZone: 'UTC' },
  { label: 'STO', timeZone: 'Europe/Stockholm' },
  { label: 'TYO', timeZone: 'Asia/Tokyo' },
];

export const HomeHeader = () => {
  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return (
    <Header title="Header World Clock" pageTitleOverride="Home">
      <HeaderWorldClock clockConfigs={clockConfigs} customTimeFormat={timeFormat} />
    </Header>
  );
};