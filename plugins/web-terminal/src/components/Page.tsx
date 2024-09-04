import React, { useEffect, useRef } from 'react';
import { Page, Header, Content } from '@backstage/core-components';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

export const TerminalPage = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      const term = new Terminal();
      term.open(terminalRef.current);
      term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
      term.onData((val) => {
        term.write(val);
      }); 
    }
  }, []);

  return (
    <Page themeId="tool">
      <Header title="Terminal Page" subtitle="Interact with the terminal directly from Backstage" />
      <Content>
        <div ref={terminalRef} style={{ width: '100%', height: '100%', backgroundColor: '#000' }} />
      </Content>
    </Page>
  );
};
